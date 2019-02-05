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
      const precision = 3;  // 3 decimal places
      const elapsed = process.hrtime(start)[1] / 1000000;   // divide by a million to get ms
      return elapsed.toFixed(precision);
    };
  }

  callback(null, user, context);

}