const metaContext = require.context(
  '!!file-loader?name=/[name].[ext]!.',
  true,
  /\.(svg|png|ico|xml|json)$/,
);
metaContext.keys().forEach(metaContext);
