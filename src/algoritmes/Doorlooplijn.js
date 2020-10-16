/**
 * DoorlooplijnAlgo:
 *  - initialiseer met rij punten
 *  - step function conveying current status
 *    -> current closest pair
 *    -> current delta
 *    -> indicate completion?
 */

import { useEffect, useState } from "react"
import { RedBlackBST } from "./BinaryTree"

function distance(point1, point2) {
  return Math.sqrt( Math.pow( point1.x - point2.x , 2 ) 
                  + Math.pow( point1.y - point2.y, 2 ));
}

export default function useDoorloop() {
  const status = new RedBlackBST();

  const [points, setPoints] = useState([]);
  const [closestPair, setClosestPair] = useState({
    first: null, second: null, distance: -1
  });
  const [currentIndex, setCurrentIndex] = useState(-1);

  const step = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    const point = points[newIndex];
    status.insert(point.y, point);


    const res = status.nearest(point.y)
    console.log(res)
    const result = res
                      .filter( (elem) => elem !==null && distance(point, elem) < closestPair.distance )
                      .sort( (a, b) =>  distance(a, point) - distance(b, point));
    if (result.length > 0) {
      setClosestPair({
        first: point, second: result[0], distance: distance(point, result[0])
      })
    }
    
  }

  // useEffect(() => {
  //   console.log("currentIndex was changedd");
  // }, [currentIndex]);

  return [status, closestPair, step, currentIndex, setPoints];
}