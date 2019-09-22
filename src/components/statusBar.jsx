import React from 'react';

const StatusBar = ({userIsLogin, roomIsFetching, roomIsConnected, roomIsError, connectChatRoom, t}) => (
  <div className={`status-bar${ (userIsLogin && !roomIsConnected) ? ' is-shown' : ''}`}>
    <div className="status-msg">
      { 
        roomIsFetching 
        ? (<>
            {t('is-connecting')} <i className="ml-3 fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
          </>)
        : (<>
            {t('is-disconnect')}
            <button className="ml-3 btn btn-outline-secondary" onClick={connectChatRoom}>
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </button>
          </>)
      }
    </div>
  </div>
)

export default StatusBar;