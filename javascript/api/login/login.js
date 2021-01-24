/**
 * Login
 */
var AWS = require('aws-sdk');
var constants = require('./constants');
AWS.config.update({region: constants.params.AWS_REGION});

var jwt = require('jsonwebtoken');
var encryptor = require('./encryptor');
exports.handler = (event, context, callback) => login(event, context, callback);

function login(event, context, callback) {
  var lambda = new AWS.Lambda({region: constants.params.AWS_REGION});

  var bodyJson = {};
  try {
    bodyJson = JSON.parse(event.body);
  } catch (e) {
    bodyJson = event.body;
  }

  var username = bodyJson.username;
  var password = bodyJson.password;

  let SQLTorun = `select gbp_user.*,gbp_member.id as memberId from gbp_user left join gbp_member on gbp_member.user_id = gbp_user.id and gbp_member.active = 1 where lower(username) = ? or lower(emailaddress) = ?`;
  console.log('Login SQL to run: ', SQLTorun);
  var payloadEvent = {};

  payloadEvent.queryStringParameters = {
    action: 'select',
  };
  payloadEvent.body = {
    SQL: SQLTorun,
    params: [username, username],
  };

  var params = {
    FunctionName: 'sgbc-common-db',
    InvocationType: 'RequestResponse', // 'Event | RequestResponse | DryRun'
    Payload: JSON.stringify(payloadEvent),
  };

  lambda.invoke(params, function(error, data) {
    if (data) {
      var payload = JSON.parse(data.Payload);
      if (payload.statusCode == 200) {
        data = payload.body;
      } else {
        console.log('error is ' + error);
        error = payload.body;
      }
    }
    if (error) {
      console.log('Error: ', error);
      var res = {errormessage: 'Invalid username or password', error: error};
      callback(res);
    } else {
      if (data == null || data.length <= 0) {
        console.log(`User ${username} is not found`);
        res = {errormessage: 'Invalid username or password'};
        callback(res);
      } else {
        var response = {};
        console.log(`User ${username} is found`);
        var isPasswordCorrect = encryptor.compare(password, data[0].password);
        if (isPasswordCorrect) {
          response.data = data[0];
          console.log(`User ${username} authentication is successful`);
          response.message = 'User can be found';
          response.authorizationToken = jwt.sign(
            data[0],
            process.env.JWTTOKEN_SECRET,
          );
          response.type = 'Success';
          callback(null, response);
        } else {
          console.log(`User ${username} invalid password`);
          res = {errormessage: 'Invalid username or password'};
          callback(res);
        }
      }
    }
  });
}
