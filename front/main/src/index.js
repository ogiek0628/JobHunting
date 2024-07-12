import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// root要素を取得
const rootElement = document.getElementById('root');
// createRootでrootを作成
const root = ReactDOM.createRoot(rootElement);

// rootに対してrenderメソッドを使用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);