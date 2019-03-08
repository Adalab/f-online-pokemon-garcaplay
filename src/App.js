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

    this.getPokemonData = this.getPokemonData.bind(this);
    // this.getFirstSavedData = this.getFirstSavedData.bind(this);
    // this.getFirstData = this.getFirstData.bind(this);
    // this.getSecondSavedData = this.getSecondSavedData.bind(this);
    // this.getSecondData = this.getSecondData.bind(this);
  }

  componentDidMount(){
    //this.getFirstSavedData();
    this.getPokemonData();
  }

  getPokemonData() {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0';
    fetch(endpoint)
      .then(res=>res.json())
      .then(poke => {
        console.log(poke.results);
        poke.results.map(item => {
          console.log(item.url);
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
            this.setState({
              pokemonDetails: result
          });
          //this.saveData(this.state.pokemonDetails,'pokemonDetails');
        })
        console.log(this.state.pokemonDetails);
      })
        // });
        // for (let i = 0; i < pokeUrl.length; i++){
        //   fetch(pokeUrl[i])
        //     .then(res => res.json())
        //     .then(data => {
        //       const pokeType = []; 
        //       for (let j = 0; j < data.types.length; j++) {
        //         pokeType.push(data.types[j].type["name"]);
        //       }
        //       const poke = {
        //         pokeName: data.name,
        //         pokeId: data.id,
        //         pokeImg: data.sprites.front_default,
        //         type: pokeType
        //       };
        //       const result = this.state.pokemonDetails;
        //       result.push(poke);
        //       this.setState({
        //         pokemonDetails: result
        //     });
        //     //this.saveData(this.state.pokemonDetails,'pokemonDetails');
        //   })
        // }
        // this.sortArray();
    })
  }
  sortArray(){
    console.log(this.state.pokemonDetails[0]);
    let sortedArray= this.state.pokemonDetails.sort(function(a, b){
      
      return b.pokeId - a.pokeId
    })
    console.log(sortedArray[0]);
  }

  saveData(data, dataName){
    localStorage.setItem(dataName,JSON.stringify(data))
  }

  // getFirstSavedData(){
  //   if(localStorage.getItem('pokemonList') !== null){
  //     let mySavedData = JSON.parse(localStorage.getItem('pokemonList'));
  //     this.setState({
  //       pokemonList: mySavedData,
  //     })
  //   } else {
  //     this.getFirstData();
  //   }

  // }
  // getSecondSavedData(){
  //   if(localStorage.getItem('pokemonDetails') !== null){
  //     let mySavedData = JSON.parse(localStorage.getItem('pokemonDetails'));
  //     this.setState({
  //       pokemonDetails: mySavedData,
  //     })
  //   } else {
  //     this.getSecondData();
  //   }
  // }

  // getFirstData(){
  //   //https://pokeapi.co/api/v2/pokemon/{id or name}/
  //   const endpoint = 'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0';
  //   fetch(endpoint)
  //     .then(res=>res.json())
  //     .then(data=> {
  //       let results = data.results;
  //       this.setState({
  //         pokemonList: results,
  //       }, ()=>{this.saveData(this.state.pokemonList, 'pokemonList')})
  //       }, ()=>{this.getSecondData()})
  // }

  // getSecondData(){
  //   console.log('entramos a getSecondData');
  //   let results = [];
  //   for(let i=0; i < this.state.pokemonList.length; i++){
  //     fetch(this.state.pokemonList[i].url)
  //       .then(res=>res.json())
  //       .then(data=>{
  //         results.push(data);
  //         this.setState({
  //           pokemonDetails: [...this.state.pokemonDetails, results],
  //         });
  //       })
  //   } 
  //   ()=> this.saveData(this.state.pokemonDetails, 'pokemonDetails');
  //   //()=> this.sortArray(results));
  // }
  
  // // sortArray(results){
  // //   this.state.pokemonList.forEach(function(key){
  // //     let found = false;
  // //     results.filter(function(item){
  // //       console.log('estamos comparando ', item.forms.name, ' con ', key.name);
  // //       if(!found && item.forms.name === key.name){
  // //         this.setState({
  // //           pokemonDetails: item
  // //         });
  // //         found = true;
  // //         return false;
  // //       } else {
  // //         return true;
  // //       }
  // //     })
  // //   }, ()=>{this.saveData(this.state.pokemonDetails, 'pokemonDetails')})
  // // }

  // saveData(data, dataName){
  //   if(dataName==='pokemonList'){
  //   localStorage.setItem(dataName, JSON.stringify(data));
  //   this.getSecondData();
  //   } else {
  //     localStorage.setItem(dataName, JSON.stringify(data));
  //   }
    
  // }
  
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
            {this.state.pokemonList.map((poke, index)=>{
              
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
