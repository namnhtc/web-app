angular.module("template/topbar/top-bar-section.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/topbar/top-bar-section.html",
    "<section class=\"top-bar-section\" ng-transclude></section>");
}]);
