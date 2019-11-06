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
  @observable tournamentFixtures = [];
  @observable fetchedIntialSportsData = false;
  @observable fetchedTournamentsBySport = false;

  @action getTournamentsBySport = (sport) => {
      return new Promise((resolve, reject) => {
        if(this.fetchedIntialSportsData === true) {
          this.fetchedTournamentsBySport = true;

            for (let i = 0; i < this.allSportsArray.length; i++) {
              if (sport === this.allSportsArray[i].strUrl) {
                console.log("API CALL - getTournamentsBySport");
                axios.get(`/api/get-tournaments-by-sport/${this.allSportsArray[i].strSport}`)
                  .then(res=> {
                    let tournaments = res.data.data.countrys;
                    tournaments.forEach(tournament => {
                      tournament.strUrl = `${this.allSportsArray[i].strUrl}/${this.stringFlattener(tournament.strLeague)}`;
                    })
                    this.currentSportTournaments = tournaments;
                    resolve();
                  })
                  .catch(err => {
                    console.log("error", err);
                  })
              }
            }
        } else {
          reject();
        }


      })

    }

    // @action hello = async () => {
    //   console.log("hello function", toJS(this.allSportsArray));
    //   await this.allSportsArray;
    //   console.log("waited for allSportsArray", toJS(this.allSportsArray));
    //
    // }

  @action getTournamentFixtures = (sport, tournament) => {
    if(this.currentSportTournaments.length > 0) {
      for(let i = 0; i < this.currentSportTournaments.length; i++) {
        if(`${sport}/${tournament}` === this.currentSportTournaments[i].strUrl) {
          console.log("Api call - getTournamentFixtures");
          axios.get(`/api/get-tournament-fixtures/${this.currentSportTournaments[i].idLeague}`)
          .then(res => {
            console.log("HURRAY!", res.data);
            this.tournamentFixtures = res.data;

          })
        }
      }
    } else {
      console.log("getting all tournaments");
      this.getTournamentsBySport(sport);
    }

  }


  @action getSports = () => {
    return new Promise((resolve, reject) => {
      console.log("API call - getSports");
      axios.get('/api/get-sports')
      .then(res => {
        console.log("promise res", res.data)
        let sports = res.data.data.sports;
        sports.forEach(sport => {
          sport.strUrl = this.stringFlattener(sport.strSport);
        })
        this.allSportsArray = sports;
        this.fetchedIntialSportsData = true;
        resolve();
      })
    })
  }
  @action stringFlattener = (string) => string.replace(/ /g,"-").toLowerCase();
}
