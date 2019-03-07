// https://auth0.com/docs/api-auth/tutorials/adoption/scope-custom-claims#custom-claims

function addCustomClaimsToIdToken(user, context, callback) {
  const namespace = 'https://myapp.example.com/';

  // Check if the user has a Google identity
  if (user.identities) {
    user.identities.forEach((identity) => {
      if (identity.provider === 'google-apps' || identity.provider === 'google-oauth2') {
        context.idToken[namespace + 'hasGoogleId'] = true;
        callback(null, user, context);
      }
    });
  }
  callback(null, user, context);
}