import * as React from 'react';
import { EX, copy } from '@Utils';
import { Store } from '@Contexts';

const prefix = `${EX}-keyMenu`;

const { useEffect, useMemo } = React;

type KeyMenuItemType = {
  id: number,
  text: string,
  desc: string,
  active: boolean
};

type InitialStateType = {
  keyMenuArr: Array<KeyMenuItemType>
};

const initialKeyMenuState: InitialStateType = {
  keyMenuArr: [
    {
      id: 0,
      text: 'A',
      desc: 'DarkMode',
      active: false
    },
    {
      id: 1,
      text: 'S',
      desc: 'FontColor',
      active: false
    },
    {
      id: 2,
      text: 'D',
      desc: 'NoBgImage',
      active: false
    },
    {
      id: 3,
      text: 'F',
      desc: 'NoImage',
      active: false
    },
    {
      id: 4,
      text: 'G',
      desc: 'ReadCode',
      active: false
    },
    {
      id: 5,
      text: 'H',
      desc: '........',
      active: false
    },
    {
      id: 6,
      text: 'J',
      desc: 'Switch',
      active: false
    }
  ]
};

const KeyMenu = () => {
  const store = Store.useContainer();

  const { storeState, pushStore, toPrevStore, toNextStore } = store;

  let storeCurrent = storeState.storeList[storeState.current];

  let handleClick = (tmpId: number) => {
    let tmpArr: Array<KeyMenuItemType> = storeCurrent.keyMenuArr.map(copy.deepCopyOA);
    for (let i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i].id === tmpId) {
        tmpArr[i].active = !tmpArr[i].active;
        break;
      }
    }

    pushStore({
      ...storeCurrent,
      keyMenuArr: tmpArr.map(i => i)
    });
  };

  useEffect(() => {
    pushStore({ ...initialKeyMenuState });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toPrev = () => {
    console.log('enter click to Prev: ', storeState);
    toPrevStore();
  };

  if (storeCurrent && storeCurrent.keyMenuArr) {
    const arr = storeCurrent.keyMenuArr;
    return (
      <div className={`${prefix}-wrap ready`}>
        <div className={`${prefix}-row`}>
          {arr.map((item: KeyMenuItemType, i: number) => {
            return (
              <div className={`${prefix}-item ${prefix}-item-${i} ${item.active ? 'active' : ''}`} key={`${prefix}-item-${item.id}`}>
                <button className={`${prefix}-btn-neon ${EX}-bounce`} onClick={() => handleClick(item.id)}>
                  {item.text}
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={toPrev}>toPrev</button>
      </div>
    );
  } else {
    return null;
  }
};

export default KeyMenu;
