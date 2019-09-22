import React from 'react';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
  }

  updateUserName(e){
    this.setState({userName: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const {
      userName
    } = this.state;

    if(userName.length > 0){
      this.props.loginByName(userName);
    }
  }

  render() {
    const {
      userName,
    } = this.state;

    const {
      isFetching,
      isError,
      isLogin,
      t,
    } = this.props

    return(
      <>
      {
        !isLogin && (
          <div className="login-modal">
            {
              isFetching ? (
                <div>
                  <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  <span className="sr-only">{t('is-logging')}</span>
                </div>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <p>{t('login-title')}</p>
                  {isError ? (
                    <div className="text-danger">{t('login-error')}</div>
                  ) : ''}
                  <div className="input-group">
                    <input type="text" className="form-control" value={userName} onChange={this.updateUserName}/>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" onClick={this.handleSubmit}>
                        {t('btn-send')}
                      </button>
                    </div>
                  </div>
                </form>
              )
            }
          </div>
        )
      }
      </>
    )
  }
}

export default Login