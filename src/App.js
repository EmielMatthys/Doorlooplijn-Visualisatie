import React from 'react';
import useDoorloop from './algoritmes/Doorlooplijn';
import './App.css';
import Visualizer, { POINT_WIDTH } from './visualizer/Visualizer.jsx';


function withHook(Component) {
  return function WrappedComponent(props) {
    const [status, closestPair, step, currentIndex, setPoints] = useDoorloop();
    return <Component {...props} status={status} closestPair={closestPair} step={step} currentIndex={currentIndex} setPoints={setPoints}/>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      current: -1,
      started: false,
      delta: -1,
      nearest: []
    }
  }

  canvasClick = (e, canvas) => {
    if (this.state.started) return;

    const rect = canvas.getBoundingClientRect();
    const xpos = e.clientX - rect.left - POINT_WIDTH;
    const ypos = e.clientY - rect.top - POINT_WIDTH;
    //TODO: Check if not colludign with existing points
    this.props.setPoints([...this.state.points, {x: xpos, y: ypos}]
      .sort((a, b) => a.x - b.x))
    this.setState( (prevState) => ({
      points: [...prevState.points, {x: xpos, y: ypos}]
              .sort((a, b) => a.x - b.x)
    }));
    
  }

  nexButtonClick = (e) => {
    const currentIndex = this.state.current;
    if (currentIndex + 1 < this.state.points.length)
      this.setState( (prevState) => ({
        current: currentIndex + 1,
        started: true
      }) );
    this.props.step();
  }

  resetButtonClick = (e) => {
    this.props.setPoints([]);
    this.setState( (prevState) => ({
      current: -1,
      points: [],
      started: false
    }))
  }

  render () {
    
    return (
      <div className="App">
        <Visualizer onClick={this.canvasClick} points={this.state.points} current={this.props.currentIndex}></Visualizer>
      <button onClick={this.nexButtonClick} disabled={this.state.current === this.state.points.length - 1}>Next</button>
      <button onClick={this.resetButtonClick}>RESET</button>
    </div>
    );
  }
}

export default withHook(App);
