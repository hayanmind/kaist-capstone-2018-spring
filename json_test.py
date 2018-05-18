import librosa
import librosa.display
import numpy as np
import json
import matplotlib.pyplot as plt


#
y, sr = librosa.load("test.m4a")
pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
# # print(pitches.size / pitches[0].size)
# # print(pitches[0].size)
#
res = []
for i in range(len(pitches[0])):
    max = 0
    max_index = 0
    for j in range(len(pitches)):
        if max < pitches[j][i]:
            max = pitches[j][i]
            max_index = j
    res.append(max_index)

print(len(res))
print(res)

res = []
for i in range(len(magnitudes[0])):
    max = 0
    max_index = 0
    for j in range(len(magnitudes)):
        if max < magnitudes[j][i]:
            max = magnitudes[j][i]
            max_index = j
    res.append(max)

print(len(res))
print(res)

S, phase = librosa.magphase(librosa.stft(y))
rms = librosa.feature.rmse(S=S)
jsonString = json.dumps(rms[0].tolist())

print(jsonString)


# y, sr = librosa.load("data01.mp3")
# pitches, magnitudes = librosa.piptrack(y=y, sr=sr)


#
# C = librosa.feature.chroma_cqt(y=y, sr=sr)
# plt.subplot(1, 1, 1)
# librosa.display.specshow(C, y_axis='chroma')
# plt.colorbar()
# plt.title('Chromagram')
# plt.show()