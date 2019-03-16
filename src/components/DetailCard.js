import React, { Component, Fragment } from 'react';


class DetailCard extends Component {

    isPaint(){
        if(this.props.pokemonDetailsOrdered.length === this.props.limit){
            const filteredPokemons = this.props.pokemonDetailsOrdered.filter(pokemon => pokemon.name.toLowerCase().includes(this.props.filterIt.toLowerCase()));
            console.log(this.props.pokemonDetailsOrdered);
            return (
                <Fragment>
                    <div className="Card__header">
                        <div className="Card__id">
                            ID/#{filteredPokemons[this.props.match.params.id].id}
                        </div>
                        <img src={filteredPokemons[this.props.match.params.id].sprites.front_default} className="Card__img" alt={filteredPokemons[this.props.match.params.id].name}/>
                    </div>
                    <div className="Card__body">
                        <h2 className="Card__title">{filteredPokemons[this.props.match.params.id].name}</h2>
                        <div className="Card__evolution">
                                {/* <p>Previous form: {this.isEvolved(this.props)}</p>  */}
                        </div>
                        <div className="Card__chips">
                            <ul className="Card__chips-list">
                                {filteredPokemons[this.props.match.params.id].types.map((chip, index)=>{
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

    // isEvolved(poke){
    //     const evolutions = this.props.pokemonEvolutions
    //     for(let i=0; i<evolutions.length; i++){
    //         let noEvol = evolutions[i].chain.species.name;
    //         if(noEvol.includes(poke.name)){
    //             const text = 'no previous form';
    //             return text                   
    //         } else{
    //             for(let j=0; j<evolutions[i].chain.evolves_to.length; j++){
    //                 let firstEvol = evolutions[i].chain.evolves_to[j].species.name;
    //                 if(firstEvol.includes(poke.name)){
    //                     return noEvol;             
    //                 } else {
    //                     for(let n=0; n<evolutions[i].chain.evolves_to[j].evolves_to.length; n++){
    //                         let secondEvol = evolutions[i].chain.evolves_to[j].evolves_to[n].species.name;
    //                         if(secondEvol.includes(poke.name)){
    //                             const text = `${noEvol} and ${firstEvol}`
    //                             return text;            
    //                         } 
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    render() {
        return (
            <div className="List__item-card">
            {this.isPaint()}     
            </div>  
        )
    }
}

export default DetailCard;