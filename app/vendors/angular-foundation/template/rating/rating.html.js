angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\">\n" +
    "  <i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\"\n" +
    "    ng-class=\"$index < val && (r.stateOn || 'fa-star') || (r.stateOff || 'fa-star-o')\"></i>\n" +
    "</span>\n" +
    "");
}]);
