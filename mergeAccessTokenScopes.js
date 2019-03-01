function mergeAccessTokenScopes(user, context, callback) {
  let existingScopes = context.request.body.scope ? context.request.body.scope : '';
  var mergedScopes;
  const MY_CLIENT_ID = '123';   // Change this to you own CLIENT ID
  
  console.log(`Existing Scopes sent in the request: ${existingScopes}`);
  
  if (context.clientID === MY_CLIENT_ID){
    console.log(`merging scopes for clientID ${MY_CLIENT_ID}`);
    mergedScopes = existingScopes.concat([" offline_access"]);
  }
  
  console.log(`Merged Scopes: ${mergedScopes}`);
  
  context.accessToken.scope = mergedScopes;
  
  callback(null, user, context);
}