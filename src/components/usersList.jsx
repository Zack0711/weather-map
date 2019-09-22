import React from 'react';

const SingleUser = ({userData}) => (
  <div className={`single-user ${userData.isOnline ? 'is-online' : 'is-offline'}`}>
    {userData.name}
  </div>
)

const UsersList = ({usersData, usersList, toggleUsersList, shouldOpen, loginName, t}) => (
  <div className={`users-list${shouldOpen ? ' is-open' : ''}`}>
    <div className="users-list__header">
      <button className="btn btn-light" onClick={() => {toggleUsersList(false)}}>
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </button>
      <div className="col">
        {t('total-users', { count: usersList.length + 1 })}
      </div>
    </div>
    <div className="content">
      <div className="single-user is-online">
        {loginName}
      </div>
      { usersList.map(d => <SingleUser key={usersData[d].id} userData = {usersData[d]} />)}
    </div>
  </div>
)

export default UsersList