const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const browserSyncWeb = new BrowserSyncPlugin({
  // browse to http://localhost:3000/ during development,
  // ./public directory is being served
  https: true,
  host: 'localhost',
  port: 3010,
  proxy: "https://0.0.0.0:3000/",
});

const defaultSetting = {
  site: 'presenter',
  app: 'vive',
  page: 'index',
  sync: false,
};

const optimization = {
  splitChunks: {
    cacheGroups: {
      default: false,
      vendors: {
        name: 'vendor',
        reuseExistingChunk: true,
        test: /[\\/]node_modules[\\/]|[\\/]react-slick[\\/]/,
        chunks: 'all',
      },
    }
  },  
};

const devServer = {
  inline: true,
  https: true,
  open: false,
  host: "0.0.0.0",
  port: 3000,
}

const fileRouteSetting = (env, site, app) => {
  const setting = {
    mode: env === 'dev' ? 'development' : 'production',
    entryRoute: site === 'presenter' ? 'static/app' : 'static/cms_admin/app',
    outputRoute: site === 'presenter' ? 'static/app/dist' : 'static/cms_admin/app/dist',
    entry: {},
    extractCSS: new ExtractTextPlugin('other-styles.css'),
    extractLess: new ExtractTextPlugin('original-styles.css'),
    extractSass: new ExtractTextPlugin('new-styles.css'),
  }

  switch(app){
    case 'htc_chrome':
      setting.outputRoute = 'static/app/htc_dist';
      setting.extractSass = new ExtractTextPlugin('styles.css');

      if( env === 'dev'){
        setting.entry['chrome'] = './htcChromeApp.js';
      }else{
        setting.entry['chrome'] = './htcChromeApp.js';
      }      

      break;
    case 'htc':
      setting.outputRoute = 'static/app/htc_dist';
      setting.extractSass = new ExtractTextPlugin('styles.css');

      if( env === 'dev'){
        setting.entry['app'] = './indexDev.htc.js';
      }else{
        setting.entry['app'] = './index.htc.js';
      }      
      break;
    default:
      if( env === 'dev'){
        setting.entry['app'] = './indexDev.js';
      }else{
        setting.entry['app'] = './index.js';
      }      
  }

  return setting;
}

module.exports = (env, argv) => {
  const {
    site,
    app,
    page,
    sync,
  } = Object.assign(defaultSetting, argv);

  const htmlTemplate = new HtmlWebpackPlugin({
    title: page,
    template: `template/${page}.ejs`,
  })

  const {
    mode,
    entryRoute,
    outputRoute,
    entry,
    extractCSS,
    extractLess,
    extractSass,
  } = fileRouteSetting(env, site, app);

  const webpackSetting = {
    mode,
    context: `${__dirname}/${entryRoute}/src/`,
    entry,
    output: {
      path: `${__dirname}/${outputRoute}/`,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: loader => [
                    require('autoprefixer')({
                      browsers: ['> 1%', 'ie 9', 'last 2 versions'],
                    }),
                    require('postcss-rtl')(),
                  ]
                }
              },
              {
                loader: "less-loader",
                options: {
                  compress: false,
                }
              },
            ]
          })
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
            ]
          })
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 4
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
        },
        { test: /\.html$/, loader: 'html-loader' }
      ]
    },
    //optimization,
    plugins: [
      htmlTemplate,
      extractCSS,
      extractLess,
      extractSass,
      //new BundleAnalyzerPlugin(),
    ]
  }

  if( env === 'dev'){
    webpackSetting['devtool'] = 'source-map';
    webpackSetting['devServer'] = devServer;
  }

  if( app !== 'htc_chrome' ){
    webpackSetting['optimization'] = optimization;
  }

  if(sync) webpackSetting['plugins'].push(browserSyncWeb);

  return webpackSetting;
};