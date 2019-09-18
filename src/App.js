import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FrontPage from './components/frontpage/Main';
import SportContent from './components/sport/SportContent';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';


function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
        <Switch>
          <Redirect exact from="/" to="/matches" />
          <Route path="/matches" component={FrontPage} />
          <Route path="/pools" component={FrontPage} />


          <Route
           path="/:sport"
           component={SportContent}
         />

        </Switch>
        <Footer />

        </div>

      </div>
    </Router>
  );
}

export default App;
