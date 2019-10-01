import requests

from bs4 import BeautifulSoup
import json

data = {}

url = 'https://www.rugbyworldcup.com/pools'

r = requests.get(url)

soup = BeautifulSoup(r.content, 'html.parser')
table = soup.select('table')


points_html = soup.select('.pools__cell--points .pools__cell-content')
team_html = soup.select('.pools__cell--team .pools__team-name--long')
games_played_html = soup.select('.pools__cell--played .pools__cell-content')

games_won_html = soup.select('.pools__cell--won .pools__cell-content')
games_drawn_html = soup.select('.pools__cell--drawn .pools__cell-content')
games_lost_html = soup.select('.pools__cell--lost .pools__cell-content')
tries_for_html = soup.select('.pools__cell--tries-for .pools__cell-content')
points_for_html = soup.select('.pools__cell--points-for .pools__cell-content')
points_against_html = soup.select('.pools__cell--points-against .pools__cell-content')
points_diff_html = soup.select('.pools__cell--diff .pools__cell-content')
bonus_points_html = soup.select('.pools__cell--bp .pools__cell-content')


data['points_list'] = []
data['team_list'] = []
data['games_played_list'] = []
data['games_won_list'] = []
data['games_drawn_list'] = []
data['games_lost_list'] = []
data['tries_for_list'] = []
data['points_for_list'] = []
data['points_against_list'] = []
data['points_diff_list'] = []
data['bonus_points_list'] = []

for i in points_html:
    data['points_list'].append(int(i.text))

for i in team_html:
    data['team_list'].append(i.text)

for i in games_played_html:
    data['games_played_list'].append(int(i.text))

for i in games_won_html:
    data['games_won_list'].append(int(i.text))

for i in games_drawn_html:
    data['games_drawn_list'].append(int(i.text))

for i in games_lost_html:
    data['games_lost_list'].append(int(i.text))

for i in tries_for_html:
    data['tries_for_list'].append(int(i.text))

for i in points_for_html:
    data['points_for_list'].append(int(i.text))

for i in points_against_html:
    data['points_against_list'].append(int(i.text))

for i in points_diff_html:
    data['points_diff_list'].append(int(i.text))

for i in bonus_points_html:
    data['bonus_points_list'].append(int(i.text))

print(data)

with open('pool_data.json', 'w') as outfile:
    json.dump(data, outfile)
