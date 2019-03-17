import React, { Component, Fragment } from 'react';

class Ability extends Component {
    constructor(props){
        super(props);
        this.state = {
            ability: ''
        }
    }
    componentDidMount(){
        this.getAbilityDescription(this.props.url);
    }

    getAbilityDescription(url){
        fetch(url)
        .then(res=>res.json())
        .then(data=> {
            let result = data.effect_entries[0].effect;
            this.setState({
                ability: result
            })
        })
    } 

    render() {
        return (
            <Fragment>
                <h3 className="Abilities__name">{this.props.name}: </h3>
                <p>{this.state.ability}</p>
            </Fragment>
        )
    }
}

export default Ability;




