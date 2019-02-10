import React, { Component } from 'react';
import './index.css';
import ChooseAGame from './ChooseAGame';
import BananasAndShit from './bananas and shit';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isGameChosen : false,
      bananasAndShit : false,
    }
  }

  chosenGame(name){
    this.setState({
      isGameChosen : true,
      bananasAndShit : true,
    })
  }

  render() {
    return (
      <div className="App">
        {!this.state['isGameChosen'] && <ChooseAGame chosenGame={(name) => this.chosenGame(name)}/>}
        {this.state['bananasAndShit'] && <BananasAndShit chosenGame={(name) => this.chosenGame(name)}/>}
      </div>
    );
  }
}

export default App;
