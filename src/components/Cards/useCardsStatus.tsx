import * as React from 'react';

const { useState } = React;

type CardsStateType = {
  indexArr: Array<number>,
  initFlag: boolean,
  locked: boolean,
  isNextOrNot: boolean
};

const initialCardsState: CardsStateType = {
  indexArr: [0, 1, 2, 3, 4, 5, 6],
  initFlag: true,
  locked: false,
  isNextOrNot: false
};

const useCardsStatus = () => {
  const [cardsState, setCardsState] = useState(initialCardsState);
  const [list, setList] = useState([]);

  const toNext = () => {
    const { locked, initFlag, indexArr } = cardsState;

    if (locked) {
      return;
    }

    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.shift();
    t.push(tmp);

    if (initFlag) {
      setCardsState({
        ...cardsState,
        indexArr: t,
        initFlag: false,
        isNextOrNot: true
      });
    } else {
      setCardsState({
        ...cardsState,
        indexArr: t,
        isNextOrNot: true
      });
    }
  };

  const toPrev = () => {
    const { locked, initFlag, indexArr } = cardsState;
    if (locked) {
      return;
    }

    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.pop();
    t.unshift(tmp);

    if (initFlag) {
      setCardsState({
        ...cardsState,
        indexArr: t,
        initFlag: false,
        isNextOrNot: false
      });
    } else {
      setCardsState({
        ...cardsState,
        indexArr: t,
        isNextOrNot: false
      });
    }
  };

  const setLocked = (newValue: boolean) => {
    setCardsState({
      ...cardsState,
      locked: newValue
    });
  };

  return { cardsState, list, setList, toPrev, toNext, setLocked };
};

export default useCardsStatus;
