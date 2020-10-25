import React, { useState } from 'react'
import { useEffect } from 'react';
import PureCanvas from './PureCanvas'

const HEIGHT = "500", WIDTH = "800";

function TreeVisualizer (props) {

  const [ctx, setContext] = useState(null);

  const drawNodes = () => {
    if (props.tree.current.root === null) return;
    drawNode(WIDTH / 2, 55, props.tree.current.root, 0);
  }

  const drawNode = (x, y, node, depth) => {
    const fullDepth = Math.ceil(Math.log2(props.tree.current.size));
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle =  node.color === 0? "#000000" : "#FF0000";
    ctx.stroke();
    ctx.fillText(String(node.key), x - 10, y + 5);
    if (node.left !== null) drawNode(x - (30 * (fullDepth - depth) ), y + 55, node.left, depth + 1);
    if (node.right !== null) drawNode(x + (30 * (fullDepth - depth) ), y + 55, node.right, depth + 1);
  }
  
  useEffect(() => {
    if (ctx === null) return;

    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawNodes();
    // ctx.arc(WIDTH / 2, 75, 25, 0, 2 * Math.PI);
    // ctx.fillText(String(props.tree.current.root.key), WIDTH / 2 - 10, 75 + 5);
    // ctx.stroke();

    return () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
  }, [props.tree.current.size])

  return (
      <PureCanvas height={HEIGHT} width={WIDTH} contextRef={setContext}></PureCanvas>
  );
}

export default TreeVisualizer;
