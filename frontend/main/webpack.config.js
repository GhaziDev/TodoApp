
const webpack = require('webpack');

plugins:[
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ]

module.exports ={
    plugins:plugins
}
  
