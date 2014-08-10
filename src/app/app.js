angular.module( 'lisa-frontend', [
  'SessionManager',
  'templates-app',
  'templates-common',
  'lisa-frontend.dashboard',
  'lisa-frontend.plugins',
  'lisa-frontend.interface',
  'restangular',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'growlNotifications',
  'ngSanitize'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('backend/api/v1');

  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "login": {
        controller: 'LoginController',
        templateUrl: 'interface/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });

  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run ($Session) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  $Session.refreshUser();

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $Session, $log) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $log.info("fromstate:",fromState);
    $log.info("tostate:",toState);
    $Session.refreshUser();
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | LISA' ;
    }
  });
})
;
