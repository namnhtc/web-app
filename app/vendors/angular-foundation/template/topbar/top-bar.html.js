angular.module("template/topbar/top-bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/topbar/top-bar.html",
    "<nav class=\"top-bar\" ng-transclude></nav>");
}]);
