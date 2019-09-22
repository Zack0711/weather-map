import React from 'react';
import ReactDOM from 'react-dom';

import SingleMessage from './singleMessage.jsx';

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.shouldScrollToBottom = false;
  }  

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  getSnapshotBeforeUpdate() {
    const node = ReactDOM.findDOMNode(this);
    console.log(node.scrollTop);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;    
  }
  /*
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }
  */

  componentDidUpdate() {
    if(this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const {
      msgData,
      msgList,
      updateMessageById,
      userId,
      t,
    } = this.props;

    return(
      <div className="main">
        <div className="msg-timeline">
          { msgList.map(id => <SingleMessage key={id} msg={msgData[id]} isFromMe={msgData[id].authorId === userId} t={t}/>)}
        </div>
        <div className="unsend-msg">
        </div>
      </div>
    )
  }
}

export default MessageList