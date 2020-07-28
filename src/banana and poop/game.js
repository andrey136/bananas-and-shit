import React, {Component} from 'react';
import Cherry from './cherry';
import Fruits from './Fruits';
import '../index.css';
import Description from './description';
import {game1} from './functionsForBananaApp';
import {game2} from './functionsForBananaApp';
import {game3} from './functionsForBananaApp';
import {game4} from './functionsForBananaApp';
import {counter} from './functionsForBananaApp';
import {changeAccountMoney} from "../apiFunctions";
import Statistics from "./statistics";

class BananasAndShit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didYouLose: false, // when you take money the field "You Lost" doesn't show up
      choosingCherry: true,//this var shows whether the user is shown a list of cherries or a list of bananas with crap
      counter: 0,
      fruits: [], // the array of numbers 1s and 0s representing a banana(1) and crap(0)
      level: 1,
      howManyTimesYouWon: 0,
      areYouPlaying: false, // if a user started playing, he will be able to continue playing this game
      description: true,  // shows the description field. When false the game starts
      bet: 10,
      //btnContinue: false,
      user: this.props.user, // user info
      showButtonsWinsDefeat: false, // an issue when the user needs to be shown the info that he won or lost. Sometimes he doesn't need to know that info at all. especially in the beginning
    }
  }

  tryAgain() {
    this.setState({
      choosingCherry: true,
      fruits: [],
      showButtonsWinsDefeat: false
    });
  }

  newGame(bet) {
    if (bet === undefined) bet = this.state.bet;
    if (bet === 'continue') {
      this.playNow(bet);
    } else {
      this.setState({
        counter: 0,
        choosingCherry: true,
        fruits: [],
        level: 1,
        howManyTimesYouWon: 0,
        areYouPlaying: false,
        bet: bet,
        description: false,
        showButtonsWinsDefeat: false,
        didYouLose: false,
      });
    }
  }

  takeMoney() {
    const user = {...this.state.user};
    user.account += this.state.counter;
    console.log('TAKE_MONEY', user);
    changeAccountMoney(user._id, user)
      .then(res => {
          localStorage.setItem('user', JSON.stringify(res));
        }
      );
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({
      counter: 0,
      choosingCherry: true,
      fruits: [],
      level: 1,
      howManyTimesYouWon: 0,
      user: user,
      areYouPlaying: false,
      didYouLose: false
    });
  }

  chgMoneyStateOnServer(){ // split it later
    let money = this.state.user.account - this.state.bet;
    let user = {...this.state.user};
    user.account = money;
    changeAccountMoney(user._id, user)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(user));
        this.chgUserState(user);
        }
      );
  }

  game(x) {
    let howManyTimesYouWon = this.state.howManyTimesYouWon;
    let level = this.state.level;
    let c = this.state.counter;
    let areYouPlaying = this.state.areYouPlaying;
    let arr1;
    if(howManyTimesYouWon === 0) this.chgMoneyStateOnServer();
    if (level === 1) arr1 = game4(x);
    if (level === 2) arr1 = game3(x);
    if (level === 3) arr1 = game2(x);
    if (level === 4) arr1 = game1(x);
    if (!arr1[x]) {// LOSING
      c = 0;
      areYouPlaying = false;
      level = 1;
      this.setState({choosingCherry: false, didYouLose: true})// if you delete it the user won't be shown a list of bananas and shit
    } else {// WINNING
      c = counter(this.state.howManyTimesYouWon, this.state.bet);
      areYouPlaying = true;
      howManyTimesYouWon += 1;
      if (howManyTimesYouWon === 4) level += 1;
      if (howManyTimesYouWon === 7) level += 1;
      if (howManyTimesYouWon === 9) level += 1;
      this.setState({choosingCherry: false}) // if you delete it the user won't be shown a list of bananas and shit
    }
    this.setState({
      fruits: arr1,
      counter: c,
      level: level,
      howManyTimesYouWon: howManyTimesYouWon,
      areYouPlaying: areYouPlaying,
      showButtonsWinsDefeat: true
    });
  }

  playNow(bet) {//continue playing
    if (bet === 'continue') bet = this.state.bet;
    this.setState({
      description: false,
      bet: bet
    })
  }

  stopPlaying() {
    this.setState({
      //btnContinue: false,
      description: true,
      showButtonsWinsDefeat: false
    })
  }

  back() {
    if (this.state.description) {

      this.props.menu('bananas-and-shit');
      this.props.account(this.state.money);
    } else {
      this.setState({
        description: true,
      })
    }
  }

  addMoney() {
    let user = {...this.state.user};
    let sum = this.state.user.account;
    if(user.status === 'Best Friend' || user.status === 'admin'){
       sum += 5000;
    } else if(user.status === 'user'){
      sum += 100;
    }
    user.account = sum;
    changeAccountMoney(user._id, user)
      .then(res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.chgMoneyState(sum);
          this.chgUserState(res);
        }
      ).catch(err => localStorage.removeItem('user'));
  }

  chgMoneyState(sum){
    let user = this.state.user;
    user.account = sum;
    this.setState({user: user});
  }

  chgUserState(user){
    this.setState({user: user});
  }

  render() {
    return (
      <div>
        {this.state.description ?
          <Description money={this.state.money} user={this.state.user} menu={() => this.back()}
                       addMoney={() => this.addMoney()} playNow={(bet) => this.newGame(bet)}
                       areYouPlaying={this.state.areYouPlaying} btnContinue={this.state.btnContinue}/> :
          <div>
            <div className="topNav">
              <button className="stopPlaying returnBack" onClick={() => this.back()}>Back</button>
              <p><a href="">+</a>Account {this.state.user.account}$</p>
            </div>
            <main className="game_process">
              <h2>Level № {this.state.level}</h2>
              <br/>
              <h3>Counter: {this.state.counter}</h3>
              <br/>
              {this.state.choosingCherry ?
                <Cherry level={this.state.level} bet={this.state.bet}
                        counter={counter(this.state.howManyTimesYouWon, this.state.bet)}
                        howManyTimesYouWon={this.state.howManyTimesYouWon}
                        game4={(index) => this.game(index)}/> :
                <Fruits bet={this.state.bet} level={this.state.level} counter={this.state.counter}
                        howManyTimesYouWon={this.state.howManyTimesYouWon} fruits={this.state.fruits}/>}
              <br/>
              {this.state.showButtonsWinsDefeat && this.state.areYouPlaying  && !this.state.didYouLose ?
                <div>
                  <h4>You Won!!!</h4>
                  <div className="options">
                    <button className="btn btn-primary" onClick={() => this.tryAgain()}>Try again</button>
                    <button className="btn btn-danger" onClick={() => this.takeMoney()}>Take Money</button>
                  </div>
                </div> : this.state.didYouLose ?
                  <div>
                    <h4 color='blue'>You Lost :(</h4>
                    <div className="options">
                      <button className="btn btn-primary"
                              onClick={this.state.bet <= this.state.user.account ? () => this.newGame() : () => this.stopPlaying()}>
                        {this.state.bet <= this.state.user.account ? "New game" : "Come Back"}</button>
                    </div>

                  </div> : ''}
              <Statistics bet={this.state.bet} howManyTimesYouWon={this.state.howManyTimesYouWon} areYouPlaying={this.state.areYouPlaying}
                          level={this.state.level} counter={this.state.counter} showButtonsWinsDefeat={this.state.showButtonsWinsDefeat}
                          didYouLose={this.state.didYouLose} />
            </main>
          </div>
        }
      </div>
    );
  }
}

export default BananasAndShit;
