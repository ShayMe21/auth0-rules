/*
* Sample rule to merge Access Token scopes for a Resource Owner Password grant request in Auth0
* https://auth0.com/docs/api-auth/tutorials/password-grant
*/

function mergeAccessTokenScopes(user, context, callback) {
  const MY_CLIENT_ID = '123';
  
  if (context.clientID !== MY_CLIENT_ID){
    console.log(`Skipping RULE mergeAccessTokenScopes`);
    callback(null, user, context);
  }
  
  let existingScopes = context.request.body.scope ? context.request.body.scope : '';
  var mergedScopes;
  
  console.log(`Existing Scopes sent in the request: ${existingScopes}`);

  console.log(`merging scopes for clientID ${MY_CLIENT_ID}`);
  
  mergedScopes = existingScopes + " offline_access"; // Concat any extra scopes

  console.log(`Merged Scopes: ${mergedScopes}`);
  
  context.accessToken.scope = mergedScopes;
  
  callback(null, user, context);
}