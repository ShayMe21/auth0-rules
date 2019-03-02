function ManagementAPIGetUserbyId(user, context, callback) {
  var current_user = user.user_id;

  var ManagementClient = require('auth0@2.9.1').ManagementClient;

  try {
    var management = new ManagementClient({
      token: auth0.accessToken,
      domain: auth0.domain
    });

    console.log(current_user);

    management.users.get({
      id: current_user
    }, function (err, u) {
      if (err) {
        callback(`ERROR in API2 GET USER RULE: ${err}`);
      }

      console.log(`user.last_login: ${u.last_login}`);
      console.log(`user.last_ip: ${u.last_ip}`);
      callback(null, user, context);
    });
  } catch (e) {
    console.log(`EXCEPTION in API2 GET USER RULE: ${e}`);
    callback("EXCEPTION in API2 GET USER");
  }
}