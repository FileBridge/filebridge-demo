const { override } = require("customize-cra");

const ignoreWarnings = value => config => {
  config.ignoreWarnings = value;
  return config;
};

module.exports = override(
  ignoreWarnings([/Failed to parse source map/])
);