function getManagementApiToken(user, context, callback) {
  console.log("MANAGEMENT-API RULE RUNNING");

  if (!global.requestLib) {
    global.requestLib = require('request-promise');
  }

  try {
    global.getApi2Token().then((response) => {
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