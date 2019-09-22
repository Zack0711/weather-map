import "@babel/polyfill";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './styles/main.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import BlogWrapper from './containers/blogWrapper';
import PostCarousell from './containers/postCarousell';
import PostList from './containers/postList';
import PostModal from './containers/postModal';

import store from './store';
import i18n from './i18n';

class SolarEclipseBlog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BlogWrapper>
            <PostCarousell/>
            <PostList/>
            <PostModal/>
          </BlogWrapper>
        </I18nextProvider>
      </Provider>
    )
  }  
}

export default SolarEclipseBlog