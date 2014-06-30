angular.module( 'lisa-frontend', [
  'templates-app',
  'templates-common',
  'lisa-frontend.dashboard',
  'lisa-frontend.about',
  'restangular',
  'SessionManager',
  'ui.router',
  'angular-loading-bar'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run () {

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | LISA' ;
    }
  });
})


;
