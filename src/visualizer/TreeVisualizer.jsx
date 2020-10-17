import React, { useState } from 'react'
import { useEffect } from 'react';
import PureCanvas from './PureCanvas'

function TreeVisualizer (props) {

  const [ctx, setContext] = useState(null);
  
  useEffect(() => {
    
    console.log("TReeViz useffct");
    console.log(props.tree)
    return () => {
      
    }
  }, [props.tree.current.size])

  return (
      <PureCanvas contextRef={setContext}></PureCanvas>
  );
}

export default TreeVisualizer;
