import React from 'react';

const SinglePost = ({post, readSinglePost}) => {
  const bgStyle = {
    backgroundImage: `url(${post._embedded['wp:featuredmedia'][0].source_url})`
  }

  const onClick = () => readSinglePost(post)

  return (
    <div className="single-post">
      <div className="row no-gutters">
        <div className="col-5">
          <div className="post-cover" style={bgStyle}/>
        </div>
        <div className="col-7 position-relative">
          <div className="post-excerpt">
            <h4 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
            <div className="content" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
          </div>
          <div className="read-more-btn" onClick={onClick}>繼續閱讀</div>
        </div>
      </div>
    </div>
  )
}

class PostList extends React.Component {
  constructor(props){
    super(props);
  }  

  componentDidMount() {
  }

  render() {
    const {
      posts,
      readSinglePost,
      t,
    } = this.props;

    return(
      <section className="post-list mt-3">
        { posts.length > 0 && <h3>文章列表</h3> }
        {
          posts.map( post => <SinglePost post={post} key={post.id} readSinglePost={readSinglePost}/>)
        }
      </section>
    )
  }
}

export default PostList;