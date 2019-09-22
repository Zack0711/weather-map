import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  readSinglePost
} from '../actionCreators/posts';
import PostCarousell from '../components/postCarousell.jsx'

const mapStateToProps = state => ({
  posts: state.posts.list.slice(0,5),	
})

const mapDispatchToProps = dispatch => ({
  readSinglePost: post => dispatch(readSinglePost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(PostCarousell))
