const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(__dirname, 'index.web.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[fullhash].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
      alias: {
        'react-native$': 'react-native-web',
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@screens': path.resolve(__dirname, 'src/screens'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@query': path.resolve(__dirname, 'src/query')
      }
    },
    module: {
      rules: [
        {
            test: /\.[jt]sx?$/,
            include: [
              path.resolve(__dirname, 'src'),
              path.resolve(__dirname),
              path.resolve(__dirname, 'node_modules', 'react-native'),
              path.resolve(__dirname, 'node_modules', 'react-native-svg'),
              path.resolve(__dirname, 'node_modules', '@react-navigation')
            ],
            use: {
              loader: 'babel-loader',
              options: { cacheDirectory: true }
            }
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            '@svgr/webpack',
            {
              loader: 'url-loader',
              options: { limit: 8192 }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext]'
          }
        },
        {
          test: /\.(ttf|otf|eot|woff2?)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name].[hash][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        inject: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      port: 3000,
      static: {
        directory: path.resolve(__dirname, 'public')
      },
      hot: true,
      open: true
    },
    performance: {
      hints: false
    },
    devtool: isProd ? 'source-map' : 'eval-source-map'
  };
};