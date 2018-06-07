import librosa
import json

y, sr = librosa.load("C:/Users/stk14/OneDrive/바탕 화면/woman_talk1.mp3")
D = librosa.stft(y)

####################################################################################
# extract frequency #
filter_property1 = 6

sel_f = []
for i in range(len(D[0])):
    for j in range(len(D)):
        if abs(D[j][i]) <= filter_property1:
            D[j][i] = 0

for i in range(len(D[0])):
    f_max = 0
    f_min = 0
    for j in range(len(D)-1):
        if abs(D[j][i]) + 1 < abs(D[j+1][i]):
            f_min = j
            break
    for k in range(j+1,len(D)-1):
        if abs(D[k][i]) - 1 > abs(D[k+1][i]):
            f_max = k
            break
    sel_f.append((f_max+f_min)/2*11025/1024)

###################
# frequency filter & entire time frequency average and standard deviation #
filter_property2 = 3
filtering_num = 2

for fil in range(filtering_num):
    sel_sel_f = []
    for f in sel_f:
        if f != 0.0:
            sel_sel_f.append(f)

    L = len(sel_sel_f)
    gross_sum = 0
    for f in sel_sel_f:
        gross_sum = gross_sum + f
    avg_f = gross_sum / L

    squ_sum = 0
    for f in sel_sel_f:
        squ_sum = squ_sum + (f - avg_f) ** 2

    std_dev = (squ_sum / L) ** 0.5

    n = len(sel_f)
    for i in range(n):
        if (avg_f - std_dev * filter_property2 > sel_f[i]) or (avg_f + std_dev * filter_property2 < sel_f[i]):
            sel_f[i] = 0

sel_sel_f = []
for f in sel_f:
    if f != 0.0:
        sel_sel_f.append(f)


L = len(sel_sel_f)
gross_sum = 0
for f in sel_sel_f:
    gross_sum = gross_sum + f
avg_f = gross_sum/L

squ_sum = 0
for f in sel_sel_f:
    squ_sum = squ_sum + (f - avg_f)**2

std_dev = (squ_sum/L)**0.5
###################
# time domain #
t = list(range(n))
for i in t:
    t[i] = t[i]*512/sr

###################
# transient frequency change with min, max #
temp_f = []
temp_n = []
temp_f_comp = []
temp_n_comp = []
for i in range(n):
    if sel_f[i] != 0.0:
        temp_f_comp.append(sel_f[i])
        temp_n_comp.append(i)
    elif i == 0:
        if sel_f[0] != 0.0:
            temp_f_comp.append(sel_f[i])
            temp_n_comp.append(i)
        else:
            continue
    elif sel_f[i] == 0.0 and sel_f[i-1] != 0.0:
        temp_f.append(temp_f_comp)
        temp_n.append(temp_n_comp)
        temp_f_comp = []
        temp_n_comp = []
    else:
        continue

temp_change_f = []
for f_comp in temp_f:
    max_f = max(f_comp)
    min_f = min(f_comp)
    if max_f == min_f:
        temp_change_f.append(0)
    else:
        temp_change_f.append(max_f-min_f)

temp_t = []
for temp_n_comp in temp_n:
    temp_t.append(((temp_n_comp[-1] + temp_n_comp[0])//2)*512/sr)

###################
# 20s cut + average & std deviation #
dn = int((20*sr/512)//1)
n_cut = int(n//dn) + 1

sel_f_cut = []
for i in range(n_cut-1):
    sel_f_cut.append(sel_f[i*dn:(i+1)*dn])
sel_f_cut.append(sel_f[(n_cut-1)*dn:n-1])

sel_sel_f_cut = []
for i in range(len(sel_f_cut)):
    sel_sel_f_cut_n = []
    for f in sel_f_cut[i]:
        if f != 0.0:
            sel_sel_f_cut_n.append(f)
    if len(sel_sel_f_cut_n) == 0:
        continue
    sel_sel_f_cut.append(sel_sel_f_cut_n)

f_cut_avg = []
for i in range(len(sel_sel_f_cut)):
    cut_sum = 0
    for f in sel_sel_f_cut[i]:
        cut_sum = cut_sum + f
    cut_avg = cut_sum/(len(sel_sel_f_cut[i]))
    f_cut_avg.append(cut_avg)

f_cut_std_dev = []
for i in range(len(sel_sel_f_cut)):
    cut_squ_sum = 0
    for f in sel_sel_f_cut[i]:
        cut_squ_sum = cut_squ_sum + (f - f_cut_avg[i])**2
    cut_std_dev = cut_squ_sum/(len(sel_sel_f_cut[i]))
    f_cut_std_dev.append(cut_std_dev)

########################################
#  #
if avg_f > 180:
    man_or_woman = ['woman']
elif avg_f < 165:
    man_or_woman = ['man']
else:
    man_or_woman = ['medial']

###########
temp_change_f2 = []
temp_t2 = []
num = 0
for change_f in temp_change_f:
    if change_f > 200:
        temp_change_f2.append(change_f)
        temp_t2.append(temp_t[num])
    num = num + 1

temp_t_round = []
for t in temp_t2:
    t_round = round(t*10)/10
    temp_t_round.append(t_round)

####################################################################################
# json file #
f_value = json.dumps(sel_f)
t_domain = json.dumps(t)

f_avg_entire = json.dumps(avg_f)
f_std_dev_entire = json.dumps(std_dev)

t_f_change_temp = json.dumps(temp_t_round)

f_avg_cut = json.dumps(f_cut_avg)
f_std_dev_cut = json.dumps(f_cut_std_dev)

man_or_woman = json.dumps(man_or_woman)