import { observable, action, computed } from "mobx";


export default class AppStore {
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
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
    {"country": "Ireland", "pool": "A"}, 
    {"country": "Scotland", "pool": "A"}, 
    {"country": "Japan", "pool": "A"}, 
    {"country": "Russia", "pool": "A"}, 
    {"country": "Samoa", "pool": "A"},

    {"country": "New Zealand", "pool": "B"}, 
    {"country": "South Africa", "pool": "B"}, 
    {"country": "Italy", "pool": "B"}, 
    {"country": "Namibia", "pool": "B"}, 
    {"country": "Canada", "pool": "B"},

    {"country": "England", "pool": "C"}, 
    {"country": "France", "pool": "C"}, 
    {"country": "Argentina", "pool": "C"}, 
    {"country": "USA", "pool": "C"}, 
    {"country": "Tonga", "pool": "C"},

    {"country": "Australia", "pool": "D"}, 
    {"country": "Wales", "pool": "D"}, 
    {"country": "Georgia", "pool": "D"}, 
    {"country": "Fiji", "pool": "D"}, 
    {"country": "Uruguay", "pool": "D"}
  ];
}
