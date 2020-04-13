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
declare var chrome: any;
declare var window: any;

import * as React from 'react';

const { useState, useEffect, useRef } = React;

import useCardsStatus from './useCardsStatus';

const Cards = () => {
  const { initFlag, indexArr, list, setList, setLocked, toPrev, toNext } = useCardsStatus();
  const [isNextOrNot, setIsNextOrNot] = useState(false);
  let tmpNode = useRef(null);
  let tmpNodePrev: any = useRef(null);
  let tmpNodeNext: any = useRef(null);

  const handleKeyDown = (e: any) => {
    if (e.key === 'j' || e.key === 'J') {
      setIsNextOrNot(true);
      tmpNodeNext && tmpNodeNext.current && tmpNodeNext.current.click();
    }
    if (e.key === 'k' || e.key === 'K') {
      setIsNextOrNot(false);
      tmpNodePrev && tmpNodePrev.current && tmpNodePrev.current.click();
    }
  };

  useEffect(() => {
    setList(arr);

    // const exId = 'kfajbgpmhinphopgjjempdcgihajeejb';

    // let o = {
    //   to: 'huaban-bg',
    //   me: 'cxXXX',
    //   via: 'cxxX'
    // };

    // // let msg = JSON.stringify(o);
    // let msg = o;

    // chrome.runtime.sendMessage(exId, msg);

    document.addEventListener('keydown', handleKeyDown, false);

    document.querySelector('.ex-iframe.is-hidden').classList.remove('is-hidden');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.func = () => {
    setIsNextOrNot(true);
  };

  useEffect(() => {
    if (initFlag) {
      return;
    }
    setLocked(true);
    tmpNode.current.addEventListener('animationend', () => {
      if (isNextOrNot) {
        tmpNode.current.className = 'ex-router-card ex-router-card-0';
      } else {
        tmpNode.current.className = `ex-router-card ex-router-card-${indexArr.length - 1}`;
      }
      setLocked(false);
    });

    if (isNextOrNot) {
      tmpNode.current.classList.add('ex-router-card-leave-active');
    } else {
      tmpNode.current.classList.add('ex-router-card-enter-active');
    }
  }, [isNextOrNot, initFlag, indexArr, setLocked]);

  let tagI: number | null = null;
  for (let i = 0; i < indexArr.length; i++) {
    if (isNextOrNot && indexArr[i] === 0) {
      tagI = i;
    }
    if (!isNextOrNot && indexArr[i] === indexArr.length - 1) {
      tagI = i;
    }
  }

  console.log('Rerender');

  return (
    <div className='ex-iframe is-hidden'>
      <div className='ex-router-cards-wrap'>
        <div className='ex-div-trick-prev' onClick={toPrev} ref={tmpNodePrev} />
        <div className='ex-div-trick-next' onClick={toNext} ref={tmpNodeNext} />
        <div className='ex-router-cards' onClick={toNext}>
          {list.length && <div key={'-1'} className={'ex-router-card ex-router-card-x'} style={{ backgroundColor: list[tagI].color }} data-index={-1} />}
          {list.map((item, i) => {
            let tmpClassName = `ex-router-card ex-router-card-${indexArr[i]}`;
            if (isNextOrNot && indexArr[i] === 0 && !initFlag) {
              tmpClassName = `ex-router-card ex-router-card-${list.length - 1} ex-router-card-leave`;
              return <div key={i.toString()} className={tmpClassName} style={{ backgroundColor: item.color }} data-index={i} ref={tmpNode} />;
            } else if (!isNextOrNot && indexArr[i] === indexArr.length - 1 && !initFlag) {
              tmpClassName = `ex-router-card ex-router-card-${list.length - 1} ex-router-card-enter`;
              return <div key={i.toString()} className={tmpClassName} style={{ backgroundColor: item.color }} data-index={i} ref={tmpNode} />;
            } else {
              return <div key={i.toString()} className={tmpClassName} style={{ backgroundColor: item.color }} data-index={i} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;

import ExCards from './test';
export { ExCards };
