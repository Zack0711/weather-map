import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import BlogWrapper from '../components/blogWrapper.jsx'

import {
  getAllPosts
} from '../actionCreators/posts';

const mapStateToProps = state => ({
  isSinglePostModalOpen: state.posts.isSinglePostModalOpen
})

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(BlogWrapper))
