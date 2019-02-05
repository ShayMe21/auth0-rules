/*
This rule is used to detect Username-Password Database connection login/signups and reject them if an existing Social account (Google in this case) is found in Auth0.
This rule relies on the helperFunctions.js rule as well which needs to be defined and ordered earlier than this rule.
*/

function (user, context, callback) {

  const CONNECTION_NAME = "Username-Password-Authentication";
  const SOCIAL_CONNECTION_NAME = "google-oauth2";

  // Only run this rule when this database connection is used
  if (context.connection !== CONNECTION_NAME) {
    console.log(`Skipping the rejectDatabaseSignupOrLogin Rule: Not a Database signup/login: ${context.connection}`);
    return callback(null, user, context);
  }

  // DO NOT run this rule if user logged in without an email.
  if (!user.email) {
    console.log('Skipping the rejectDatabaseSignupOrLogin rule: No email found');
    return callback(null, user, context);
  }

  console.log('Checking if the user has a social user identity already...');

  // Check if user already exists and has a social account
  try {
    global.getUserByEmail(user.email, ["user_id,identities"]).then((response) => {
        let existingUser = JSON.parse(response);
        let existingUserProvider = existingUser[0].identities[0].provider;

        if (existingUser[0].user_id && existingUser[0].user_id !== null && existingUserProvider === SOCIAL_CONNECTION_NAME) {
          console.log(`Existing User provider is: ${existingUserProvider} and User has an existing social connection user_id: ${existingUser[0].user_id}`);
          callback(new UnauthorizedError('You already have a Google social account, please use this to login.'));
        }
      })
      .catch((err) => {
        console.log("ERROR when getting existing user");
        throw err;
      });

  } catch (e) {
    console.log("Exception: " + e);
    throw e;
  }
}