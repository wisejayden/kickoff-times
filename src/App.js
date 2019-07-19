import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FrontPage from './components/frontpage/Main';
import SportContent from './components/sport/SportContent';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route
           path="/:sport"
           component={SportContent}
         />
        </Switch>
        
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
