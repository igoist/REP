import * as React from 'react';

const { useState } = React;

const useCardsStatus = () => {
  const [indexArr, setIndexArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [locked, setLocked] = useState(false);
  const [list, setList] = useState([]);
  const [initFlag, setInitFlag] = useState(true);

  const toNext = () => {
    if (locked) {
      return;
    }
    if (initFlag) {
      setInitFlag(false);
    }
    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.shift();
    t.push(tmp);

    setIndexArr(t);
  };

  const toPrev = () => {
    if (locked) {
      return;
    }
    if (initFlag) {
      setInitFlag(false);
    }
    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.pop();
    t.unshift(tmp);

    setIndexArr(t);
  };

  return { initFlag, indexArr, list, setList, setLocked, toPrev, toNext };
};

export default useCardsStatus;
