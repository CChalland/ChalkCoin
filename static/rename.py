import os


def main():

    for filename in os.listdir("media"):
        if filename[0:2] == "mlb":
            dst = "3" + filename[3:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:2] == "mls":
            dst = "10" + filename[3:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:2] == "nba":
            dst = "4" + filename[3:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:4] == "ncaab":
            dst = "5" + filename[5:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:4] == "ncaaf":
            dst = "1" + filename[5:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:2] == "nfl":
            dst = "2" + filename[3:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:2] == "nhl":
            dst = "6" + filename[3:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)

        if filename[0:3] == "wnba":
            dst = "8" + filename[4:-1]
            src = 'media' + filename
            dst = 'media' + dst

            os.rename(src, dst)


if __name__ == '__main__':
    main()
