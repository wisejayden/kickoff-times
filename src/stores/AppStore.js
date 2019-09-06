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
  }
}
