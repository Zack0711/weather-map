import React from 'react';

class MessageSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
    };

    this.updateMsg = this.updateMsg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateMsg(e){
    this.setState({msgText: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const {
      msgText
    } = this.state;

    if(msgText.length > 0){
      this.props.sendMsg(msgText);
      this.setState({msgText: ''});      
    }
  }

  render() {
    const {
      msgText,
    } = this.state;

    const {
      roomIsConnected,
    } = this.props

    return(
      <div className="msg-sender">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" className="form-control" value={msgText} disabled={!roomIsConnected} onChange={this.updateMsg}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={this.handleSubmit} disabled={!roomIsConnected}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default MessageSender;