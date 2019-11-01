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
    console.log("triggered");
      for (let i = 0; i < this.allSportsArray.length; i++) {
        if (sport === this.allSportsArray[i].strUrl) {
          axios.get(`/api/get-tournaments-by-sport/${this.allSportsArray[i].strSport}`)
            .then(res=> {
              let tournaments = res.data.data.countrys;
              tournaments.forEach(tournament => {
                tournament.strUrl = `${this.allSportsArray[i].strUrl}/${this.stringFlattener(tournament.strLeague)}`;
              })
              this.currentSportTournaments = tournaments;
            })
            .catch(err => {
              console.log("error", err);
            })
        }
      }
    }

  @action getTournamentFixtures = (sport, tournament) => {
    console.log("?")
    if(this.currentSportTournaments.length > 0) {
      for(let i = 0; i < this.currentSportTournaments.length; i++) {
        console.log("go")
        if(`${sport}/${tournament}` === this.currentSportTournaments[i].strUrl) {
          console.log("HERE", toJS(this.currentSportTournaments[i]));
          axios.get(`/api/get-tournament-fixtures/${this.currentSportTournaments[i].idLeague}`)
          .then(res => {
            console.log(res.data);
          })
        }
      }
    } else {
      this.getTournamentsBySport(sport);
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
