import React from 'react';

const ChatRoomWrapper = ({children, roomIsConnected, isLogin}) => (
  <div className={`chat-room ${(!roomIsConnected && isLogin) ? 'is-error' : ''}`}>
    {children}
  </div>  
)

export default ChatRoomWrapper;