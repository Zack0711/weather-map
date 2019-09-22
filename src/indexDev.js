import React from 'react';
import ReactDOM from 'react-dom';

import ChatRoomServer from './components/chatRoomServer.jsx';
import ChatRoom from './chatRoom.jsx'

const App = () => (
  <div className="row h-100 no-gutters">
    <div className="col-8 h-100">
      <ChatRoom/>
    </div>
    <div className="col-4">
      <ChatRoomServer />
    </div>
  </div>
)


ReactDOM.render( <App/>, document.getElementById('root'),);