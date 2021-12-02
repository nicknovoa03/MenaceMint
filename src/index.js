import React from 'react'
import ReactDOM from 'react-dom';
import HookApp from './FullScreenHook'
import Whitelist from './AddToWhitelistHook'

ReactDOM.render(
  <React.StrictMode>
      <Whitelist />
  </React.StrictMode>,
  document.getElementById('root')
);
  

