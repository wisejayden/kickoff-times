import sys
import json
from requests_html import HTMLSession



with open('backup-lineups.json') as json_data:
    data = json.load(json_data,)

match_id_dict = {
    "australia-wales": "sr:match:16166960",
    "france-usa": "sr:match:16166940",
    "newzealand-canada": "sr:match:16327708",
    "georgia-fiji": "sr:match:16166962",
    "ireland-russia": "sr:match:16166908",
    "southafrica-italy": "sr:match:16166926",
    "australia-uruguay": "sr:match:16166964",
    "england-argentina": "sr:match:16166942",
    "japan-samoa": "sr:match:16166910",
    "newzealand-namibia": "sr:match:16166928",
    "france-tonga": "sr:match:16166944",
    "southafrica-canada": "sr:match:16327710",
    "argentina-usa": "sr:match:16166946",
    "scotland-russia": "sr:match:16166912",
    "wales-fiji": "sr:match:16166966",
    "australia-georgia": "sr:match:16166968",
    "newzealand-italy": "sr:match:16166930",
    "england-france": "sr:match:16166948",
    "ireland-samoa": "sr:match:16166914",
    "namibia-canada": "sr:match:16327712",
    "usa-tonga": "sr:match:16166950",
    "wales-uruguay": "sr:match:16166970",
    "japan-scotland": "sr:match:16166916"
}

big_ol_soup = []

session = HTMLSession()

url = 'https://www.rugbyworldcup.com/match/'


if len(sys.argv) == 1:
    print("Enter the upcoming matches as an argument.. e.g. southafrica-newzealand")

for i, eachArg in enumerate(sys.argv[1:]):
    store_name_1 = []
    store_name_2 = []

    starters_1 = []
    starters_2 = []
    finishers_1 = []
    finishers_2 = []

    final_team_1 = []
    final_team_2 = []

    jersey_number = 0
    jersey_number_2 = 0
    loop_count_1 = 0
    loop_count_2 = 0
    response = session.get(url + eachArg)
    response.html.render()

    current_lineup_available = response.html.find('.mc-lineups__player-number')

    if len(current_lineup_available) > 0:
        for i, x in enumerate(response.html.find('.mc-lineups__player-last-name')):
            # Seems to find 46 instances of the last name, prevent the duplication
            if loop_count_1 < 23:
                # Get all even names onto one side
                if i % 2 == 0:
                    # Store name to combine it all later
                    store_name_1.append(x.text)
                else:
                    store_name_2.append(x.text)
                    loop_count_1 += 1


        for i, x in enumerate(response.html.find('.mc-lineups__player-first-name')):
            if loop_count_2 < 23:
                # print(loop_count_2)
                if i % 2 == 0:
                    # print("store name length", len(store_name_1))
                    # test.append(x.text)
                    if len(starters_1) < 15:

                        starters_1.append(str(jersey_number + 1) + ". " + x.text + " " + store_name_1[jersey_number])
                    else:
                        if jersey_number < 23:
                            finishers_1.append(str(jersey_number + 1) + ". " + x.text + " " + store_name_1[jersey_number])
                    jersey_number += 1
                else:
                    if len(starters_2) < 15:
                        starters_2.append(str(jersey_number_2 + 1) + ". " + x.text + " " + store_name_2[jersey_number_2])
                    else:
                        if jersey_number_2 < 23:
                            finishers_2.append(str(jersey_number_2 + 1) + ". " + x.text + " " + store_name_2[jersey_number_2])
                    jersey_number_2 += 1

        loop_count_2 += 1
        data[match_id_dict[eachArg]] = [{"starters": starters_1, "finishers": finishers_1}, {"starters": starters_2, "finishers": finishers_2}]
        print(eachArg + " finished, team count is " + str(len(starters_1) + len(finishers_1)) + " versus " + str(len(starters_2) + len(finishers_2)))

        print("Success! Writing to file..")

        with open('backup-lineups.json', 'w') as outfile:
            json.dump(data, outfile)

    else:
        print(eachArg + " lineup is not available yet....")
