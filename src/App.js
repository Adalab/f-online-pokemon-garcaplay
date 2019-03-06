import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
          <div>Here will go a footer with its copyright</div>
        </footer>
      </div>
    );
  }
}

export default App;
