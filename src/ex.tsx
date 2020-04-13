declare var chrome: any;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EX, EXID } from '@Utils';
import { ExCards } from '@Components';

const { useEffect } = React;

const ExApp = () => {
  useEffect(() => {
    const iframeWrap = document.querySelector('.ex-iframe.is-hidden');
    iframeWrap.classList.remove('is-hidden');

    const msg = {
      to: 'huaban-bg',
      act: 'closeREPartner'
    };

    const handleIframeEaseOut = () => {
      chrome.runtime.sendMessage(EXID, msg);
    };

    chrome.runtime.onMessage.addListener((r: any) => {
      if (r.to === `${EX}-REP` && r.msg === 'readyToCloseREPartner') {
        iframeWrap.addEventListener('transitionend', handleIframeEaseOut);

        iframeWrap.classList.add('is-hidden');
      }
    });
  }, []);

  return (
    <div className={`${EX}-iframe is-hidden`}>
      <ExCards.ExCards />
    </div>
  );
};

ReactDOM.render(<ExApp />, document.getElementById('app'));
