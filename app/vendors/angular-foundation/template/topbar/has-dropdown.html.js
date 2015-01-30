angular.module("template/topbar/has-dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/topbar/has-dropdown.html",
    "<li class=\"has-dropdown\" ng-transclude></li>");
}]);
