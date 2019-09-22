import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import MessageSender from '../components/msgSender.jsx'

import {
  sendMsg,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  roomIsConnected: state.chatRoom.getIn(['isConnected']),
})

const mapDispatchToProps = dispatch => ({
  sendMsg: msg => dispatch(sendMsg(msg)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(MessageSender))
