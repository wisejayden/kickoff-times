import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

import rwcSchedule from "../rwc-schedule.json";
import lineup from "../lineups.json";
import backup from "../backup-lineups.json";
import poolData from "../pool_data.json";

export default class AppStore {
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable lineup = lineup;
  @observable backup = backup;
  @observable poolData = poolData;
  @observable filterValue = "";
  @observable ratingsObject = "";
  @observable noticeClicked = false;

  @action changeFilterValue = option => {
    this.filterValue = option;
    this.filterData(option);
  };

  @observable weekArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  @observable monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  @observable worldCupPools = {
    A: ["Ireland", "Scotland", "Japan", "Russia", "Samoa"],
    B: ["New Zealand", "South Africa", "Italy", "Namibia", "Canada"],
    C: ["England", "France", "Argentina", "USA", "Tonga"],
    D: ["Australia", "Wales", "Georgia", "Fiji", "Uruguay"]
  };
  @observable aPoolOfCountries = [
    { country: "Ireland", pool: "A", image: "irfu2.svg", nickname: "IRE" },
    { country: "Scotland", pool: "A", image: "scotland.svg", nickname: "SCO" },
    { country: "Japan", pool: "A", image: "japan.svg", nickname: "JPN" },
    { country: "Russia", pool: "A", image: "russia.svg", nickname: "RUS" },
    { country: "Samoa", pool: "A", image: "samoa.svg", nickname: "SAM" },

    {
      country: "New Zealand",
      pool: "B",
      image: "new-zealand.svg",
      nickname: "NZL"
    },
    {
      country: "South Africa",
      pool: "B",
      image: "south-africa.svg",
      nickname: "RSA"
    },
    { country: "Italy", pool: "B", image: "italy.svg", nickname: "ITA" },
    { country: "Namibia", pool: "B", image: "namibia.svg", nickname: "NAM" },
    { country: "Canada", pool: "B", image: "canada.svg", nickname: "CAN" },

    { country: "England", pool: "C", image: "england.svg", nickname: "ENG" },
    { country: "France", pool: "C", image: "france.svg", nickname: "FRA" },
    {
      country: "Argentina",
      pool: "C",
      image: "argentina.svg",
      nickname: "ARG"
    },
    {
      country: "USA",
      pool: "C",
      image: "united-states-of-america.svg",
      nickname: "USA"
    },
    { country: "Tonga", pool: "C", image: "tonga.svg", nickname: "TGA" },

    {
      country: "Australia",
      pool: "D",
      image: "australia.svg",
      nickname: "AUS"
    },
    { country: "Wales", pool: "D", image: "wales.svg", nickname: "WAL" },
    { country: "Georgia", pool: "D", image: "georgia.svg", nickname: "URU" },
    { country: "Fiji", pool: "D", image: "fiji.svg", nickname: "FIJ" },
    { country: "Uruguay", pool: "D", image: "uruguay.svg", nickname: "GEO" }
  ];

  @observable unratedGame = false;
  @observable checkStadiumName = [
    ["Chofu", "Tokyo"],
    ["Sapporo", "Sapporo"],
    ["Yokohama", "Yokohama City"],
    ["Osaka", "Higashiosaka City"],
    ["Toyota", "Toyota City"],
    ["Kumagaya", "Kumagaya City"],
    ["Kamaishi", "Kamaishi City"],
    ["Fukuoka", "Fukuoka City"],
    ["Kobe", "Kobe City"],
    ["Oita", "Oita Prefecture"],
    ["Fukuroi", "Shizuoka Prefecture"],
    ["Kumamoto", "Kumamoto City"]
  ];
  @observable currentRating = "";
  @observable data = rwcSchedule.sport_events;
  @observable alreadyRated = false;

  @action checkForLineup = id => {
    for (let key in backup) {
      if (id === key) {
        return key;
      }
    }
  };

  @action getPoolData() {
    let poolData = this.poolData;
    let newObject = {
      A: [],
      B: [],
      C: [],
      D: []
    };
    let teamList = poolData.team_list;
    let currentPool;
    for (let i = 0; i < teamList.length; i++) {
      if (i >= 0 && i < 5) {
        currentPool = "A";
      } else if (i >= 5 && i < 10) {
        currentPool = "B";
      } else if (i >= 10 && i < 15) {
        currentPool = "C";
      } else {
        currentPool = "D";
      }
      let object = this.createPoolObject(i);
      newObject[currentPool].push(object);
    }
    return newObject;
  }

