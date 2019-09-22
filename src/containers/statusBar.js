import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import StatusBar from '../components/statusBar.jsx'

import {
  connectChatRoom,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  roomIsFetching: state.chatRoom.getIn(['isFetching']),
  roomIsConnected: state.chatRoom.getIn(['isConnected']),
  roomIsError: state.chatRoom.getIn(['isError']),
  userIsLogin: state.user.getIn(['isLogin']),
})

const mapDispatchToProps = dispatch => ({
  connectChatRoom: () => dispatch(connectChatRoom()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(StatusBar))
