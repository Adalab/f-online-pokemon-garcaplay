import React, { Component } from 'react';
import PokeCard from './PokeCard';

class PokeList extends Component {
    render() {
        return (
            <ul className="List">
                <PokeCard limit={this.props.limit} pokemonDetailsOrdered={this.props.pokemonDetailsOrdered} filterIt={this.props.filterIt} pokemonEvolutions={this.props.pokemonEvolutions}></PokeCard> 
            </ul>
        )
    }
}

export default PokeList;