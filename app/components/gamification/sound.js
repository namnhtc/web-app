'use strict';

angular.module('gamification.sound', [])
    .factory('Sound', ['ngAudio', function(ngAudio) {
	var Sound = {};

	Sound.files = {
	    'correct': ngAudio.load('/assets/sound/sound-fx-correct.mp3'),
	    'fail': ngAudio.load('/assets/sound/sound-fx-fail.mp3'),
	    'finish': ngAudio.load('/assets/sound/sound-fx-finish.mp3'),
	    'heart_lost': ngAudio.load('/assets/sound/sound-fx-heart_lost.mp3')
	};

	Sound.playCorrectSound = function() {
	    Sound.files.correct.play();
	};

	Sound.playFailSound = function() {
	    Sound.files.fail.play();
	};

	Sound.playFinishSound = function() {
	    Sound.files.finish.play();
	};

	Sound.playHeartLostSound = function() {
	    Sound.files.heart_lost.play();
	};

	return Sound;
    }]);
