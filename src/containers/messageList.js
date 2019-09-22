import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import MessageList from '../components/messageList.jsx'

import {
  updateMessageById,
  updateBroadcastMessages,
  updateHistoryMessages,  
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  msgData: state.messages.byId.toJS(),
  msgList: state.messages.allIds.toJS(),
  userId: state.user.getIn(['id']),
})

const mapDispatchToProps = dispatch => ({
  updateMessageById: id => dispatch(updateMessageById(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(MessageList))
