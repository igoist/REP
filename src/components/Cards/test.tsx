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

const exId = 'kfajbgpmhinphopgjjempdcgihajeejb';

declare var chrome: any;

import * as React from 'react';

const { useEffect, useRef } = React;

import useCardsStatus from './useCardsStatus';

const Cards = () => {
  const { initFlag, indexArr, list, setList, setLocked, toPrev, toNext } = useCardsStatus();
  let tmpNode = useRef(null);
  let tmpNodePrev: any = useRef(null);
  let tmpNodeNext: any = useRef(null);

  const handleKeyDown = (e: any) => {
    if (e.key.toLowerCase === 'escape') {
      let msg = {
        to: 'huaban-bg',
        act: 'closeREPartner'
      };
      chrome.runtime.sendMessage(exId, msg);
    }
    if (e.key === 'j' || e.key === 'J') {
      tmpNodeNext && tmpNodeNext.current && tmpNodeNext.current.click();
    }
    if (e.key === 'k' || e.key === 'K') {
      tmpNodePrev && tmpNodePrev.current && tmpNodePrev.current.click();
    }
  };

  useEffect(() => {
    setList(arr);
    let msg = {
      to: 'huaban-bg',
      me: 'ExCards',
      via: 'none'
    };

    // let msg = JSON.stringify(o);

    chrome.runtime.sendMessage(exId, msg);

    document.addEventListener('keydown', handleKeyDown, false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initFlag) {
      return;
    }
    setLocked(true);
    tmpNode.current.addEventListener('animationend', () => {
      tmpNode.current.className = 'ex-router-card ex-router-card-0';
      setLocked(false);
    });

    tmpNode.current.classList.add('ex-router-card-leave-active');
  }, [initFlag, indexArr, setLocked]);

  let tagI: number | null = null;
  for (let i = 0; i < indexArr.length; i++) {
    if (indexArr[i] === 0) {
      tagI = i;
    }
  }

  return (
    <div className='ex-iframe'>
      <div className='ex-router-cards-wrap'>
        <div className='ex-div-trick-prev' onClick={toPrev} ref={tmpNodePrev} />
        <div className='ex-div-trick-next' onClick={toNext} ref={tmpNodeNext} />
        <div className='ex-router-cards' onClick={toNext}>
          {list.length && <div key={'-1'} className={'ex-router-card ex-router-card-x'} style={{ backgroundColor: list[tagI].color }} data-index={-1} />}
          {list.map((item, i) => {
            let tmpClassName = `ex-router-card ex-router-card-${indexArr[i]}`;
            if (indexArr[i] === 0 && !initFlag) {
              tmpClassName = `ex-router-card ex-router-card-${list.length - 1} ex-router-card-leave`;
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
