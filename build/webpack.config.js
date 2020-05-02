const path = require('path');
const { BannerPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ChmodWebpackPlugin = require('chmod-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: { index: './src/index.ts' },
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    filename: 'd2s-cli.min.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: { 
    extensions: ['.tsx', '.ts', '.js'] 
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          { loader:'babel-loader' },
          {
            loader:'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, '../tsconfig.json')
            }
          }
        ],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    new ChmodWebpackPlugin(
      [{ path: path.resolve(__dirname, '../dist/d2s-cli.min.js'), mode: 755 }]
    )
  ]
};
