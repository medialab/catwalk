const {ProvidePlugin} = require('webpack');

module.exports = {
  plugins: [new ProvidePlugin({React: 'react'})]
};
