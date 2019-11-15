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
  @observable tournamentSeasons = [];
  @observable fetchedIntialSportsData = false;
  @observable fetchedTournamentsBySport = false;
  @observable currentSport = '';
  @observable teamDetailsArray = [];
  @observable tournamentTeams = [];

  // super rugby id = 4551
  // team id is = 136661
  @action getTournamentsBySport = (sport) => {
      return new Promise((resolve, reject) => {
        if(this.fetchedIntialSportsData === true) {
          this.fetchedTournamentsBySport = true;
          this.currentSport = sport;
            for (let i = 0; i < this.allSportsArray.length; i++) {
              if (sport === this.allSportsArray[i].strUrl) {
                axios.get(`/api/get-tournaments-by-sport/${this.allSportsArray[i].strSport}`)
                  .then(res=> {
                    let tournaments = res.data.data.countrys;
                    tournaments.forEach(tournament => {
                      tournament.strUrl = `${this.allSportsArray[i].strUrl}/${this.stringFlattener(tournament.strLeague)}`;
                    })
                    console.log("currentSportTournaments", toJS(tournaments));
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
          this.currentTournament = tournament;

          // axios.get(`/api/get-tournament-fixtures/${this.currentSportTournaments[i].idLeague}`)
          // .then(res => {
          //   console.log("???", res.data.data);
          //   this.tournamentFixtures = res.data.data;
          // })
          this.getSeasons(this.currentSportTournaments[i].idLeague)
          .then(() => {
            console.log("ID", this.currentSportTournaments[i].idLeague);
            axios.get(`/api/get-tournament-fixtures/${this.currentSportTournaments[i].idLeague}/${this.currentSeason.strSeason}`)
              .then(res => {
                console.log("currentSportTournaments and Teams", res);
                this.tournamentFixtures = res.data.seasonRes.events;
                this.tournamentTeams = res.data.teamsRes.teams;
              })
          })
        }
      }
    } else {
      this.getTournamentsBySport(sport);
    }
  }
  @action getSeasons = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/get-seasons/${id}`)
      .then(res => {
        this.tournamentSeasons = res.data.data.seasons;
        this.currentSeason = res.data.data.seasons.slice(-1)[0];
        resolve();
      })
    })
  }

  @action getSports = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/get-sports')
      .then(res => {
        let sports = res.data.data.sports;
        sports.forEach(sport => {
          sport.strUrl = this.stringFlattener(sport.strSport);
        })
        this.allSportsArray = sports;
        this.fetchedIntialSportsData = true;
        resolve();
      })
      .catch(err => {
          console.log(err);
          reject();
      })
    })
  }
  // @action getTeamDetails = (teamsIdArray) => {
  //   let currentTeamDetails = [];
  //   let firstTeamFetched = false;
  //   let secondTeamFetched = false;
  //
  //   let someArray = [1];
  //   someArray.splice(0, 0);
  //
  //   return new Promise((resolve, reject) => {
  //     for(let i = 0; i < this.teamDetailsArray.length; i ++) {
  //       //If teamData is present, dont make another call.
  //       if(teamDetailsArray[i].idLeague === teamsIdArray[0]) {
  //         currentTeamDetails.unshift(teamDetailsArray[i])
  //         teamsIdArray.splice(0, 0);
  //         firstTeamFetched = true;
  //       }
  //       if(teamDetailsArray[i].idLeague === teamsIdArray[1]) {
  //         currentTeamDetails.push(teamDetailsArray[i])
  //         teamsIdArray.splice(1, 1);
  //         secondTeamFetched = true;
  //       }
  //     }
  //     let promise1 = new Promise((resolve, reject) => {
  //       axios.get(`/api-get-team-details/${teamsIdArray[0]}/${0}`)
  //       .then(res => {
  //         currentTeamDetails.unshift(res.data.data.teams[0]);
  //         resolve();
  //       })
  //     })
  //     let promise2 = new Promise((resolve, reject) => {
  //       axios.get(`/api-get-team-details/${teamsIdArray[1]}/${1}`)
  //       .then(res => {
  //         currentTeamDetails.unshift(res.data.data.teams[0]);
  //         resolve();
  //       })
  //     })
  //     Promise.all([promise1, promise2]).then(() => {
  //       resolve(currentTeamDetails);
  //     })
  //   })
  // }

  // @action getTeamDetails = (teamsIdArray) => {
  //   let currentTeamDetails = [];
  //   let firstTeamFetched = false;
  //   let secondTeamFetched = false;
  //
  //   let someArray = [1];
  //   someArray.splice(0, 0);
  //   if(someArray.length > 0) console.log("yay", someArray);
  //   if(!someArray) console.log("nay");
  //
  //
  //   return new Promise((resolve, reject) => {
  //     for(let i = 0; i < this.teamDetailsArray.length; i ++) {
  //       //If teamData is present, dont make another call.
  //       if(teamDetailsArray[i].idLeague === teamsIdArray[0]) {
  //         currentTeamDetails.unshift(teamDetailsArray[i])
  //         teamsIdArray.splice([0], 0);
  //         firstTeamFetched = true;
  //       }
  //       if(teamDetailsArray[i].idLeague === teamsIdArray[1]) {
  //         currentTeamDetails.push(teamDetailsArray[i])
  //         teamsIdArray.splice([1], 1);
  //         secondTeamFetched = true;
  //       }
  //     }
  //     return new Promise((resolveAPI, reject) => {
  //       if(teamsIdArray) teamsIdArray.forEach((id, i) => {
  //         console.log("id", id);
  //         axios.get(`/api-get-team-details/${id}`)
  //         .then((res) => {
  //           //Push both responses to the store array.
  //           this.teamDetailsArray.push(res.data.data.teams[0]);
  //           //If
  //           if(i === 0) {
  //             currentTeamDetails.unshift(res.data.data.teams[0]);
  //           } else {
  //             currentTeamDetails.push(res.data.data.teams[0]);
  //             console.log("resolveAPi", currentTeamDetails, currentTeamDetails.length);
  //             resolveAPI();
  //           }
  //         })
  //       })
  //     }).then(() => {
  //       console.log("currentTeamDetails", currentTeamDetails, currentTeamDetails.length);
  //       if(currentTeamDetails.length === 2) {
  //         resolve(currentTeamDetails);
  //       } else {
  //         console.log("what the fuck");
  //       }
  //     })
  //   })
  // }

  @action stringFlattener = (string) => string.replace(/ /g,"-").toLowerCase();
}
