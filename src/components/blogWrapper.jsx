import React from 'react';

class BlogWrapper extends React.Component {
  constructor(props){
    super(props);
  }  

  componentDidMount() {
  	this.props.getAllPosts()
  }

  render() {
    const {
	    children,
      isSinglePostModalOpen,
      t,
    } = this.props;

    const mainClass = isSinglePostModalOpen ? 'main is-modal-open' : 'main'

    return(
      <div className={mainClass}>
        {children}
      </div>
    )
  }
}

export default BlogWrapper;