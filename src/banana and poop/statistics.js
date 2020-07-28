import React, { Component } from 'react';
import '../App.css';
import {counter} from './functionsForBananaApp';

class Statistics extends Component {
  constructor(props){
    super(props);
  }

  lastLettersOfTheNumber(){
    if(this.props.howManyTimesYouWon === 0) return 'st';
    if(this.props.howManyTimesYouWon === 1) return 'nd';
    if(this.props.howManyTimesYouWon === 2) return 'rd';
    return 'th';
  }

  render() {
    return (
      <div className="app_statistics">
        <h4>Statistics:</h4>
        <p>Chance is {5 - this.props.level}/5</p>
        <p>Possible gain is {(this.props.areYouPlaying || !this.props.didYouLose ) || (!this.props.didYouLose && this.props.howManyTimesYouWon === 0) ? counter(this.props.howManyTimesYouWon, this.props.bet) : 0}$</p>
        <p>It's the {this.props.howManyTimesYouWon + 1}{this.lastLettersOfTheNumber()} trial</p>
        <p>Your bet is {this.props.bet}$</p>
      </div>
    );
  }
}

export default Statistics;
