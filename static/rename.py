import os

for filename in os.listdir("media"):
    if filename[0:3] == "mlb":
        dst = "3" + filename[3:]
        src = filename

        os.rename(src, dst)

    if filename[0:3] == "mls":
        dst = "10" + filename[3:]
        src = filename

        os.rename(src, dst)

    if filename[0:3] == "nba":
        dst = "4" + filename[3:]
        src = filename

        os.rename(src, dst)

    if filename[0:5] == "ncaab":
        dst = "5" + filename[5:]
        src = filename

        os.rename(src, dst)

    if filename[0:5] == "ncaaf":
        dst = "1" + filename[5:]
        src = filename

        os.rename(src, dst)

    if filename[0:3] == "nfl":
        dst = "2" + filename[3:]
        src = filename

        os.rename(src, dst)

    if filename[0:3] == "nhl":
        dst = "6" + filename[3:]
        src = filename

        os.rename(src, dst)

    if filename[0:4] == "wnba":
        dst = "8" + filename[4:]
        src = filename

        os.rename(src, dst)
