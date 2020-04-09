let arr = [
  {
    color: '#61ca91',
    order: 0
  },
  {
    color: '#a8c779',
    order: 1
  },
  {
    color: '#e5bc87',
    order: 2
  },
  {
    color: '#e48b83',
    order: 3
  },
  {
    color: '#d95e8b',
    order: 4
  },
  {
    color: '#aa81c2',
    order: 5
  },
  {
    color: '#2dcaf9',
    order: 6
  }
];

import * as React from 'react';

const { useState, useEffect } = React;

const useCardsStatus = () => {
  const [indexArr, setIndexArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [list, setList] = useState([]);

  const toNext = () => {
    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.shift();
    t.push(tmp);

    setIndexArr(t);
  };

  const toPrev = () => {
    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.pop();
    t.unshift(tmp);

    setIndexArr(t);
  };

  return { indexArr, list, setList, toPrev, toNext };
};

// type SingleCardType = {
//   c: string,
//   i: number
// };

const Cards = () => {
  const { indexArr, list, setList, toPrev, toNext } = useCardsStatus();

  const JustARenderer = () => {
    return (
      <>
        {list.map((item, i) => {
          return <div className={`ex-router-card ex-router-card-${indexArr[i]}`} style={{ backgroundColor: item.color }} data-index={i} />;
        })}
      </>
    );
  };

  useEffect(() => {
    setList(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='ex-iframe'>
      <div className='ex-router-cards' onClick={toNext}>
        {/* <JustARenderer /> */}
        {list.map((item, i) => {
          return <div className={`ex-router-card ex-router-card-${indexArr[i]}`} style={{ backgroundColor: item.color }} data-index={i} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
