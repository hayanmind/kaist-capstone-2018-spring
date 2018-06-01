import librosa
import json

y, sr = librosa.load("C:/Users/stk14/OneDrive/바탕 화면/bb.3gp")
S, phase = librosa.magphase(librosa.stft(y))

###########################################
rms = librosa.feature.rmse(S=S, frame_length=2048, hop_length=512)
rms = rms.tolist()[0]

###########################################
t = list(range(len(rms)))
for i in t:
    t[i] = t[i]*512/sr

###########################################
amp = json.dumps(rms)
t_domain = json.dumps(t)