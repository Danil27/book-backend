import * as process from 'process';

export default () => ({
  // JWT CREDENTIALS
  jwt_secret: process.env.JWT_SECRET,
  //App settings
  api_url: process.env.API_URL,
});
