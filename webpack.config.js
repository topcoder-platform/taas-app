/* global __dirname */
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "topcoder",
    projectName: "micro-frontends-teams",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          /* Loads SCSS stylesheets. */
          test: /\.scss/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          exclude: [/node_modules/],
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      alias: {
        styles: path.resolve(__dirname, "src/styles"),
        components: path.resolve(__dirname, "src/components"),
        hooks: path.resolve(__dirname, "src/hooks"),
        utils: path.resolve(__dirname, "src/utils"),
        constants: path.resolve(__dirname, "src/constants"),
        services: path.resolve(__dirname, "src/services"),
      },
    },
  });
};
