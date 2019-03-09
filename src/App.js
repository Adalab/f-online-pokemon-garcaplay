import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
import Filter from './components/Filter';

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
  
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App__title">PokeLab</h1>
          <Filter getFilter={this.getFilter}></Filter>
        </header>
        <main>
          <div className="App__body">
            <PokeList limit={this.state.limit} pokemonDetailsOrdered={this.state.pokemonDetailsOrdered} filterIt={this.state.filterIt}></PokeList>       
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
