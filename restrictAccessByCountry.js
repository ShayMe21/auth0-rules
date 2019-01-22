/*
** This rule will restrict access to users signing in from any country other than Australia.
*/
function restrictUsersOutsideAustralia (user, context, callback) {
  if (context.request.geoip) {
    if ( context.request.geoip.country_code){
      if (context.request.geoip.country_code === "AU"){
          callback(null, user, context);
      } else {
          return callback(new UnauthorizedError('Unfortunately, you cannot access this Application from your country.'));
      }
    }
  }
}