import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonDetails: [],
      pokemonDetailsOrdered: [],
      pokemonEvolutions: [],
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
    if(localStorage.getItem('pokemonDetailsBackup') !== null && localStorage.getItem('pokemonEvolutionsBackup') !== null){
      let dataSaved = JSON.parse(localStorage.getItem('pokemonDetailsBackup'));
      let evolutionSaved = JSON.parse(localStorage.getItem('pokemonEvolutionsBackup'));
      this.setState({
        pokemonDetailsOrdered: dataSaved,
        pokemonEvolutions: evolutionSaved,
      })
    } else if(localStorage.getItem('pokemonDetailsBackup') !== null){
      let dataSaved = JSON.parse(localStorage.getItem('pokemonDetailsBackup'));
      this.setState({
        pokemonDetailsOrdered: dataSaved,
      })
    } else if(localStorage.getItem('pokemonEvolutionsBackup') !== null){
      let evolutionSaved = JSON.parse(localStorage.getItem('pokemonEvolutionsBackup'));
      this.setState({
        pokemonEvolutions: evolutionSaved,
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
      })
      .then(this.getEvolution());
  }
  getEvolution(){
    const endpoint = `https://pokeapi.co/api/v2/evolution-chain`;
    fetch(endpoint)
      .then(res=>res.json())
      .then(data=> {
        let results = data.results;
        results.map(poke=>{
          return(
            fetch(poke.url)
            .then(res=>res.json())
            .then(data=>{
              const evolutionResults = this.state.pokemonEvolutions;
              evolutionResults.push(data);
              this.setState({
                pokemonEvolutions: evolutionResults,
              })
              this.saveData(evolutionResults, 'pokemonEvolutionsBackup');
            }))
        })
    });
  }

  sortArray(pokemonArray){
    let arrayToOrder = []
    for(let i=this.state.offset+1; i<=pokemonArray.length+this.state.offset; i++){
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
        <Header getFilter={this.getFilter}></Header>
        <Main limit={this.state.limit} pokemonDetailsOrdered={this.state.pokemonDetailsOrdered} filterIt={this.state.filterIt} pokemonEvolutions={this.state.pokemonEvolutions}></Main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
