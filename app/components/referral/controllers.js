/**
 * Referral Controllers
 */

(function (angular) {
  'use strict';
  var PlayerView = function () {
    this.index = 0;
    // this.items = items;
  }

  var Singleton = (function () {
    var instance,
      view;

    function createInstance() {
      var object = new PlayerControl();
      return object;
    }

    function createView() {
      var view = new PlayerView();
      return view;
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      },
      getView: function () {
        if (!view) {
          view = createView();
        }
        return view;
      }
    };
  })();

  PlayerView.prototype = {
    first: function () {
      this.reset();
      return this.index;
    },
    next: function () {
      this.index = this.index + 1;
      return this.index;
    },
    hasNext: function () {
      return this.index < this.items.length - 1;
    },
    hasPrev: function () {
      return this.index > 0;
    },
    prev: function () {
      this.index = this.index - 1;
      return this.index;
    },
    reset: function () {
      this.index = 0;
      return this.index;
    },
    last: function () {
      this.index = this.items.length - 1;
      return this.index;
    },
    current: function () {
      return this.items[this.index];
    },
    each: function (callback) {
      for (var item = this.first(); this.hasNext(); this.next()) {
        callback(this.current());
      }
    },
    goTo: function (index) {
      this.index = index;
      return this.index;
    },
    init: function (items) {
      this.items = items;
    }
  }

  Singleton.getView().init([
    'referral-body-one',
    'referral-body-two',
    'referral-body-three'
  ]);

  function ReferralCtrl($scope, service, $location, Profile, $localStorage, $modal) {
    Singleton.getView().reset();
    if (service.status == 1) {
      $location.path('/referral/profile');
    }

    $scope.openSubmitCodeModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'components/referral/_submitcode_modal.html',
        controller: 'SubmitCodeModalInstanceCtrl',
        windowClass: 'submit-code-modal',
        backdrop: 'static'
      });
    };

    getAuthed();
    $scope.$on('event:auth-loginConfirmed', function () {
      getAuthed();
      service.getStatus().then(function (response) {
        var joined = response.data.record.code;
        var notFilledReferralCode = (joined && response.data.record.can_submit_code);
        if (!joined || notFilledReferralCode) {
          $scope.openSubmitCodeModal();
        }
      });
    });

    $scope.$on('event:auth-logoutConfirmed', function () {
      $scope.isAuthed = false;
    });

    function getAuthed() {
      Profile.getUser();
      $scope.isAuthed = Profile.user.auth_token ? true : false;
    }
  }

  function ReferralHeaderCtrl($scope, service) {}

  function ReferralBodyCtrl($scope, service, EcoTracker, $localStorage) {
    $scope.$on('referral:body-next', function () {
      if (Singleton.getView().hasNext()) {
        var index = Singleton.getView().next();
        $scope.directive = Singleton.getView().current();
        EcoTracker.campaignTrack('Web 1.0.2 click event track', {
          "campaign": 'REFERRAL',
          "screen": index + 1,
          "code_channel": $localStorage.auth.user ? 'ADS_E8' : 'ADS_NON_E8'
        });
      };
    });
    $scope.$on('referral:body-prev', function () {
      if (Singleton.getView().hasPrev()) {
        var index = Singleton.getView().prev();
        $scope.directive = Singleton.getView().current();
        EcoTracker.campaignTrack('Web 1.0.2 click event track', {
          "campaign": 'REFERRAL',
          "screen": index + 1,
          "code_channel": $localStorage.auth.user ? 'ADS_E8' : 'ADS_NON_E8',
          "back": "true"
        });
      };
    });
    $scope.$on('referral:body-last', function () {
      var index = Singleton.getView().last();
      $scope.directive = Singleton.getView().current();
      EcoTracker.campaignTrack('Web 1.0.2 click event track', {
        "campaign": 'REFERRAL',
        "screen": index + 1,
        "code_channel": $localStorage.auth.user ? 'ADS_E8' : 'ADS_NON_E8',
        "skip": "true"
      });
    });

    $scope.view = {
      intro: true,
      price: false,
      payment: false
    };
    $scope.displayIntro = function () {
      $scope.view = {
        intro: true,
        price: false,
        payment: false
      };
    };
    $scope.displayPriceScholarship = function () {
      $scope.view = {
        intro: false,
        price: true,
        payment: false
      };
    };
    $scope.displayPaymentMethod = function () {
      $scope.view = {
        intro: false,
        price: false,
        payment: true
      };
    };
  }

  function ReferralFooterCtrl($scope, service, $location, Profile) {

    function next() {
      // PlayerControl.getInstance().next();
      $scope.$broadcast('referral:body-next');
    }

    function gotoLast() {
      // PlayerControl.getInstance().gotoLast();
      $scope.$broadcast('referral:body-last');
    }

    function gotoFirst() {
      // PlayerControl.getInstance().gotoFirst();
      $scope.$broadcast('referral:body-first');
    }

    function prev() {
      $scope.$broadcast('referral:body-prev');
    }

    function gotoProfile() {
      service.joined();
      $location.path('/referral/profile');
    }

    $scope.control = {
      next: next,
      prev: prev,
      last: gotoLast,
      first: gotoFirst,
      gotoProfile: gotoProfile
    };
  }

  function ReferralEntercodeCtrl($scope, ReferralService, profile, $location, $modal) {
    if (!profile.user.auth_token) {
      $location.path('/');
    } else {
      profile.getProfileDetail().then(function () {
        $scope.isReferral = profile.detail.referral_user || '';
        $scope.userName = profile.detail.referral_user;
        $scope.user = profile.detail || {};
        $scope.combo_days = profile.detail.combo_days;
        $scope.expChart = {
          labels: profile.detail.exp_chart.days,
          datasets: [{
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "#848484",
            pointColor: "#810c15",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: profile.detail.exp_chart.exp
          }]
        };
      }).then(function () {
        ReferralService.getStatus().then(function (res) {
          $scope.code = res.data.referral_code || 0;
          $scope.invite_count = res.data.record.invited_count || 0;
          $scope.FBShare.shareData = res.data.referral_code;
        });
      });
    }

    $scope.FBShare = {
      shareType: 'referral-code'
    };

    $scope.readme = function (data) {
      var modalInstance = $modal.open({
        windowClass: 'readme-modal',
        controller: 'ReferralReadmeCtrl',
        templateUrl: 'components/referral/_readme-' + data + '.html'
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };
    $scope.notiCode =
      "(Nếu bạn quên chưa nhập code chia sẻ từ bạn bè, hãy điền ngay tại đây để được tính là đã mời thêm 1 bạn)";
    $scope.submitCode = function () {
      // console.log()
      ReferralService.submitCode({
        referral_code: $scope.refCode
      }).then(function (res) {
        $scope.error = '';
        $scope.notiCode = '';
        $scope.isReferral = res.data.code || '';
        $scope.userName = res.data.referral_user || '';
      }, function (res) {
        $scope.error = res.data.message;
        $scope.notiCode = ""
      });
    };
    $scope.verifyRewards = function () {
      ReferralService.verifyRewards().then(function (res) {
        (function () {
          var modalInstance = $modal.open({
            // template: '<div verifyRewards-modal></div>',
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      }, function (res) {
        (function () {
          var modalInstance = $modal.open({
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards_Error.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data.message;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      });
    }

    $scope.slide = slider($scope);
  }

  function slider($scope) {
    var slide = new PlayerView();
    slide.init([{
      text: 'Xem Code chia sẻ của bạn tại màn hình trang chủ',
      url: 'assets/img/referral/campaign_guide_1.png'
    }, {
      text: 'Gửi Code chia sẻ cho bạn bè của mình bằng rất nhiều hình thức:',
      url: 'assets/img/referral/campaign_guide_2.png'
    }, {
      text: 'Hãy nhớ nhắc bạn của bạn nhập code vào đúng vị trí',
      url: 'assets/img/referral/campaign_guide_3.png'
    }, {
      text: 'Luôn nhớ cập nhật số bạn đã mời của bản thân',
      url: 'assets/img/referral/campaign_guide_4.png'
    }, {
      text: 'Học liên tục 3 ngày để hình thành thói quen chăm chỉ học bài!',
      url: 'assets/img/referral/campaign_guide_5.png'
    }, {
      text: 'Khi đã đủ điều kiện, lựa chọn Xác minh để có thể nhận ngay học bổng của bạn!',
      url: 'assets/img/referral/campaign_guide_6.png'
    }]);
    slide.reset();
    $scope.images = slide.items;
    $scope.image = slide.current().url;
    $scope.indexActive = 0;
    $scope.text = slide.items;
    $scope.text = slide.current().text;

    function next() {
      if (slide.hasNext()) {
        $scope.indexActive = slide.next();
      } else {
        $scope.indexActive = slide.reset();
      }
      $scope.image = slide.current().url;
      $scope.text = slide.current().text;
    }

    function prev() {
      if (slide.hasPrev()) {
        $scope.indexActive = slide.prev();
      } else {
        $scope.indexActive = slide.last();
      }
      $scope.image = slide.current().url;
      $scope.text = slide.current().text;
    }

    function goTo(index) {
      $scope.indexActive = slide.goTo(index);
      $scope.image = slide.current().url;
      $scope.text = slide.current().text;
    }

    return {
      next: next,
      prev: prev,
      goTo: goTo
    }
  }

  function ReferralReadmeCtrl($scope, data) {
    $scope.slide = slider($scope);
  }

  function CampaignVerifyCodeCtrl($scope, ReferralService, Profile) {
    $scope.submitCode = function () {
      ReferralService.submitCode({
        referral_code: $scope.refCode
      }).then(function (res) {
        $scope.error = '';
        $scope.isReferral = res.data.code || '';
        $scope.userName = res.data.referral_user || '';
      }, function (res) {
        $scope.error = res.data.message;
      });
    };
    $scope.$watch('profileDetail', function () {
      if ($scope.profileDetail) {
        $scope.isReferral = Profile.detail.referral_user || '';
        $scope.userName = Profile.detail.referral_user;
      }
    });
  }

  function SubmitCodeModalInstanceCtrl($scope, $modalInstance, ReferralService) {
    $scope.error = '';
    $scope.referral = {
      code: '',
      username: '',
      hasCode: false
    };
    $scope.submitCode = function () {
      ReferralService.submitCode({
          referral_code: $scope.referral.code
        })
        .then(function (response) {
          $scope.referral.hasCode = true;
          $scope.referral.username = response.data.referral_user;
          $scope.error = '';
        }, function (response) {
          $scope.error = response.data.error || response.data.message;
        });
    };

    $scope.close = function () {
      $modalInstance.close();
    }
  }

  angular.module('referral.controllers', [])
    .controller('ReferralCtrl', ['$scope', 'ReferralService', '$location', 'Profile',
      '$localStorage', '$modal',
      ReferralCtrl
    ])
    .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
    .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', 'EcoTracking',
      '$localStorage',
      ReferralBodyCtrl
    ])
    .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', '$location', 'Profile',
      ReferralFooterCtrl
    ])
    .controller('ReferralEntercodeCtrl', ['$scope', 'ReferralService', 'Profile', '$location',
      '$modal',
      ReferralEntercodeCtrl
    ])
    .controller('ReferralReadmeCtrl', ['$scope', ReferralReadmeCtrl])
    .controller('CampaignVerifyCodeCtrl', ['$scope', 'ReferralService', 'Profile',
      CampaignVerifyCodeCtrl
    ])
    .controller('SubmitCodeModalInstanceCtrl', ['$scope', '$modalInstance', 'ReferralService',
      SubmitCodeModalInstanceCtrl
    ]);
})(window.angular);