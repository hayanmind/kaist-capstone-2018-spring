import librosa
import json

y, sr = librosa.load("C:/Users/stk14/OneDrive/바탕 화면/bb.3gp")
S, phase = librosa.magphase(librosa.stft(y))

####################################################################################
# extract rms of sound #
rms = librosa.feature.rmse(S=S, frame_length=2048, hop_length=512)
rms = rms.tolist()[0]

###################
# time domain #
t = list(range(len(rms)))
for i in t:
    t[i] = t[i]*512/sr

###################
# amplitude correction #
L = len(rms)
for i in range(L):
    if rms[i] < 0.5:
        rms[i] = 0

###################
# entire time amplitude average and standard deviation #
sel_A = []
for a in rms:
    if a != 0:
        sel_A.append(a)

L_sel = len(sel_A)
gross_sum = 0
for a in sel_A:
    gross_sum = gross_sum + a
avg_a = gross_sum/L_sel

squ_sum = 0
for f in sel_A:
    squ_sum = squ_sum + (a - avg_a)**2

std_dev = (squ_sum/L_sel)**0.5

###################
# transient amplitude change with min, max #
temp_a = []
temp_n = []
temp_a_comp = []
temp_n_comp = []
for i in range(L):
    if rms[i] != 0.0:
        temp_a_comp.append(rms[i])
        temp_n_comp.append(i)
    elif i == 1:
        continue
    elif rms[i] == 0.0 and rms[i-1] != 0.0:
        temp_a.append(temp_a_comp)
        temp_n.append(temp_n_comp)
        temp_a_comp = []
        temp_n_comp = []
    else:
        continue

temp_change_a = []
for a_comp in temp_a:
    max_a = max(a_comp)
    min_a = min(a_comp)
    if max_a == min_a:
        temp_change_a.append(0)
    else:
        temp_change_a.append(abs((max_a-min_a)/(a_comp.index(max_a)-a_comp.index(min_a))))

temp_t = []
for temp_n_comp in temp_n:
    temp_t.append(((temp_n_comp[-1] + temp_n_comp[0])//2)*512/sr)

###################
# 20s cut + average & std deviation #
dn = int((20*sr/512)//1)
n_cut = int(L//dn) + 1

rms_cut = []
for i in range(n_cut-1):
    rms_cut.append(rms[i*dn:(i+1)*dn])
rms_cut.append(rms[(n_cut-1)*dn:L-1])

sel_rms_cut = []
for i in range(len(rms_cut)):
    sel_rms_cut_n = []
    for a in rms_cut[i]:
        if a != 0.0:
            sel_rms_cut_n.append(a)
    sel_rms_cut.append(sel_rms_cut_n)

a_cut_avg = []
for i in range(len(sel_rms_cut)):
    cut_sum = 0
    for a in sel_rms_cut[i]:
        cut_sum = cut_sum + a
    cut_avg = cut_sum/(len(sel_rms_cut[i]))
    a_cut_avg.append(cut_avg)

a_cut_std_dev = []
for i in range(len(sel_rms_cut)):
    cut_squ_sum = 0
    for a in sel_rms_cut[i]:
        cut_squ_sum = cut_squ_sum + (a - a_cut_avg[i])**2
    cut_std_dev = cut_squ_sum/(len(sel_rms_cut[i]))
    a_cut_std_dev.append(cut_std_dev)

####################################################################################
amp = json.dumps(rms)
t_domain = json.dumps(t)

a_avg_entire = json.dumps(avg_a)
a_std_dev_entire = json.dumps(std_dev)

a_change_temp = json.dumps(temp_change_a)
t_a_change_temp = json.dumps(temp_t)

a_avg_cut = json.dumps(a_cut_avg)
a_std_dev_cut = json.dumps(a_cut_std_dev)