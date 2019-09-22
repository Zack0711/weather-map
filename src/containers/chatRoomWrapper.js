import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import ChatRoomWrapper from '../components/chatRoomWrapper.jsx'

import {
  toggleUsersList,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  roomIsConnected: state.chatRoom.getIn(['isConnected']),
  isLogin: state.user.getIn(['isLogin']),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ChatRoomWrapper))
