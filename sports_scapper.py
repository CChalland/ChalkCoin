import requests
from bs4 import BeautifulSoup

response = requests.get("https://www.espn.com/nfl/game/_/gameId/401220307")
soup = BeautifulSoup(response.text, "html.parser")
scoreboard = soup.select(".pick-center")

with open("scores.txt", "w") as file:
    file.write("".join(str(scoreboard)))

