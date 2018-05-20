var app = angular.module('controllers');

app.controller('AboutController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.$on('$ionicView.enter', function() {
    $rootScope.lastMainState = 'about';
    if (analytics) analytics.trackView('About');
  });

  $scope.openGithub = function() {
    analytics.trackEvent('About', 'Github Link');
    window.open('https://github.com/wongvincent/Hike');
  };

  document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var submitEmailButton = document.getElementById('submitEmailButton');

    submitEmailButton.disabled = true;
    submitEmailButton.innerText = 'Sending...';
    emailjs.sendForm('default_service', $rootScope.credentials.emailJsTemplateId, this, $rootScope.credentials.emailJsUser).then(function() {
      window.plugins.toast.showLongBottom('Email sent!');
      submitEmailButton.innerText = 'Send';
      submitEmailButton.disabled = false;
    }, function() {
      window.plugins.toast.showLongBottom('Failed to send Email');
      submitEmailButton.innerText = 'Send';
      submitEmailButton.disabled = false;
    });
  });
}]);