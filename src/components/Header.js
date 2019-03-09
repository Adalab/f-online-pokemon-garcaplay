import React, { Component } from 'react';
import Filter from './Filter';


class Header extends Component {
    render() {
        return (
            <header>
                <h1 className="App__title">PokeLab</h1>
                <Filter getFilter={this.props.getFilter}></Filter>
            </header>
        )
    }
}

export default Header;