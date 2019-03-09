import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return (
            <div className="App__filter">
                <label htmlFor="Filter__name"></label>
                <input type="text" id="Filter__name" name="Filter__name" className="Filter__name" onKeyUp={this.props.getFilter}></input>
            </div>
        )
    }
}

export default Filter;