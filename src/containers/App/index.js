import React, { Component } from 'react';
import Pneus from '../Pneus';
import FormPneu from '../FormPneu'
import Ventes from '../Ventes'
import Footer from '../Footer';
import Home from '../Home'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

class App extends Component {    

  render() {
    return(
        <Router id="root">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/pneus" component={Pneus} />
                <Route path="/formPneu" component={FormPneu} />
                <Route path="/ventes" component={Ventes} />
            </Switch>
            <Footer />
        </Router>
    )
  }
}


export default App;