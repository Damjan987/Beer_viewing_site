module.exports = {
  resolve: {
    fallback: { zlib: require.resolve("browserify-zlib") },
    fallback: { querystring: require.resolve("querystring-es3") },
    fallback: { path: require.resolve("path-browserify") },
    fallback: { crypto: require.resolve("crypto-browserify") },
    fallback: { stream: require.resolve("stream-browserify") },
    fallback: { url: require.resolve("url/") },
    fallback: { http: require.resolve("stream-http") },
  },
};
