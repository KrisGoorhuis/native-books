module.exports = {
  "presets": ["module:metro-react-native-babel-preset", "babel-preset-expo", "@babel/preset-typescript"],
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": true,
      "allowUndefined": true
    }],
    "react-native-reanimated/plugin"
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};