import "@babel/polyfill";
import './styles/main.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import ChatRoomWrapper from './containers/chatRoomWrapper';
import Login from './containers/login';
import ChatRoomHeader from './containers/chatRoomHeader';
import StatusBar from './containers/statusBar';
import MessageList from './containers/messageList';
import MessageSender from './containers/msgSender';
import UsersList from './containers/usersList';

import store from './store';
import i18n from './i18n';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChatRoomWrapper>
            <ChatRoomHeader/>
            <StatusBar />
            <MessageList />
            <MessageSender />
            <UsersList />
            <Login />
          </ChatRoomWrapper>
        </I18nextProvider>
      </Provider>
    )
  }  
}

export default ChatRoom