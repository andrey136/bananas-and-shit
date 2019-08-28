import React, {Component} from 'react';
import '../index.css';
import Xs from '../photos/X_and_O-photos/Xs.png';
import Os from '../photos/X_and_O-photos/Os.png';

class game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      str: '',
      count: 0,
      chosenItems_X: [],
      chosenItems_O: [],
      winIndexs: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      trueOrFalse: [],
      _end: false,
    }
  }

  chosen(id) {
    if (!this.state.chosenItems_X.includes(id) && !this.state.chosenItems_O.includes(id) && !this.state._end) {
      let count = this.state.count;
      let chosenItems_X = this.state.chosenItems_X;
      let chosenItems_O = this.state.chosenItems_O;
      if (count % 2) {
        chosenItems_O.push(id);
      } else {
        chosenItems_X.push(id);
      }
      this.setState({
        count: ++count,
      });
      count > 4 && this.end();
    }
  }

  end(){
      let trueOrFalse = this.state.trueOrFalse;
      if(trueOrFalse.length === 0) {
          this.state.winIndexs.map(el => {
              trueOrFalse.push(el.every(cur => this.state.chosenItems_X.indexOf(cur) > -1));
          });
          console.log(trueOrFalse);
          if (trueOrFalse.includes(true)) {
              this.setState({
                  _end: true,
                  str: 'Player 1 wins',
              });
          } else {
              this.setState({
                  trueOrFalse: [],
              });
              trueOrFalse = [];
          }
      }
      if(trueOrFalse.length === 0 && !this.state._end){
          this.state.winIndexs.map(el => {
              trueOrFalse.push(el.every(cur => this.state.chosenItems_O.indexOf(cur) > -1));
          });
          if(trueOrFalse.includes(true)){
              this.setState({
                  _end: true,
                  str: 'Player 2 wins',
              });
          } else {
              this.setState({
                  trueOrFalse: [],
              });
          }
      }
  }

  render() {
    return (
      <section id="game">
        <h1>Game Xs and Os</h1>
        <div className="container">
          <div onClick={() => this.chosen(0)}>
            {this.state.chosenItems_O.includes(0) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(0) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(1)}>
            {this.state.chosenItems_O.includes(1) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(1) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(2)}>
            {this.state.chosenItems_O.includes(2) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(2) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(3)}>
            {this.state.chosenItems_O.includes(3) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(3) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(4)}>
            {this.state.chosenItems_O.includes(4) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(4) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(5)}>
            {this.state.chosenItems_O.includes(5) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(5) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(6)}>
            {this.state.chosenItems_O.includes(6) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(6) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(7)}>
            {this.state.chosenItems_O.includes(7) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(7) && <img src={Xs} alt=""/>}
          </div>
          <div onClick={() => this.chosen(8)}>
            {this.state.chosenItems_O.includes(8) && <img src={Os} alt=""/>}
            {this.state.chosenItems_X.includes(8) && <img src={Xs} alt=""/>}
          </div>
        </div>
        {this.state._end && <h2>{this.state.str}</h2>}
      </section>
    );
  }
}

export default game;