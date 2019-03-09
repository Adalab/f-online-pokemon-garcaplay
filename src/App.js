import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonDetails: [],
      pokemonDetailsOrdered: [],
      filterIt: '',
      offset: 0,
      limit: 25,
    }

    this.getSavedData = this.getSavedData.bind(this);
    this.getData = this.getData.bind(this);
    this.getFilter = this.getFilter.bind(this);
  }

  componentDidMount(){
    this.getSavedData();
  }

  getSavedData(){
    if(localStorage.getItem('pokemonDetailsBackup') !== null){
      let dataSaved = JSON.parse(localStorage.getItem('pokemonDetailsBackup'));
      this.setState({
        pokemonDetailsOrdered: dataSaved,
      })
    } else {
      this.getData();
    }
  }

  getData(){
    let orderedPokemonList=[];
    const requestOffset = this.state.offset;
    const requestLimit = this.state.limit;
    const endpoint = `https://pokeapi.co/api/v2/pokemon/?limit=${requestLimit}&offset=${requestOffset}`;
    fetch(endpoint)
      .then(res=>res.json())
      .then(data=> {
        let results = data.results;
        results.map(poke=>{
          return(fetch(poke.url)
          .then(res=>res.json())
          .then(data=>{
            const secondFetchResults = this.state.pokemonDetails;
            secondFetchResults.push(data);
            this.setState({
              pokemonDetails: secondFetchResults,
            })
            orderedPokemonList = this.sortArray(secondFetchResults, requestOffset, requestLimit);
            this.saveData(orderedPokemonList, 'pokemonDetailsBackup');
          }))
        })
    });
  }

  sortArray(pokemonArray){
    let arrayToOrder = []
    for(let i=this.state.offset+1; i<=pokemonArray.length+this.state.offset; i++){
      console.log('i = ',i);
      const filteredArray = pokemonArray.filter(pokemonData => (pokemonData.id === i));
      arrayToOrder = [...arrayToOrder, filteredArray[0]];
      this.setState({
        pokemonDetailsOrdered: arrayToOrder,
      })
      
    }
    return arrayToOrder;
  }
  
  saveData(data, dataName){
    localStorage.setItem(dataName, JSON.stringify(data));
  }

  getFilter(e){
    const text = e.currentTarget.value;
    this.setState({
      filterIt: text,
    })
  }

  isPaint(){
    if(this.state.pokemonDetailsOrdered.length === this.state.limit){
      const filteredPokemons = this.state.pokemonDetailsOrdered.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.filterIt.toLocaleLowerCase()));
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
      return(<div>Nothing</div>)
    }
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App__title">PokeLab</h1>
          <div className="App__filter">
            <label htmlFor="Filter__name"></label>
            <input type="text" id="Filter__name" name="Filter__name" className="Filter__name" onKeyUp={this.getFilter}></input>
          </div>
        </header>
        <main>
          <div className="App__body">
            <ul className="List">
            {this.isPaint()} 
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
