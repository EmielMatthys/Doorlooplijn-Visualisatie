import React from 'react'

export default class PureCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.nodeRef = null;

    this.setNodeRef = elem => {
      this.nodeRef = elem;
      props.contextRef(elem.getContext('2d'));
    }
    
    this.clickHandler = event => {
      this.props.onClick(event, this.nodeRef);
    }
  }

  render() {
    return (
      <canvas 
        onClick={this.clickHandler}
        width="500"
        height="500"
        ref={this.setNodeRef}
      />
    );
  }
  
}