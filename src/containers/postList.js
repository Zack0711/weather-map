import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  readSinglePost
} from '../actionCreators/posts';
import PostList from '../components/postList.jsx'

const mapStateToProps = state => ({
  posts: state.posts.list,	
})

const mapDispatchToProps = dispatch => ({
  readSinglePost: post => dispatch(readSinglePost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(PostList))
