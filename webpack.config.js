const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, args) => {
    const isProductionMode = (args.mode === 'production');

    return {
        entry: './app/app.tsx',
        module: {
          rules: [
            {
              test: /\.(js|jsx|tsx|ts)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "@babel/preset-typescript"
                  ]
                }
              },
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            }
          ],
        },
        resolve: {
          extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
          plugins: [
            new TsconfigPathsPlugin({
              configFile: "./tsconfig.json" 
            }),
          ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProductionMode ? '[name].[contenthash].js' : '[name].[hash].js',
        },
        experiments: {
          asyncWebAssembly: true,
        },
        devServer: {
          static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/public',
          },
          hot: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new ForkTsCheckerWebpackPlugin({
              async: false,
              eslint: {
                files: "./app/**/*",
              },
            }),
        ],
    };
}
