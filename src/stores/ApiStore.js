import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

const url = 'http://localhost:9000';

export default class ApiStore {
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable allSportsArray = [];
  @observable currentSportTournaments = [];
  @observable working = true;
  @action getTournamentsBySport = (sport) => {

      for (let i = 0; i < this.allSportsArray.length; i++) {
        if (sport === this.allSportsArray[i].strUrl) {
          axios.get(`/api/get-tournaments-by-sport/${this.allSportsArray[i].strSport}`)
            .then(res=> {
              let tournaments = res.data.data.countrys;
              tournaments.forEach(tournament => {
                tournament.strUrl = this.stringFlattener(tournament.strLeague);
              })
              this.currentSportTournaments = tournaments;
            })
            .catch(err => {
              console.log("error", err);
            })
        }
      }
    }


  @action getSports = () => {
    axios.get('/api/get-sports')
    .then(res => {
      let sports = res.data.data.sports;
      sports.forEach(sport => {
        sport.strUrl = this.stringFlattener(sport.strSport);
      })
      this.allSportsArray = sports;
    })
  }
  @action stringFlattener = (string) => string.replace(/ /g,"-").toLowerCase();
}
