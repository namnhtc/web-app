'use strict';

angular.module('skill.directives', [])
  .directive('skillCell', function() {
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      template: '<div></div>'
    };
  })
    .directive('grammarCoBan1', function() {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-co-ban-1.html'
      };
    })
    .directive('grammarCoBan2', function() {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-co-ban-2.html'
      };
    })
    .directive('grammarDaiTuKhachQuan', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-khach-quan.html'
      };
    })
    .directive('grammarDaiTuSoHuu', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-so-huu.html'
      };
    })
    .directive('grammarDongTuThiQuaKhuHoanThanh', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-qua-khu-hoan-thanh.html'
      };
    })
    .directive('grammarGioiTu', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-gioi-tu.html'
      };
    })
    .directive('grammarNhungNhomTuThongDung', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-nhung-nhom-tu-thong-dung.html'
      };
    })
    .directive('grammarSoNhieu', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-so-nhieu.html'
      };
    })
    .directive('grammarTuHanDinh', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-tu-han-dinh.html'
      };
    })