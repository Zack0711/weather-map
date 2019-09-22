import { createActions } from 'redux-actions';

import {
  normalizingList,
} from '../utilities';

import { WSURI } from '../settings';

let chatRoomSocket;

const {
  loginStart,
  loginFail,
  connectStart,
  connectFail,
  connectSuccess,
  updateMessageById,
  updateMessagesData,
  updateMessagesList,
  prependMessages,
  appendMessages,
  updateLoginStatus,
  toggleUsersList,
  updateUsersData,
  updateUserById,
  updateUsersList,
  removeUserFromList,
  appendUsersList,
} = createActions({
  LOGIN_START: () => ({}),
  LOGIN_FAIL: () => ({}),
  CONNECT_START: () => ({}),
  CONNECT_FAIL: () => ({}),
  CONNECT_SUCCESS: () => ({}),
  UPDATE_MESSAGE_BY_ID : (id, msgState) => ({id, msgState}),
  UPDATE_MESSAGES_DATA: data => ({data}),
  UPDATE_MESSAGES_LIST: list => ({list}),
  PREPEND_MESSAGES: list => ({list}),
  APPEND_MESSAGES: list => ({list}),
  UPDATE_LOGIN_STATUS: status => ({status}),
  TOGGLE_USERS_LIST: shouldOpen => ({shouldOpen}),
  UPDATE_USERS_DATA: data => ({data}),
  UPDATE_USER_BY_ID: (id, userState) => ({id, userState}),
  UPDATE_USERS_LIST: list => ({list}),
  REMOVE_USER_FROM_LIST: id => ({id}),
  APPEND_USERS_LIST: list => ({list}),
})

const loginByName = name => (dispatch, getState) => {
  const requestOption = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({name}),
  };

  dispatch(loginStart());
  fetch('login', requestOption).then( async rsp => {
    if(rsp.ok){
      const status = await rsp.json();
      dispatch(updateLoginStatus(status));
      dispatch(connectChatRoom());
    }else{
      throw Error(rsp.statusText)
    }
  }).catch(e => {
    dispatch(loginFail());
  })
}

const fetchHistoryMessages = () => (dispatch, getState) => {
  fetch('fetch-history-messages').then( async rsp => {
    if(rsp.ok){
      const data = await rsp.json();
      dispatch(updateHistoryMessages(data.messages))
    }else{
      throw Error(rsp.statusText)
    }
  }).catch(e => {
//    dispatch(loginFail());
  })

}

const sendMsg = msg => (dispatch, getState) => {
  const {
    name,
    id,
  } = getState().user.toJS();

  const {
    isConnected
  } = getState().chatRoom.toJS();

  const newMessage = {
    text: msg,
    type: 'chat',
    date: new Date().getTime(),
    id: `${id}-${new Date().getTime()}`,
    authorId: id,
    name,    
  }

  dispatch(updateBroadcastMessages([newMessage]))
  if(isConnected){
    chatRoomSocket.send({type:'send-msg', data: { newMessage }});
  }
}

const connectChatRoom = () => (dispatch, getState) => {

  dispatch(connectStart());
  const {
    name,
    id,
  } = getState().user.toJS();

  chatRoomSocket = new WebSocket(WSURI);

  chatRoomSocket.onopen = (e) => { 
    dispatch(connectSuccess());
    chatRoomSocket.send({type:'new-user-connect', data: { name, id}});
    dispatch(fetchHistoryMessages());
  };

  chatRoomSocket.onmessage = (e) => { 
    const d = JSON.parse(e.data);
    switch(d.type){
      case 'msg':
        dispatch(updateBroadcastMessages([d.data]));
        break;
      case 'user-online-info':
        const {
          id,
          isOnline,
          name,
        } = d.data.userData;

        const loginMsg = {
          id: d.data.id,
          type: 'info',
          date: d.data.date,
          subType: isOnline ? 'is-online' : 'is-offline',
          target: name,
        }
        dispatch(updateUserById(id, {isOnline}));
        dispatch(updateBroadcastMessages([loginMsg]));
        break;
      case 'user-join-info':
        const {
          userData,
        } = d.data;

        const joinMsg = {
          id: d.data.id,
          type: 'info',
          date: d.data.date,
          subType: userData.isJoined ? 'is-join' : 'is-left',
          target: userData.name,
        }

        if(userData.isJoined){
          const newUserdata = {};
          newUserdata[userData.id] = userData;
          dispatch(updateUsersData(newUserdata));
          dispatch(appendUsersList([userData.id]));
        }else{
          dispatch(removeUserFromList(userData.id));          
        }
        dispatch(updateBroadcastMessages([joinMsg]));
        break;
      case 'user-list':
        dispatch(updateChatRoomUsersList(d.data.userList))
        break;
    }
  };

  chatRoomSocket.onclose = (e) => { 
    dispatch(connectFail());
  };
  chatRoomSocket.onerror = (e) => {};
}

const updateChatRoomUsersList = userList => (dispatch, getState) => {
  const {
    data,
    list,
  } = normalizingList(userList);

  dispatch(updateUsersData(data));
  dispatch(updateUsersList(list));  
}


const updateHistoryMessages = msgList => (dispatch, getState) => {
  const {
    data,
    list,
  } = normalizingList(msgList);
  dispatch(updateMessagesData(data));
  dispatch(updateMessagesList(list));  
}

const updateBroadcastMessages = msgList => (dispatch, getState) => {
  const {
    data,
    list,
  } = normalizingList(msgList);

  dispatch(updateMessagesData(data));
  dispatch(appendMessages(list));  
}

export {
  loginByName,
  loginStart,
  loginFail,
  connectStart,
  connectFail,
  connectSuccess,
  connectChatRoom,
  updateLoginStatus,
  updateMessageById,
  updateMessagesData,
  updateMessagesList,
  prependMessages,
  appendMessages,
  updateBroadcastMessages,
  updateHistoryMessages,
  toggleUsersList,
  sendMsg,
  updateUsersData,
  updateUserById,
  updateUsersList,
  removeUserFromList,
}