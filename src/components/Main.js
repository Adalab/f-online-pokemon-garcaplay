import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import PokeList from './PokeList';
import DetailCard from './DetailCard';


class Main extends Component {
    render() {
        return (
            <main>
                <div className="App__body">
                <Switch>
                    <Route exact path="/" render={props => (<PokeList match={props.match} limit={this.props.limit} pokemonDetailsOrdered={this.props.pokemonDetailsOrdered} filterIt={this.props.filterIt} pokemonEvolutions={this.props.pokemonEvolutions}/>)}/>
                    <Route path="/detail/:id" render={props => (<DetailCard match={props.match} limit={this.props.limit} pokemonDetailsOrdered={this.props.pokemonDetailsOrdered} filterIt={this.props.filterIt} pokemonEvolutions={this.props.pokemonEvolutions}/>)}/>
                </Switch> 
                </div>
            </main>
        )
    }
}

export default Main;