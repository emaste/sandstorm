if (Meteor.isClient) {
  Meteor.loginWithGoogle = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Google.requestCredential(options, credentialRequestCompleteCallback);
  };
  Meteor.loginWithGithub = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Github.requestCredential(options, credentialRequestCompleteCallback);
  };
}

var services = [];

Accounts.registerService = function (serviceName) {
  if (_.contains(services, serviceName)) {
    return;
  }
  services.push(serviceName);
  if (serviceName === "emailToken") {
    Accounts.emailToken.enable();
  }
  else if (Meteor.isClient && (serviceName === "demo" || serviceName === "devAccounts")) {
    var serviceUserDisplay;
    if (serviceName === "demo") {
      serviceUserDisplay = "a Demo User";
    } else {
      serviceUserDisplay = "a Dev Account";
    }
    Accounts.ui.registerService(serviceName, serviceUserDisplay);
  } else {
    Accounts.oauth.registerService(serviceName);
  }
};

Accounts.deregisterService = function (serviceName) {
  if (!_.contains(services, serviceName)) {
    return;
  }
  services = _.without(services, serviceName);
  if (serviceName === "emailToken") {
    Accounts.emailToken.disable();
  }
  else if (Meteor.isClient && (serviceName === "demo" || serviceName === "devAccounts")) {
    Accounts.ui.deregisterService(serviceName);
  } else {
    Accounts.oauth.deregisterService(serviceName);
  }
};
