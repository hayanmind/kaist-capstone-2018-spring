import librosa.display

HOP_LENGTH = 512


class MFCC(object):
    def __init__(self, filler_m):
        self.sr = 22050
        self.filler_m = self.round_filler_m(filler_m)

    def do(self):
        f = open("mfcc.csv", "wt")

        y, sr = librosa.load("audio_file01.m4a")
        if sr != self.sr:
            print("?!?!?!?!?!?!")
            raise ValueError

        m = librosa.feature.mfcc(y, sr)

        f.write("time,")
        f.write("filler,")

        for i in range(len(m)):
            f.write("mfcc[" + str(i) + "]")
            if i != len(m) - 1:
                f.write(",")
        f.write('\n')

        for i in range(len(m[0])):
            t = i * HOP_LENGTH / self.sr
            f.write(str(t) + ",")
            f.write(self.filler(t, 0) + ",")
            for j in range(len(m)):
                f.write(str(m[j][i]))
                if j != len(m) - 1:
                    f.write(",")
            f.write('\n')
        f.close()

    def filler(self, t, index):
        if index == len(self.filler_m):
            return "no"
        start = self.filler_m[index][0]
        end = self.filler_m[index][1]
        if t < start:
            return "no"
        elif start <= t <= end:
            return "yes"
        elif end < t:
            return self.filler(t, index + 1)

    def round_filler_m(self, filler_m):
        ret = []
        for val in filler_m:
            if len(val) != 2:
                raise ValueError  # input filer_m is invalid
            ret.append((int(val[0] * self.sr / HOP_LENGTH) * (HOP_LENGTH / self.sr),
                        int(val[1] * self.sr / HOP_LENGTH) * (HOP_LENGTH / self.sr)))
        return ret


if __name__ == "__main__":
    filler_arr = [(1.2, 1.45), (6.6, 7.1), (21.5, 22.1), (29.8, 30.29), (42.38, 42.88), (53.6, 54.05), (65.25, 65.85), (74.8, 75.3)]
    yeah = MFCC(filler_arr)
    yeah.do()
