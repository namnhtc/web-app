angular.module("template/topbar/top-bar-dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/topbar/top-bar-dropdown.html",
    "<ul class=\"dropdown\" ng-transclude></ul>");
}]);
