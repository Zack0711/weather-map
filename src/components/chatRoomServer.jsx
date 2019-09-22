import React from 'react';
import { WebSocket, Server } from 'mock-socket';
import fetchMock from 'fetch-mock';

import _ from 'lodash-uuid';
import { loremIpsum } from "lorem-ipsum";

import { WSURI } from '../settings';
import { 
  normalizingList,
  genDateFormat,
} from '../utilities'

window.WebSocket = WebSocket;

const usesList = [
  {
    name: 'Abby',
    id: `user-${_.uuid()}`,
    isOnline: true,
    isJoined: true,
  },
  {
    name: 'John',
    id: `user-${_.uuid()}`,
    isOnline: true,
    isJoined: true,
  },
  {
    name: 'Tony',
    id: `user-${_.uuid()}`,
    isOnline: false,
    isJoined: true,
  },
  {
    name: 'Chris',
    id: `user-${_.uuid()}`,
    isOnline: false,
    isJoined: false,
  },
]

const {
  data,
  list,
} = normalizingList(usesList);

class ChatRoomServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false,
      usersData: data,
      usersList: list,
      clientActions: [],
    };

    this.messages = [];

    this.toggleOnline = this.toggleOnline.bind(this);
    this.reciveActions = this.reciveActions.bind(this);

    this.userOnlineToggle = this.userOnlineToggle.bind(this);
    this.userJoinToggle = this.userJoinToggle.bind(this);
    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.sendMsg = this.sendMsg.bind(this);

    this.mockServer = null;
    this.socket = null;

    fetchMock.post('login', (url, opts) => {
      const {
        name,
      } = JSON.parse(opts.body);
      return {name, isLogin: true, id: `user-${_.uuid()}`}
    });

    fetchMock.get('fetch-history-messages', (url, opts) => {
      return {messages: this.messages}
    });
  }

  toggleOnline(){
    const {
      isOnline,
    } = this.state;

    if(!isOnline){
      this.goOnline();
    }else{
      this.goOffline();      
    }
    this.setState({isOnline: !isOnline});
  }

  goOffline() {
    if(this.socket){
      this.socket.close();
      this.socket = null;
      this.mockServer.stop();      
    }
  }

  goOnline() {
    this.mockServer = new Server(WSURI);
    this.mockServer.on('connection', socket => {
      this.socket = socket;

      const userList = [];
      this.state.usersList.forEach( d => {
        const singleUser = this.state.usersData[d];
        if(singleUser.isJoined){
          userList.push(singleUser);
        }
      })

      const newMessage = {
        id: `msg-${_.uuid()}`,
        type: 'user-list',
        userList,
      };
      this.broadcastMessage(newMessage, 'user-list')
      this.socket.on('message', e => {
        const newAction = {
          id: `action-${_.uuid()}`,
          date: new Date().getTime(),
          text: '',
        };

        switch(e.type){
          case 'new-user-connect':
            newAction.text = `${e.data.name} is connected!`;
            break;
          case 'send-msg':
            const newMessage = e.data.newMessage;
            newMessage.date = new Date().getTime();
            newMessage.id = `msg-${_.uuid()}`;
            newAction.text = `${newMessage.name} said: ${newMessage.text}`;
            this.messages.push(newMessage);
            //this.broadcastMessage(newMessage)
            break;
        }
        this.reciveActions(newAction);
      });
    });
  }

  reciveActions(action) {
    const {
      clientActions,
    } = this.state;
    clientActions.push(action);
    this.setState({clientActions});
  }

  broadcastMessage(newMessage, type = 'msg') {
    if(this.socket){
      const broadcastData = {
        type: type,
        data: newMessage,
      }
      this.socket.send(JSON.stringify(broadcastData));
    }
  }

  sendMsg(userId) {
    const {
      name,
      id,
    } = this.state.usersData[userId];

    const newMessage = {
      id: `msg-${_.uuid()}`,
      type: 'chat',
      text: loremIpsum({ units: "paragraphs" }),
      date: new Date().getTime(),
      authorId: id,
      name,
    };
    this.messages.push(newMessage);
    this.broadcastMessage(newMessage)
  }

  userOnlineToggle(id) {
    const usersData = this.state.usersData;
    usersData[id].isOnline = !usersData[id].isOnline;

    if(usersData[id].isJoined){
      const newMessage = {
        id: `msg-${_.uuid()}`,
        type: 'info',
        userData: usersData[id],
        date: new Date().getTime(),
      };
      this.broadcastMessage(newMessage, 'user-online-info')
    }

    this.setState({usersData});
  }

  userJoinToggle(id) {
    const usersData = this.state.usersData;
    usersData[id].isJoined = !usersData[id].isJoined;

    const newMessage = {
      id: `msg-${_.uuid()}`,
      type: 'info',
      userData: usersData[id],
      date: new Date().getTime(),
    };
    this.broadcastMessage(newMessage, 'user-join-info')
    this.setState({usersData});
  }

  render() {
    const {
      isOnline,
      usersData,
      usersList,
      clientActions,
    } = this.state;

    return(
      <div className="chat-room-server p-3 bg-dark text-light h-100">
        <h5>Chat Room Server</h5>
        <button className={`btn ${isOnline ? 'btn-info' : 'btn-light'}`} onClick={this.toggleOnline}>
          { isOnline ? 'Online' : 'Offline'}
        </button>
        <div className="action-from-client">
          { clientActions.map(d => (
            <div className="single-action" key={d.id}>
              <small className="text-info">{genDateFormat(d.date)}</small>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
        <div className="server-users-list">
          {
            usersList.map(d => {
              const {
                id,
                name,
                isOnline,
                isJoined,
              } = usersData[d];

              return(
                <div className="single-user row no-gutters align-items-center p-1" key={id}>
                  <div className="col">{name}</div>
                  <button className={`btn ml-1 ${isOnline ? 'btn-info' : 'btn-light'}`} 
                    onClick={ () => { this.userOnlineToggle(id) }}>
                    { isOnline ? 'Online' : 'Offline'}
                  </button>
                  <button className={`btn ml-1 ${isJoined ? 'btn-info' : 'btn-light'}`} disabled={!isOnline} 
                    onClick={ () => { this.userJoinToggle(id) }}>
                    { isJoined ? 'Left' : 'Join'}
                  </button>
                  <button className={`btn ml-1 btn-info`} disabled={!isOnline || !isJoined} onClick={ () => { this.sendMsg(id) }}>
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ChatRoomServer;