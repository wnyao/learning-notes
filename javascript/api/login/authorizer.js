/**
 * Form token authorizer
 *
 * A simple TOKEN authorizer example to demonstrate how to use an authorization token
 * to allow or deny a request. In this example, the caller named 'user' is allowed to invoke
 * a request if the client-supplied token value is 'allow'. The caller is not allowed to invoke
 * the request if the token value is 'deny'. If the token value is 'Unauthorized', the function
 * returns the 'Unauthorized' error with an HTTP status code of 401. For any other token value,
 * the authorizer returns an 'Invalid token' error.
 */

var jwt = require('jsonwebtoken');

exports.handler = function(event, context, callback) {
  var token = event.authorizationToken;

  console.log('Attempt authentication : ', token);
  var userObj;
  if (token != 'allow') {
    try {
      userObj = jwt.verify(token, process.env.JWTTOKEN_SECRET); // process.env.JWTTOKEN_SECRET is set on lambda env
      var userObjTmp = userObj;
      userObj = {};
      userObj.loginId = userObjTmp.loginId;
      userObj.username = userObjTmp.username;
      userObj.first_name = userObjTmp.first_name;
      userObj.last_name = userObjTmp.last_name;
      userObj.is_staff = userObjTmp.is_staff;
      userObj.is_admin = userObjTmp.is_admin;
      userObj.is_member = userObjTmp.is_member;
      userObj.is_course_provider = userObjTmp.is_course_provider;
      userObj.member_id = userObjTmp.memberId;
      token = 'allow';
    } catch (e) {
      console.log('error: ', e);
      token = 'unauthorized';
    }
  } else {
    userObj = {};
    userObj.loginId = '1';
    userObj.username = 'fernando';
    userObj.first_name = 'Fernando';
    userObj.last_name = 'Karnagi';
    userObj.is_staff = 1;
    userObj.is_admin = 0;
    userObj.is_member = 0;
    userObj.is_course_provider = 0;
    userObj.member_id = 10;
  }

  switch (token.toLowerCase()) {
    case 'allow':
      console.log('Generating allow policy');
      callback(null, generatePolicy(userObj, 'Allow', event.methodArn));
      break;
    case 'deny':
      console.log('Generating deny policy');
      callback(null, generatePolicy(userObj, 'Deny', event.methodArn));
      break;
    case 'unauthorized':
      callback('Unauthorized'); // Return a 401 Unauthorized response
      break;
    default:
      callback('Error: Invalid token');
  }
};

// Help function to generate an IAM policy
var generatePolicy = function(userObj, effect, resource) {
  var authResponse = {};

  authResponse.principalId = userObj.username;

  if (effect && resource) {
    // Updated by Fernando - 4 Sep 2018 to allow authorisation from anywhere
    //resource = resource.substring(0, resource.lastIndexOf("/")) + "/*";
    resource = 'arn:aws:execute-api:*:*:*';
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = userObj;
  console.log('Auth response: ', authResponse);
  return authResponse;
};
