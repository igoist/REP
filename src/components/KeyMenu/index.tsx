import * as React from 'react';
import { EX } from '@Utils';

const prefix = `${EX}-keyMenu`;
const arr = ['A', 'S', 'D', 'F', 'G', 'H', 'J'];

const { useEffect } = React;

const KeyMenu = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log('ssssss');
    }, 2000);
  }, []);

  return (
    <div className={`${prefix}-wrap`}>
      <div className={`${prefix}-row`}>
        {arr.map((item, i) => {
          return (
            <div className={`${prefix}-item ${prefix}-item-${i}`} key={`${prefix}-item-${item}`}>
              <button className={`${prefix}-btn-neon ${EX}-bounce`}>{item}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMenu;
