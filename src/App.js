import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FrontPage from './components/frontpage/Main';
import RugbyContent from './components/rugby/RugbyContent';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={FrontPage} />
        <Route
          path="/rugby"
          render={props => <RugbyContent sport="rugby" />}
        />
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
