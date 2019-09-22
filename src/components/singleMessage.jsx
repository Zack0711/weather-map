import React from 'react';

import {genDateFormat} from '../utilities';

const InfoMessage = ({date, target, subType, t}) => (
  <div className="single-msg single-msg--info">
    <div className="content">
      <div className="msg-content">{t(subType, { user: target })}</div>
    </div>
  </div>
);

const ChatMessage = ({name, date, text, isFromMe}) => (
  <div className={`single-msg ${isFromMe ? 'single-msg--from-me' : 'single-msg--from-other'}`}>
    { isFromMe ?  <></> : <div className="avatar">{name[0]}</div>}
    <div className="content">
      { isFromMe ? <></> : <div>{name}</div> }
      <div className="msg-content">{text}</div>
      <small className="text-info">{genDateFormat(date)}</small>
    </div>
  </div>
);

const SingleMessage = React.memo(({msg, isFromMe, t}) => (
  <>
    { msg.type === 'info' ? <InfoMessage {...Object.assign({t}, msg)} /> : <ChatMessage {...Object.assign({isFromMe}, msg)} /> }
  </>
));

export default SingleMessage;