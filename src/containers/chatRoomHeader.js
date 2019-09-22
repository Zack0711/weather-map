import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import ChatRoomHeader from '../components/chatRoomHeader.jsx'

import {
  toggleUsersList,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  openUsersList: shouldOpen => dispatch(toggleUsersList(shouldOpen)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ChatRoomHeader))
