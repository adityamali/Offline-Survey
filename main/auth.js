// const { app } = require('electron');
// const { OAuth2Provider } = require('electron-oauth2');

// const config = {
//   clientId: 'YOUR_CLIENT_ID',
//   clientSecret: 'YOUR_CLIENT_SECRET',
//   authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
//   tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
//   useBasicAuthorizationHeader: false,
//   redirectUri: 'http://localhost'
// };

// const windowParams = {
//   alwaysOnTop: true,
//   autoHideMenuBar: true,
//   webPreferences: {
//     nodeIntegration: false
//   }
// };

// const options = {
//   scope: 'user.read files.readwrite',
//   accessType: 'offline'
// };

// const oauth2 = new OAuth2Provider(config, windowParams);

// async function getAccessToken() {
//   const token = await oauth2.getAccessToken(options);
//   return token.access_token;
// }

// module.exports = { getAccessToken };