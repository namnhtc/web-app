angular.module("template/topbar/toggle-top-bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/topbar/toggle-top-bar.html",
    "<li class=\"toggle-topbar menu-icon\" ng-transclude></li>");
}]);
