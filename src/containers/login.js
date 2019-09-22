import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import Login from '../components/login.jsx'

import {
  loginByName,
} from '../actionCreators/chatRoomActions';

const mapStateToProps = state => ({
  isLogin: state.user.getIn(['isLogin']),
  isFetching: state.user.getIn(['isFetching']),
  isError: state.user.getIn(['isError']),
})

const mapDispatchToProps = dispatch => ({
  loginByName: name => dispatch(loginByName(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login))
