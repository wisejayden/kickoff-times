import React, {useEffect, useContext} from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SelectSport from './components/SelectSport/SelectSport';
import FrontPage from './components/frontpage/Main';
import SportContent from './components/sport/SportContent';
import NotFound from './components/NotFound/NotFound';
import SelectTournament from './components/SelectTournament/SelectTournament';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./index";


import './App.scss';

const sports = ["Rugby"];


const App = observer((props) => {
  const apiStore = useContext(StoreContext).ApiStore;

  useEffect(() => {
    apiStore.getSports();
  }, [])

  // <Route path="/matches" component={FrontPage} />
  // <Route path="/pools" component={FrontPage} />
  // <Route path="/ratings" component={FrontPage} />

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
        <Switch>
          <Route path="/:sport" render={(props) => <SelectTournament {...props} view={"Tournament"}/>} />


        <Route path="/" render={(props) => <SelectSport {...props} view={"Sport"}/>} />



         <Route component={NotFound} />



        </Switch>
        <Footer />

        </div>

      </div>
    </Router>
  );
}

export default App;