  @action createPoolObject = i => {
    return {
      teamName: poolData.team_list[i],
      points: poolData.points_list[i],
      gamesPlayed: poolData.games_played_list[i],
      gamesWon: poolData.games_won_list[i],
      gamesDrawn: poolData.games_drawn_list[i],
      gamesLost: poolData.games_lost_list[i],
      triesFor: poolData.tries_for_list[i],
      pointsFor: poolData.points_for_list[i],
      pointsAgainst: poolData.points_against_list[i],
      pointsDiff: poolData.points_diff_list[i],
      bonusPoints: poolData.bonus_points_list[i]
    };
  };

  @action filterData = filterTarget => {
    let filterTargetArray = [];
    const data = rwcSchedule.sport_events;
    const filteredData = [];
    //Create an array out of the team or teams you wish to filter by.
    if (filterTarget.startsWith("Pool")) {
      filterTargetArray = toJS(this.worldCupPools[filterTarget.slice(-1)]);
    } else {
      filterTargetArray.push(filterTarget);
    }

    //Loop through team/s
    for (let t = 0; t < filterTargetArray.length; t++) {
      //Loop through data
      for (let i = 0; i < data.length; i++) {
        //
        for (let c = 0; c < data[i].competitors.length; c++) {
          if (filterTargetArray[t] === data[i].competitors[c].name) {
            filteredData.push(data[i]);
          }
        }
      }
    }
    let uniq = [...new Set(filteredData)];

    let sorted = uniq.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.scheduled) - new Date(b.scheduled);
    });

    this.data = sorted;
  };

  @action averageRating = id => {
    if (this.ratingsObject[id]) {
      let value = this.ratingsObject[id];
      //Forgot to enter some matches into the database leading to the match ratings being entered as strings.. Convert these to numbers.
      if (typeof this.ratingsObject[id][0] === "string") {
        value = value.map(Number);
      }
      let count = value.length;
      let newValue = value.reduce((previous, current) => (current += previous));
      newValue /= count;
      return Math.round(newValue * 10) / 10;
    } else {
      this.unratedGame === true;
      return "Unrated..";
    }
  };

  @action postRating = (value, id) => {
    let jsonData = { [id]: value };
    axios({
      method: "post",
      async: true,
      crossDomain: true,
      url: "https://kickofftimes-7771.restdb.io/rest/ratings",
      headers: {
        "content-type": "application/json",
        "x-apikey": "5d84bbdbfd86cb75861e24f4",
        "cache-control": "no-cache"
      },
      processData: false,
      data: JSON.stringify(jsonData)
    }).then(res => {
      this.alreadyRated = true;
      this.getAllRatings();
    });
  };

  @action getAllRatings = () => {
    let ratingsObject = "";
    this.unratedGame = false;
    this.ratingError = "";

    axios({
      method: "get",
      async: true,
      crossDomain: true,
      url: "https://kickofftimes-7771.restdb.io/rest/ratings",
      headers: {
        "content-type": "application/json",
        "x-apikey": "5d84bbdbfd86cb75861e24f4",
        "cache-control": "no-cache"
      }
    })
      .then(res => {
        ratingsObject = Object.assign({}, ...res.data);
        Object.keys(ratingsObject).forEach(v => (ratingsObject[v] = []));
        res.data.map(data => {
          //From each object, push the key value pairs into the relevent keys in the uniqueKeys object.
          Object.keys(data).forEach(key => {
            ratingsObject[key].push(data[key]);
          });
        });
        if (
          Object.entries(ratingsObject).length === 0 &&
          ratingsObject.constructor === Object
        ) {
          this.unratedGame = true;
        } else {
          try {
            this.ratingsObject = ratingsObject;
          } catch (err) {
            this.ratingError = "Error";
          }
        }
      })
      .catch(err => {
        this.ratingError = "Error";
      });
  };

  @action clearFilterData = () => {
    this.data = rwcSchedule.sport_events;
    this.filterValue = "";
  };
}
