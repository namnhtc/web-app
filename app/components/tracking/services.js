(function (angular, localStorage) {
  'use strict';

  function MemoTracking($http, $q, $localStorage, APP_VERSION) {
    var BASE_URL = 'http://services.memo.edu.vn/trackings/track';
    var tracker = {};

    tracker.track = function (eventName, data, callback) {
      var deferred = $q.defer();
      var requestData = {
        event_name: 'Web ' + APP_VERSION + ' ' + eventName,
        user_id: $localStorage.auth.user._id,
        unique_id: localStorage.eco_user ? JSON.parse(localStorage.eco_user).user_id : ''
      };

      $http.post(BASE_URL, requestData, {
          ignoreLoadingBar: true
        })
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };
    return tracker;
  }

  function EcoTracking($http, $q, $routeParams, $cookies, $localStorage) {
    var BASE_URL = 'http://eco-tracking.memo.edu.vn';
    var tracker = {};
    var isCalled = 0;
    var httpConfig = {
      ignoreLoadingBar: true
    };

    tracker.init = function () {
      if (isCalled < 1) {
        tracker.createFrame();

        if (!$localStorage.eco_user) {
          tracker.getTrackingCookie();
        } else {
          tracker.track('Enter page', {});
        }

        isCalled += 1;
      }
    };
    tracker.createFrame = function () {
      var ifrm = document.createElement('iframe');
      ifrm.setAttribute('src', BASE_URL + '/tracking_frame/index');
      ifrm.setAttribute('style', 'display:none;width:0px;height:0px;');
      document.body.appendChild(ifrm);
      return ifrm;
    };

    tracker.getTrackingCookie = function () {
      window.addEventListener('message', function (msg) {
        if (msg.origin !== BASE_URL) return;

        $cookies.eco_uuid = msg.data;
        var data = {
          cookie: $cookies.eco_uuid
        };

        tracker.getUserId(data);
      }, false);
    };

    tracker.getUserId = function (data, callback) {
      data.name = "Enter page";
      data.browsing_domain = document.URL;
      data.referrer_url = document.referrer;

      return $http.post(BASE_URL + '/users/track', data, httpConfig)
        .success(function (response) {
          localStorage.eco_user = JSON.stringify(response);
          if (callback instanceof Function) callback(response);
        })
        .error(function (response) {});
    };

    tracker.track = function (eventName, data, callback) {
      // data = {name: eventName, cookie: eco_uuid}
      var user = JSON.parse(localStorage.eco_user);

      var requestData = {
        name: eventName,
        cookie: $cookies.eco_uuid,
        user_id: user.user_id,
        browsing_domain: document.URL,
        referrer_url: document.referrer,
        submitted_form_data: JSON.stringify(data)
      };

      $http.post(BASE_URL + '/users/track', requestData, httpConfig)
        .success(function (response) {
          $cookies.eco_uuid = response;
          if (callback instanceof Function) callback(response);
        })
        .error(function () {});
    };

    tracker.campaignTrack = function (eventName, data, callback) {
      // data = {name: eventName, cookie: eco_uuid}
      var user = JSON.parse(localStorage.eco_user);
      var browsingDomain = document.URL;
      browsingDomain += browsingDomain.indexOf('?') > -1 ? '&' : '?';

      if ($localStorage.auth.user) {
        data.name = 'memo_' + $localStorage.auth.user._id;
      }

      if (data.skip) {
        browsingDomain += ('skip=' + data.skip + '&');
      }

      if (data.back) {
        browsingDomain += ('back=' + data.back + '&');
      }

      var requestData = {
        name: eventName,
        cookie: $cookies.eco_uuid,
        user_id: user.user_id,
        browsing_domain: browsingDomain + 'campaign=' + data.campaign + '&code_channel=' +
          data.code_channel +
          '&screen=' + data.screen,
        referrer_url: document.referrer,
        submitted_form_data: JSON.stringify(data)
      };

      $http.post(BASE_URL + '/users/track', requestData, httpConfig)
        .success(function (response) {
          $cookies.eco_uuid = response;
          if (callback instanceof Function) callback(response);
        })
        .error(function () {});
    };
    return tracker;
  }

  function MixpanelFactory() {
    var Mixpanel = {};
    var APP_VERSION = '1.0.2';
    var mixpanel = {
      identify: function () {},
      people: {
        set: function () {}
      },
      register: function () {},
      track: function () {}
    };

    Mixpanel.trackSignin = function (data) {
      mixpanel.identify(data.id);
      mixpanel.people.set(data);
      mixpanel.track('Web 1.0.2 signin');
    };

    Mixpanel.track = function (eventName, data) {
      eventName = "Web 1.0.2 " + eventName;
      mixpanel.track(eventName, data);
    };

    Mixpanel.track = function (eventName, data, callback) {
      eventName = "Web 1.0.2 " + eventName;
      mixpanel.track(eventName, data, callback);
    };
    Mixpanel.register = function (data) {
      // Register wrapper
      mixpanel.register(data);
    };
    return Mixpanel;
  }

  angular.module('tracking.services', ['ngCookies'])
    .factory('MemoTracking', ['$http', '$q', '$localStorage', 'APP_VERSION', MemoTracking])
    .factory('EcoTracking', [
      '$http', '$q', '$routeParams', '$cookies', '$localStorage', EcoTracking
    ])
    .factory('Mixpanel', MixpanelFactory);

})(window.angular, window.localStorage);