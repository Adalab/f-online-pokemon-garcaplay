import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonList: [],
    }

    this.getSavedData = this.getSavedData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
    this.getSavedData();
  }

  getSavedData(){
    if(localStorage.getItem('pokemonList') !== null){
      let mySavedData = JSON.parse(localStorage.getItem('pokemonList'));
      this.setState({
        pokemonList: mySavedData,
      })
    } else {
      this.getData();
    }
  }

  getData(){
    //https://pokeapi.co/api/v2/pokemon/{id or name}/
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/';
    fetch(endpoint)
      .then(res=>res.json())
      .then(data=> {
        console.log(data);
        let results = data.results;
        this.setState({
          pokemonList: results,
        });
        this.saveData(this.state.pokemonList, 'pokemonList');
        }
      ); 
  }

  saveData(data, dataName){
    localStorage.setItem(dataName, JSON.stringify(data))
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
              <li className="List__item">
                <div className="List__item-card">
                  <div className="Card__header">
                    <div className="Card__id">
                      ID/#Example
                    </div>
                    <img src="" className="Card__img"/>
                  </div>
                  <div className="Card__body">
                    <h2 className="Card__title">NameExample</h2>
                    <div className="Card__chips">
                      <h3>ChipExample</h3>
                    </div>
                  </div>
                </div>
              </li>
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
