import React from "react";
import PureCanvas from "./PureCanvas";

export const POINT_WIDTH = 10;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.setContext = this.setContext.bind(this);
  }

  setContext(ctx) {
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() { // TODO: viz delta
    const {points, current} = this.props;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.ctx.translate(this.width / 2, this.height / 2);
    // this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.fillStyle = '#4397AC';
    
    points.map( (point) => {
      this.ctx.fillText('[' + String(point.x) + ',' + String(point.y) + ']', point.x + POINT_WIDTH + 2, point.y + POINT_WIDTH)
      this.ctx.fillRect(
        point.x,
        point.y,
        POINT_WIDTH,
        POINT_WIDTH
      );
    })

    const {first, second, distance} = this.props.closestPair;

    if (current >= 0 && current < points.length) {
      const currentPoint = points[current];
      this.ctx.beginPath();
      this.ctx.moveTo(currentPoint.x + POINT_WIDTH / 2, 0);
      this.ctx.lineTo(currentPoint.x + POINT_WIDTH / 2, this.height);
      this.ctx.stroke();

      if (first !== null) {
        //Draw delta
        console.log("drawing delta");
        this.ctx.strokeStyle = "#00FF00";

        // Horizontal strokes
        if (this.props.showHorStroke) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, currentPoint.y + POINT_WIDTH/2 - distance);
          this.ctx.lineTo(this.width, currentPoint.y + POINT_WIDTH/2 - distance);
  
          this.ctx.moveTo(0, currentPoint.y + POINT_WIDTH/2 + distance);
          this.ctx.lineTo(this.width, currentPoint.y + POINT_WIDTH/2 + distance);
          this.ctx.stroke();
        }
        

        // Vertical strokes
        if (this.props.showVertStroke) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = "#00ff00";
          this.ctx.moveTo(currentPoint.x + POINT_WIDTH/2 - distance, 0);
          this.ctx.lineTo(currentPoint.x + POINT_WIDTH/2 - distance, this.height);
          this.ctx.stroke();
  
          this.ctx.moveTo(currentPoint.x + POINT_WIDTH/2 + distance, 0);
          this.ctx.lineTo(currentPoint.x + POINT_WIDTH/2 + distance, this.height);
          this.ctx.stroke();
        }
        

        // this.ctx.moveTo(10, currentPoint.y - distance);
        // this.ctx.lineTo(10, currentPoint.y + distance);
        // this.ctx.setLineDash([10, 5]);
        // this.ctx.stroke();

      }
    }

    // Draw closest pair
    if (first !== null) {
      this.ctx.beginPath();
      this.ctx.moveTo(first.x + POINT_WIDTH / 2, first.y + POINT_WIDTH / 2);
      this.ctx.lineTo(second.x + POINT_WIDTH / 2, second.y + POINT_WIDTH / 2);
      this.ctx.setLineDash([10, 5]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#FF0000";
      this.ctx.stroke();

      this.ctx.fillStyle = '#FF0000';
      this.ctx.fillText("Closest pair " + String(Math.round(distance)), second.x + POINT_WIDTH / 2, second.y - POINT_WIDTH)
    }

    this.ctx.restore();
  }

  render() {
    return (
      <PureCanvas height="500" width="800" onClick={this.props.onClick} contextRef={this.setContext}/>
    );
  }
}

export default Visualizer;