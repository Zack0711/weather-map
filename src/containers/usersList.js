import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import UsersList from '../components/usersList.jsx'

import {
  toggleUsersList,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  shouldOpen: state.usersList.shouldOpen,
  usersData: state.usersList.byId.toJS(),
  usersList: state.usersList.allIds.toJS(),
	loginName: state.user.getIn(['name']),
})

const mapDispatchToProps = dispatch => ({
  toggleUsersList: shouldOpen => dispatch(toggleUsersList(shouldOpen)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(UsersList))
