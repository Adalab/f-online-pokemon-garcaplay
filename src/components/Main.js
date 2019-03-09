import React, { Component } from 'react';
import PokeList from './PokeList';


class Main extends Component {
    render() {
        return (
            <main>
                <div className="App__body">
                    <PokeList limit={this.props.limit} pokemonDetailsOrdered={this.props.pokemonDetailsOrdered} filterIt={this.props.filterIt}></PokeList>       
                </div>
            </main>
        )
    }
}

export default Main;