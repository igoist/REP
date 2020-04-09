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
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);

  const handleNext = () => {
    let tmp = offset - 1;
    if (tmp === -list.length) {
      tmp = 0;
    }
    setOffset(tmp);
  };

  const handlePrev = () => {
    let tmp = offset + 1;
    if (tmp === list.length) {
      tmp = 0;
    }
    setOffset(tmp);
  };

  return { offset, list, setList, handlePrev, handleNext };
};

// type SingleCardType = {
//   c: string,
//   i: number
// };

const Cards = () => {
  const { offset, list, setList, handlePrev, handleNext } = useCardsStatus();

  // const SingleCard = (props: SingleCardType) => {
  //   const { c, i } = props;
  //   return <div className={`ex-router-card ex-router-card-${i}`} style={{ backgroundColor: c }} />;
  // };

  const JustARenderer = () => {
    return (
      <>
        {list.map((item, i) => {
          let y = (i + offset) % list.length;
          y = y < 0 ? y + list.length : y;
          // return <SingleCard key={i.toString()} c={item.color} i={y} />;
          return <div className={`ex-router-card ex-router-card-${y}`} style={{ backgroundColor: item.color }} data-index={i} />;
        })}
      </>
    );
  };

  useEffect(() => {
    setList(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='ex-router-cards' onClick={handleNext}>
      <JustARenderer />
    </div>
  );
};

import Cards2 from './test';
export default Cards2;
