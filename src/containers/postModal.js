import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  clostSinglePostModal
} from '../actionCreators/posts';
import postModal from '../components/postModal.jsx'

const mapStateToProps = state => ({
  post: state.posts.targetPost,
  isOpen: state.posts.isSinglePostModalOpen
})

const mapDispatchToProps = dispatch => ({
  clostModal: () => dispatch(clostSinglePostModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(postModal))
