import json
import librosa
import sound_amplitude
import sound_frequency

y, sr = librosa.load("C:/Users/ailur_000/Desktop/talk1_changjun.wma")
message_amp = sound_amplitude.extract(y, sr)
message_freq = sound_frequency.extract(y, sr)
message_amp.update(message_freq)
message_dump = json.dumps(message_amp)

z_count = 0
is_zero = False
for idx, val in enumerate(message_amp['amp']):
    if(val == 0):
        if is_zero:
            z_count = z_count + 1
        else:
            z_count = 1
        is_zero = True
        if (z_count == 10):
            print(message_amp['t_amp'][idx])
    else:
        is_zero = False

