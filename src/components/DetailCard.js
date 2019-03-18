import React, { Component, Fragment } from 'react';
import Ability from './Ability';

class DetailCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            evolutions: []
        }
    }

    isPaint(){
        if(this.props.pokemonDetailsOrdered.length === this.props.limit){
            const filteredPokemons = this.props.pokemonDetailsOrdered.filter(pokemon => pokemon.name.toLowerCase().includes(this.props.filterIt.toLowerCase()));
            const pokemon = filteredPokemons[this.props.match.params.id];
            return (
                <Fragment>
                    <div className="Detail__header">
                        <div className="Detail__id">
                            ID/#{pokemon.id}
                        </div>
                        <img src={pokemon.sprites.front_default} className="Card__img Detail__img" alt={pokemon.name}/>
                    </div>
                    <div className="Detail__body">
                        <h2 className="Detail__title">{pokemon.name}</h2>
                        <div className="Detail__evolution">
                            {/* {this.getEvolution(pokemon)} */}
                        </div>
                        <div className="Detail__info">
                            <div className="Detail__info-size">
                                <p>Height: {pokemon.height} decimetres.</p>
                                <p>Weight: {pokemon.weight} hectograms.</p>
                            </div>
                            <div className="Detail__info-habilities">
                                <ul className="Abilities__list"></ul>
                                {pokemon.abilities.map((ability, index)=>{
                                    return(
                                        <li className="Abilites__list-item" key={index}>
                                            <Ability name={ability.ability.name} url={ability.ability.url}/>
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="Detail__chips">
                            <ul className="Detail__chips-list">
                                {pokemon.types.map((chip, index)=>{
                                    return(
                                        <li className="Chips__list-item" key={index}>
                                            <h3>{chip.type.name}</h3>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    //Work in progress, the evolutions are not working yet
    getEvolution(poke){
        const evolutions = this.props.pokemonEvolutions;
        for(let i=0; i<evolutions.length; i++){
            let noEvol = evolutions[i].chain;
            if(noEvol.species.name.includes(poke.name)){
                console.log('noEvol includes poke.name')
                const text = this.getFirstEvol(noEvol);
                return text;
            } else {
                console.log('ELSE: noEvol includes poke.name')
                for(let j=0; j<evolutions[i].chain.evolves_to.length; j++){
                    let firstEvol = evolutions[i].chain.evolves_to[j].species.name;
                    console.log('firstEvol: ', firstEvol)
                    if(firstEvol.includes(poke.name)){
                        console.log('firstEvol includes poke.name')
                        this.getSecondEvol(noEvol, j);             
                    } else {
                        console.log('ELSE: firstEvol includes poke.name')
                        for(let n=0; n<evolutions[i].chain.evolves_to[j].evolves_to.length; n++){
                            let secondEvol = evolutions[i].chain.evolves_to[j].evolves_to[n].species.name;
                            if(secondEvol.includes(poke.name)){
                                return(<p>Final form</p>)         
                            } 
                        }
                    }
                }
            }                 
        }
    }

    getFirstEvol(noEvol){
        console.log('firstEvol');
        let firstEvol = [];
        let secondEvol = [];
        for(let j=0; j<noEvol.evolves_to.length; j++){
            firstEvol.push(noEvol.evolves_to[j].species.name);
            for(let n=0; n<noEvol.evolves_to[j].evolves_to.length; n++){
                secondEvol.push(noEvol.evolves_to[j].evolves_to[n].species.name);
            }
        }  
        this.setState({
            evolutions: [...this.state.evolutions, firstEvol, secondEvol]
        })    
        return (
            <ul>{this.state.evolutions.map((evolution, index)=>{
                return(<li key={index}>{evolution}</li>)
            })}</ul>
        );
    }

    getSecondEvol(noEvol, j){   
        console.log('entrando en secondEvol');
        let secondEvol = [];
        for(let n=0; n<noEvol.evolves_to[j].evolves_to.length; n++){
            secondEvol.push(noEvol.evolves_to[j].evolves_to[n].species.name);
        }
        console.log('secondEvol: ', secondEvol);
        let resultadoMap = secondEvol.map((evolution, index)=>{
            return(evolution)
        })
        console.log(resultadoMap)
        return (
            <ul>{secondEvol.map((evolution, index)=>{
                return(<li key={index}>{evolution}</li>)
            })}</ul>
        );  
    }

    render() {
        return (
            <div className="List__item-card">
            {this.isPaint()}     
            </div>  
        )
    }
}

export default DetailCard;