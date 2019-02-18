function setupCommonFunctions(user, context, callback) {
  const auth0BaseUrl = auth0.baseUrl;

  // https://github.com/request/request-promise
  if (!global.requestLib) {
    global.requestLib = require('request-promise');
  }

  if (!global.jwtLib) {
    global.jwtLib = require('jsonwebtoken');
  }


  if (!global.getUserByEmail) {
    global.getUserByEmail = (email, fields) => {

      // Check if user already exists in Auth0
      return global.requestLib.get({
        url: `${auth0BaseUrl}/users-by-email?fields=${fields.join(',')}`,
        headers: {
          Authorization: 'Bearer ' + auth0.accessToken
        },
        qs: {
          email: email
        }
      });
    };
  }

  if (!global.timeTaken) {
    global.timeTaken = (start) => { // start should be by process.hrtime();
      if (!start) {
        return '';
      }
      const precision = 3; // 3 decimal places
      const elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get ms
      return elapsed.toFixed(precision);
    };
  }

  if (!global.getApi2Token) {
    // A M2M Application authorized to Management APIv2
    const AUTH0_DOMAIN = 'shayan-dev.au.auth0.com';
    const CLIENT_ID = '43BKVc57RgIiVJrbM8gRDIBQgofdByYe';

    // Client credentials grant: https://auth0.com/docs/api/authentication#machine-to-machine-m2m-flow
    global.getApi2Token = () => {
      return global.requestLib({
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
      });
    };
  }

  callback(null, user, context);
}