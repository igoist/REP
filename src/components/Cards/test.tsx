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

const { useState, useEffect, useRef } = React;

type CardPropsType = {
  i: number,
  c: string,
  di: number
};

const useCardsStatus = () => {
  const [indexArr, setIndexArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [locked, setLocked] = useState(false);
  const [list, setList] = useState([]);

  const toNext = () => {
    if (locked) {
      return;
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
    let t: Array<number> = indexArr.map(i => i);
    let tmp = t.pop();
    t.unshift(tmp);

    setIndexArr(t);
  };

  return { indexArr, list, setList, setLocked, toPrev, toNext };
};

// type SingleCardType = {
//   c: string,
//   i: number
// };

const Cards = () => {
  const [initFlag, setInitFlag] = useState(true);
  const { indexArr, list, setList, setLocked, toPrev, toNext } = useCardsStatus();
  let tmpNode = useRef(null);

  const Card = (props: CardPropsType) => {
    const { i, c, di } = props;
    const tmpNode = useRef(null);
    let tmpClassName = `ex-router-card ex-router-card-${i}`;
    if (i === 0) {
      tmpClassName = `ex-router-card ex-router-card-${list.length - 1} ex-router-card-leave`;
    }

    useEffect(() => {
      if (initFlag) {
        setInitFlag(false);
        return;
      }
      if (i === 0) {
        tmpNode.current.addEventListener('animationend', () => {
          tmpNode.current.className = 'ex-router-card ex-router-card-0';
        });

        tmpNode.current.classList.add('ex-router-card-leave-active');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={tmpClassName} style={{ backgroundColor: c }} data-index={di} ref={tmpNode} />;
  };

  const Card2 = (props: CardPropsType) => {
    const { i, c, di } = props;
    return <div key={i.toString()} className={`ex-router-card ex-router-card-${i}`} style={{ backgroundColor: c }} data-index={di} />;
  };

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

  useEffect(() => {
    if (initFlag) {
      setInitFlag(false);
      return;
    }
    setLocked(true);
    tmpNode.current.addEventListener('animationend', () => {
      tmpNode.current.className = 'ex-router-card ex-router-card-0';
      setLocked(false);
    });

    tmpNode.current.classList.add('ex-router-card-leave-active');
  }, [initFlag, indexArr, setLocked]);

  return (
    <div className='ex-iframe'>
      <div className='ex-router-cards' onClick={toNext}>
        {/* <JustARenderer /> */}
        {list.map((item, i) => {
          let tmpClassName = `ex-router-card ex-router-card-${indexArr[i]}`;
          if (indexArr[i] === 0) {
            tmpClassName = `ex-router-card ex-router-card-${list.length - 1} ex-router-card-leave`;
            return <div key={i.toString()} className={tmpClassName} style={{ backgroundColor: item.color }} data-index={i} ref={tmpNode} />;
          } else {
            return <div key={i.toString()} className={tmpClassName} style={{ backgroundColor: item.color }} data-index={i} />;
          }
          // return <Card key={i.toString()} i={indexArr[i]} c={item.color} di={i} />;
          // return <Card2 key={i.toString()} i={indexArr[i]} c={item.color} di={i} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
