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
      if (props.onClick)
        props.onClick(event, this.nodeRef);
    }
  }

  render() {
    return (
      <canvas 
        onClick={this.clickHandler}
        width={this.props.width}
        height={this.props.height}
        ref={this.setNodeRef}
      />
    );
  }
  
}