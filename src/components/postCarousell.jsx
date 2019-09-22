import React from 'react';
import Slider from 'react-slick';

const SinglePost = ({post, readSinglePost}) => {
  const bgStyle = {
    backgroundImage: `url(${post._embedded['wp:featuredmedia'][0].source_url})`
  }

  const onClick = () => readSinglePost(post)

  return(
    <div className="single-post" onClick={onClick}>
      <div className="post-bg" style={bgStyle}/>
      <div className="post-title">
        <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
      </div>
    </div>
  )
}

class PostCarousell extends React.Component {
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

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return(
      <section className="post-carousell">
        <Slider {...settings}>
        {
          posts.map( post => <SinglePost post={post} key={post.id} readSinglePost={readSinglePost}/>)
        }
        </Slider>
      </section>
    )
  }
}

export default PostCarousell;