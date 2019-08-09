import os

def main():

    for filename in os.listdir("media"):
        if filename[0:3] == "mlb":
            char = filename.find('.')
            dst = "3" + filename[3:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:3] == "mls":
            char = filename.find('.')
            dst = "10" + filename[3:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:3] == "nba":
            char = filename.find('.')
            dst = "4" + filename[3:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:5] == "ncaab":
            char = filename.find('.')
            dst = "5" + filename[5:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:5] == "ncaaf":
            char = filename.find('.')
            dst = "1" + filename[5:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:3] == "nfl":
            char = filename.find('.')
            dst = "2" + filename[3:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:3] == "nhl":
            char = filename.find('.')
            dst = "6" + filename[3:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)

        elif filename[0:4] == "wnba":
            char = filename.find('.')
            dst = "8" + filename[4:char] + ".png"
            src = "media/" + filename
            dst = "media/" + dst

            os.rename(src, dst)


if __name__ == '__main__':
    main()
