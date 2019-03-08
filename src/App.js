import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonList: [],
      pokemonUrls: [],
      pokemonDetails: [],
    }

    this.getFirstSavedData = this.getFirstSavedData.bind(this);
    this.getFirstData = this.getFirstData.bind(this);
    this.getSecondSavedData = this.getSecondSavedData.bind(this);
    this.getSecondData = this.getSecondData.bind(this);
  }

  componentDidMount(){
    this.getFirstSavedData();
    
  }

  getFirstSavedData(){
    if(localStorage.getItem('pokemonList') !== null){
      let mySavedData = JSON.parse(localStorage.getItem('pokemonList'));
      this.setState({
        pokemonList: mySavedData,
      })
    } else {
      this.getFirstData();
    }

  }
  getSecondSavedData(){
    if(localStorage.getItem('pokemonDetails') !== null){
      let mySavedData = JSON.parse(localStorage.getItem('pokemonDetails'));
      this.setState({
        pokemonDetails: mySavedData,
      })
    } else {
      this.getSecondData();
    }
  }

  getFirstData(){
    //https://pokeapi.co/api/v2/pokemon/{id or name}/
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0';
    fetch(endpoint)
      .then(res=>res.json())
      .then(data=> {
        let results = data.results;
        this.setState({
          pokemonList: results,
        }, ()=>{this.saveData(this.state.pokemonList, 'pokemonList')})
        }, ()=>{this.getSecondData()})
  }

  getSecondData(){
    this.state.pokemonList.forEach(poke=>{
      fetch(poke.url)
        .then(res=>res.json())
        .then(data=>{
          let results = data;
          this.setState({
            pokemonDetails: [...this.state.pokemonDetails, results],
          }, ()=> this.saveData(this.state.pokemonDetails, 'pokemonDetails'));
        })
    });
  }
  

  saveData(data, dataName){
    if(dataName==='pokemonList'){
    localStorage.setItem(dataName, JSON.stringify(data));
    this.getSecondData();
    } else {
      localStorage.setItem(dataName, JSON.stringify(data));
    }
    
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
            {this.state.pokemonDetails.map((poke, index)=>{
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
            })} 
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
