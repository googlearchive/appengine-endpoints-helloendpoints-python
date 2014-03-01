/**
 * @fileoverview
 * Provides methods for the Hello Endpoints sample UI and interaction with the
 * Hello Endpoints API.
 *
 * @author danielholevoet@google.com (Dan Holevoet)
 */

/** google global namespace for Google projects. */
var google = google || {};

/** devrel namespace for Google Developer Relations projects. */
google.devrel = google.devrel || {};

/** samples namespace for DevRel sample code. */
google.devrel.samples = google.devrel.samples || {};

/** hello namespace for this sample. */
google.devrel.samples.hello = google.devrel.samples.hello || {};

/**
 * Client ID of the application (from the APIs Console).
 * @type {string}
 */
google.devrel.samples.hello.CLIENT_ID =
    'replace this with your web application client ID';

/**
 * Scopes used by the application.
 * @type {string}
 */
google.devrel.samples.hello.SCOPES =
    'https://www.googleapis.com/auth/userinfo.email';

/**
 * Whether or not the user is signed in.
 * @type {boolean}
 */
google.devrel.samples.hello.signedIn = false;

/**
 * Loads the application UI after the user has completed auth.
 */
google.devrel.samples.hello.userAuthed = function() {
  var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
    if (!resp.code) {
      google.devrel.samples.hello.signedIn = true;
      document.querySelector('#signinButton').textContent = 'Sign out';
      document.querySelector('#authedGreeting').disabled = false;
    }
  });
};

/**
 * Handles the auth flow, with the given value for immediate mode.
 * @param {boolean} mode Whether or not to use immediate mode.
 * @param {Function} callback Callback to call on completion.
 */
google.devrel.samples.hello.signin = function(mode, callback) {
  gapi.auth.authorize({client_id: google.devrel.samples.hello.CLIENT_ID,
      scope: google.devrel.samples.hello.SCOPES, immediate: mode},
      callback);
};

/**
 * Presents the user with the authorization popup.
 */
google.devrel.samples.hello.auth = function() {
  if (!google.devrel.samples.hello.signedIn) {
    google.devrel.samples.hello.signin(false,
        google.devrel.samples.hello.userAuthed);
  } else {
    google.devrel.samples.hello.signedIn = false;
    document.querySelector('#signinButton').textContent = 'Sign in';
    document.querySelector('#authedGreeting').disabled = true;
  }
};

/**
 * Prints a greeting to the greeting log.
 * param {Object} greeting Greeting to print.
 */
google.devrel.samples.hello.print = function(greeting) {
  var element = document.createElement('div');
  element.classList.add('row');
  element.innerHTML = greeting.message;
  document.querySelector('#outputLog').appendChild(element);
};

/**
 * Gets a numbered greeting via the API.
 * @param {string} id ID of the greeting.
 */
google.devrel.samples.hello.getGreeting = function(id) {
  gapi.client.helloworld.greetings.getGreeting({'id': id}).execute(
      function(resp) {
        if (!resp.code) {
          google.devrel.samples.hello.print(resp);
        }
      });
};

/**
 * Lists greetings via the API.
 */
google.devrel.samples.hello.listGreeting = function() {
  gapi.client.helloworld.greetings.listGreeting().execute(
      function(resp) {
        if (!resp.code) {
          resp.items = resp.items || [];
          for (var i = 0; i < resp.items.length; i++) {
            google.devrel.samples.hello.print(resp.items[i]);
          }
        }
      });
};

/**
 * Gets a greeting a specified number of times.
 * @param {string} greeting Greeting to repeat.
 * @param {string} count Number of times to repeat it.
 */
google.devrel.samples.hello.multiplyGreeting = function(
    greeting, times) {
  gapi.client.helloworld.greetings.multiply({
      'message': greeting,
      'times': times
    }).execute(function(resp) {
      if (!resp.code) {
        google.devrel.samples.hello.print(resp);
      }
    });
};

/**
 * Greets the current user via the API.
 */
google.devrel.samples.hello.authedGreeting = function(id) {
  gapi.client.helloworld.greetings.authed().execute(
      function(resp) {
        google.devrel.samples.hello.print(resp);
      });
};

/**
 * Enables the button callbacks in the UI.
 */
google.devrel.samples.hello.enableButtons = function() {
  var getGreeting = document.querySelector('#getGreeting');
  getGreeting.addEventListener('click', function(e) {
    google.devrel.samples.hello.getGreeting(
        document.querySelector('#id').value);
  });

  var listGreeting = document.querySelector('#listGreeting');
  listGreeting.addEventListener('click',
      google.devrel.samples.hello.listGreeting);

  var multiplyGreetings = document.querySelector('#multiplyGreetings');
  multiplyGreetings.addEventListener('click', function(e) {
    google.devrel.samples.hello.multiplyGreeting(
        document.querySelector('#greeting').value,
        document.querySelector('#count').value);
  });

  var authedGreeting = document.querySelector('#authedGreeting');
  authedGreeting.addEventListener('click',
      google.devrel.samples.hello.authedGreeting);

  var signinButton = document.querySelector('#signinButton');
  signinButton.addEventListener('click', google.devrel.samples.hello.auth);
};

/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 */
google.devrel.samples.hello.init = function(apiRoot) {
  // Loads the OAuth and helloworld APIs asynchronously, and triggers login
  // when they have completed.
  var apisToLoad;
  var callback = function() {
    if (--apisToLoad == 0) {
      google.devrel.samples.hello.enableButtons();
      google.devrel.samples.hello.signin(true,
          google.devrel.samples.hello.userAuthed);
    }
  }

  apisToLoad = 2; // must match number of calls to gapi.client.load()
  gapi.client.load('helloworld', 'v1', callback, apiRoot);
  gapi.client.load('oauth2', 'v2', callback);
};
