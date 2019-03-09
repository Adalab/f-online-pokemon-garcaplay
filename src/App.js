import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonList: [],
      pokemonUrls: [],
      pokemonDetails: [],
      pokemonDetailsOrdered: [],
    }

    this.getPokemonData = this.getPokemonData.bind(this);
  }

  componentDidMount(){
    this.getPokemonData();
    
  }

  getPokemonData() {
    let pokemonDetailsOrdered;
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0';
    fetch(endpoint)
      .then(res=>res.json())
      .then(poke => {
        poke.results.map(item => {
          fetch(item.url)
          .then(res => res.json())
          .then(data => {
            const pokeType = []; 
            for (let j = 0; j < data.types.length; j++) {
              pokeType.push(data.types[j].type["name"]);
            }
            const poke = {
              pokeName: data.name,
              pokeId: data.id,
              pokeImg: data.sprites.front_default,
              type: pokeType
            };
            const result = this.state.pokemonDetails;
            result.push(poke);
            pokemonDetailsOrdered = this.sortArray(result);
            this.saveData(pokemonDetailsOrdered,'pokemonDetails');
          })
        })
    })
  }

  sortArray(pokemonArray){
    let pokemonDetailsOrdered = []
    for (let i = 1; i <= pokemonArray.length; i++) {
      const filterArray = pokemonArray.filter(pokemonData => (pokemonData.pokeId === i));
      console.log('el filtrado ', filterArray);
      pokemonDetailsOrdered = [...pokemonDetailsOrdered, filterArray];
      console.log('la lista ordenada ', pokemonDetailsOrdered);
      this.setState({
        pokemonDetailsOrdered: pokemonDetailsOrdered
      })
    }
    return pokemonDetailsOrdered;
  }

  saveData(data, dataName){
    localStorage.setItem(dataName,JSON.stringify(data));
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App__title">PokeLab</h1>
          <div className="App__filter">
            <label htmlFor="Filter__name"></label>
            <input type="text" id="Filter__name" name="Filter__name" className="Filter__name"></input>
          </div>
        </header>
        <main>
          <div className="App__body">
            <ul className="List">
            {/* {this.state.pokemonList.map((poke, index)=>{
              
              return(
                <li className="List__item" key={index}>
                  <div className="List__item-card">
                    <div className="Card__header">
                      <div className="Card__id">
                        ID/#Example
                      </div>
                      <img src="" className="Card__img"/>
                    </div>
                    <div className="Card__body">
                      <h2 className="Card__title">{poke.name}</h2>
                      <div className="Card__chips">
                        <h3>ChipExample</h3>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}  */}
            </ul>
          </div>
        </main>
        <footer>
          <div className="App__footer">Here will go a footer with its copyright</div>
        </footer>
      </div>
    );
  }
}

export default App;
