import React, {Component} from 'react';
import '../index.css';
import {inputChange} from './functionsForBananaApp';

class description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '0$',
    }
  }

  playNow(bet) {
    this.props.playNow(bet);
  }

  inputChange(value) {
      this.setState({
        inputText: inputChange(value, this.state.inputText)
      });
  }

  render() {
    return (
      <div>
        <div className="topNav">
          <button className="stopPlaying returnBack" onClick={() => this.props.menu()}>Back</button>
          <p><button className="addMoney" onClick={() =>this.props.addMoney()}>+</button>Account {this.props.user.account}$</p>
        </div>
        <article>
          <h1>{this.props.user.status !== 'unknown' ? `Hello, ${this.props.user.name}` : 'Description'}</h1>
          <h3>Hello my dear friend. Today I'm going to show you my first computer game and explain the rules of it.</h3>
          <p>
            1. There are 4 levels.
            <br/>
            2. You choose one of the five cherries.
            <br/>
            3. After that you will be shown what exactly you have chosen. Was it shit or a banana?
            <br/>
            4. Then you will be offered a choice. You can take money and finish the game or continue it for a greater
            gain.
            <br/>
            5. If you've got crap you can't go on playing.
            <br/>
            6. The greater level you have, the more crap is hidden beside the cherries.
            <br/>
            7. Your bet can't be lower 10$.
            <br/>
            8. All the money you won are stored.
            <br/>
            9. If you lost all your money, you won't be able to play this game anymore.
            <br/>
            Good luck!!!
          </p>
        </article>
        <br/>
        <div className="input-group mb-3 ssize">
          <input type="text" className={this.props.areYouPlaying ? "form-control input" : "form-control input"} placeholder="Your bet"
                 onChange={(e) => this.inputChange(e.target.value)}
                 aria-label="Recipient's username" aria-describedby="button-addon2" value={this.props.areYouPlaying ? "You can't bet. Continue playing" : this.state.inputText} disabled={this.props.btnContinue}/>
          <div className="input-group-append">
            {this.props.areYouPlaying ?
              <button className="btn btn-primary" onClick={() => this.playNow('continue')}>Continue</button> :
              (this.state.inputText === '0$' || +this.state.inputText.slice(0, -1) > this.props.user.account) ?
              <button className="btn btn-outline-secondary disabled" type="button" id="button-addon2">Play</button> :
              <button className="btn btn-outline-secondary"
                      onClick={() => this.playNow(+this.state.inputText.slice(0, -1))} type="button"
                      id="button-addon2">Play</button>
            }
          </div>
        </div>
      </div>

    );
  }
}

export default description;
