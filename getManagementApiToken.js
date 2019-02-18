function getManagementApiToken(user, context, callback) {
  console.log("MANAGEMENT-API RULE RUNNING");

  // A M2M Application authorized to Management APIv2
  const AUTH0_DOMAIN = 'shayan-dev.au.auth0.com';
  const CLIENT_ID = '43BKVc57RgIiVJrbM8gRDIBQgofdByYe';

  if (!global.requestLib) {
    global.requestLib = require('request-promise');
  }

  // Client credentials grant: https://auth0.com/docs/api/authentication#machine-to-machine-m2m-flow
  var options = {
    method: 'POST',
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: {
      'content-type': 'application/json'
    },
    body: {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: configuration.client_secret,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`
    },
    json: true,
    timeout: 2000 // https://github.com/request/request#timeouts
  };

  try {
    global.requestLib(options).then((response) => {
      console.log("PRINTING API2 Access Token...");
      var api2AccessToken = response.access_token;
      console.log(api2AccessToken);
      callback(null, user, context);

    }).catch((err) => {
      console.log(`This was a connection timeout: ${err.connect === true}`);
      callback(`There was an issue retrieving Management APIV2 Token: ${err}`);
    });

  } catch (e) {
    callback(`Unable to get API2 Token: ${e}`);
  }

  //callback(null, user, context);
}