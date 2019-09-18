import { observable, action, computed, toJS } from "mobx";

import rwcSchedule from '../rwc-schedule.json';



export default class AppStore {
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable filterValue = '';
  @action changeFilterValue = (option) => {
    this.filterValue = option;
    this.filterData(option);
  }
  @observable weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  @observable monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  @observable worldCupPools = {
    "A": ["Ireland", "Scotland", "Japan", "Russia", "Samoa"],
    "B": ["New Zealand", "South Africa", "Italy", "Namibia", "Canada"],
    "C": ["England", "France", "Argentina", "USA", "Tonga"],
    "D": ["Australia", "Wales", "Georgia", "Fiji", "Uruguay"]
  };
  @observable aPoolOfCountries = [
    {"country": "Ireland", "pool": "A", "image": "ireland.svg"}, 
    {"country": "Scotland", "pool": "A", "image": "scotland.svg"}, 
    {"country": "Japan", "pool": "A", "image": "japan.svg"}, 
    {"country": "Russia", "pool": "A", "image": "russia.svg"}, 
    {"country": "Samoa", "pool": "A", "image": "samoa.svg"},

    {"country": "New Zealand", "pool": "B", "image": "new-zealand.svg"}, 
    {"country": "South Africa", "pool": "B", "image": "south-africa.svg"}, 
    {"country": "Italy", "pool": "B", "image": "italy.svg"}, 
    {"country": "Namibia", "pool": "B", "image": "namibia.svg"}, 
    {"country": "Canada", "pool": "B", "image": "canada.svg"},

    {"country": "England", "pool": "C", "image": "england.svg"}, 
    {"country": "France", "pool": "C", "image": "france.svg"}, 
    {"country": "Argentina", "pool": "C", "image": "argentina.svg"}, 
    {"country": "USA", "pool": "C", "image": "united-states-of-america.svg"}, 
    {"country": "Tonga", "pool": "C", "image": "tonga.svg"},

    {"country": "Australia", "pool": "D", "image": "australia.svg"}, 
    {"country": "Wales", "pool": "D", "image": "wales.svg"}, 
    {"country": "Georgia", "pool": "D", "image": "georgia.svg"}, 
    {"country": "Fiji", "pool": "D", "image": "fiji.svg"}, 
    {"country": "Uruguay", "pool": "D", "image": "uruguay.svg"}
  ];

  @observable checkStadiumName = [
    ["Chofu", "Tokyo"], ["Sapporo", "Sapporo"], ["Yokohama", "Yokohama City"], ["Osaka", "Higashiosaka City"], ["Toyota", "Toyota City"],["Kumagaya", "Kumagaya City"], ["Kamaishi", "Kamaishi City"], ["Fukuoka", "Fukuoka City"], ["Kobe", "Kobe City"], ["Oita", "Oita Prefecture"], ["Fukuroi", "Shizuoka Prefecture"], ["Kumamoto", "Kumamoto City"]
  ];
  @observable data = rwcSchedule.sport_events;

  @action filterData = (filterTarget) => {
    let filterTargetArray = [];
    const data = rwcSchedule.sport_events;
    const filteredData = [];
    if (filterTarget.startsWith("Pool")) {
      filterTargetArray = toJS(this.worldCupPools[filterTarget.slice(-1)]);
     

    } else {
      filterTargetArray.push(filterTarget);
    }

    for(let t = 0; t < filterTargetArray.length; t++) {
      for(let i = 0; i < data.length; i++) {
        for(let c = 0; c < data[i].competitors.length; c++) {
          if(filterTargetArray[t] === data[i].competitors[c].name) {
            filteredData.push(data[i]);
          }
        }
      }
    }
    this.data = filteredData;
  };

  @action clearFilterData = () => {
    this.data = rwcSchedule.sport_events;
    this.filterValue = '';
  }

}
