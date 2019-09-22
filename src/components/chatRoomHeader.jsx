import React from 'react';

const ChatRoomHeader = ({openUsersList, t}) => (
  <div className="chat-room__header">
    <div className="col">
    	{t('chat-room')}
    </div>
    <button className="btn btn-light" onClick={ () => {openUsersList(true) }}>
      <i className="fa fa-list-ul" aria-hidden="true"></i>
    </button>
  </div>
)

export default ChatRoomHeader;