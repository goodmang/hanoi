import React, { Component } from 'react';
import { range, isNil, defaultTo, prepend, head, tail } from 'ramda';
import './App.css';
import Header from './components/header';
import Tower from './components/tower';

const STRATEGY = [
  [[0, 1], [0, 2], [1, 2]],  // odd strategy
  [[0, 2], [0, 1], [1, 2]]  // even strategy
];
const UPDATE_FREQUENCY = 200; // millisecond

const resetState = (height = 5) => {
  return {
    height,
    towers: [
          range(1, height + 1, 1),
          [],
          []
        ],
    strategy: STRATEGY[height % 2],
    strategyIndex: 0,
    intervalID: null
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = resetState();

    this.updatedHeight = this.updatedHeight.bind(this);
    this.start = this.start.bind(this);
    this.nextMove = this.nextMove.bind(this);
  }

  get isActive() {
    return !isNil(this.state.intervalID);
  }

  get isFinished() {
    return this.state.towers[2].length === this.state.height;
  }

  ringValue(col) {
    return defaultTo(Infinity, this.state.towers[col][0]);
  }

  get currentMove() {
    const [a, b] = this.state.strategy[this.state.strategyIndex];
    return this.ringValue(a) < this.ringValue(b) ? [a, b] : [b, a];
  }


  nextMove() {
    const move = (from, to, towers) => {
      const newTowers = towers.slice();
      newTowers[to] = prepend(head(towers[from]), towers[to]);
      newTowers[from] = tail(towers[from]);
      return newTowers;    
    }

    if (this.isFinished) {
      this.stop();
    } else {
      this.setState({
        towers: move(...this.currentMove, this.state.towers),
        strategyIndex: (this.state.strategyIndex + 1) % 3
      });
    }
  }

  updatedHeight(height) {
    if (this.isActive)
       clearInterval(this.state.intervalID);

    this.setState(resetState(height));
  }

  start() {
    if (this.isActive) {
      clearInterval(this.state.intervalID);
      this.setState(resetState(this.state.height));
    }

    let i = window.setInterval(this.nextMove, UPDATE_FREQUENCY);
    this.setState({
        intervalID: i 
    });
  }

  stop() {
    clearInterval(this.state.intervalID);
  }


  render() {
    return (
      <div className="App">
        <Header onHeightChange={this.updatedHeight} onStart={this.start} />
        <div className="towerStage">
          <Tower stack={this.state.towers[0]} />
          <Tower stack={this.state.towers[1]} />
          <Tower stack={this.state.towers[2]} />
        </div>
      </div>
    );
  }
}

export default App;
