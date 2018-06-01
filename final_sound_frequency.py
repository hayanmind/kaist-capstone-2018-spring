import librosa
import json

y, sr = librosa.load("C:/Users/stk14/OneDrive/바탕 화면/speech.3gp")
D = librosa.stft(y)

####################################################################################
# extract frequency #
sel_f = []
for i in range(len(D[0])):
    for j in range(len(D)):
        if abs(D[j][i]) <= 10:
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
# frequency correction & entire time frequency average and standard deviation #
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

n = len(sel_f)
for i in range(n):
    if (avg_f - std_dev * 7 > sel_f[i]) or (avg_f + std_dev * 7 < sel_f[i]):
        sel_f[i] = 0

###################
# time domain #
t = list(range(n))
for i in t:
    t[i] = t[i]*512/sr

###################
# derivative of frequency #


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

####################################################################################
# json file #
f_value = json.dumps(sel_f)
t_domain = json.dumps(t)

f_avg_entire = json.dumps(avg_f)
f_std_dev_entire = json.dumps(std_dev)

f_avg_cut = json.dumps(f_cut_avg)
f_std_dev_cut = json.dumps(f_cut_std_dev)