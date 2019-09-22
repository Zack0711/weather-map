import React from 'react';

const PostContent = ({post}) => {
  const date = new Date(post.date)
  const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  const author = post._embedded.author[0].name

  return (
    <div className="content">
      <header>
        <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
        <div className="publish-info">{dateString} {author}</div>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
      </main>
    </div>
  )
}

class PostModal extends React.Component {
  constructor(props){
    super(props);
  }  

  componentDidMount() {
  }

  render() {
    const {
      post,
      isOpen,
      clostModal,
      t,
    } = this.props;

    return(
      <section className="post-modal">
        <div className="btn close-btn" onClick={clostModal}>
          <i className="fa fa-times"></i>
        </div>
        {
          post && <PostContent post={post}/>
        }
      </section>
    )
  }
}

export default PostModal;