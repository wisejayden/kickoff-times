import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FrontPage from './components/frontpage/Main';
import SportContent from './components/content/SportContent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={FrontPage} />
        <Route
          path="/rugby"
          render={props => <SportContent sport="rugby" />}
        />
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
