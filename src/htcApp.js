import './styles/scss/htc/main.scss';

//import ReactComponent from'./reactComponent.jsx';

import Header from './utilities/header.r';
/*
import {
  initialCookieData,
  updateQueryCondition,
  updateSiteGTM,
} from './actions';
*/

class HtcApp {
  constructor() {
    this.header = new Header(document.querySelector('.header'));
  }

  init() {
    const siteGTM = document.location.pathname.split('/')[2] || 'index';
    const siteID = document.body.getAttribute('data-site') || document.documentElement.getAttribute('data-site');

    //store.dispatch(updateSiteGTM(siteGTM));
    //store.dispatch(initialCookieData());
    //store.dispatch(updateQueryCondition({ sites: siteID }));

    console.log('init');
  }
}

export default new HtcApp();
