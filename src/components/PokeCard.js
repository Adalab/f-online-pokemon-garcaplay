import React, { Component } from 'react';

class PokeCard extends Component {

    isPaint(){
        if(this.props.pokemonDetailsOrdered.length === this.props.limit){
            const filteredPokemons = this.props.pokemonDetailsOrdered.filter(pokemon => pokemon.name.toLowerCase().includes(this.props.filterIt.toLocaleLowerCase()));
            return(
                filteredPokemons.map((poke, index)=>{
                    return(
                        <li className="List__item" key={index}>
                            <div className="List__item-card">
                                <div className="Card__header">
                                    <div className="Card__id">
                                        ID/#{poke.id}
                                    </div>
                                    <img src={poke.sprites.front_default} className="Card__img" alt={poke.name}/>
                                </div>
                                <div className="Card__body">
                                    <h2 className="Card__title">{poke.name}</h2>
                                    <div className="Card__chips">
                                        <ul className="Card__chips-list">
                                            {poke.types.map((chip, index)=>{
                                                return(
                                                    <li className="Chips__list-item" key={index}>
                                                        <h3>{chip.type.name}</h3>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
            ) 
        } else{
            return(<div>Loading, please wait...</div>)
        }
    }

    render() {
        return (
            this.isPaint()
        )
    }
}

export default PokeCard;