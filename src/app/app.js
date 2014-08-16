angular.module( 'lisa-frontend', [
  'SessionManager',
  'ConfigurationManager',
  'templates-app',
  'templates-common',
  'lisa-frontend.dashboard',
  'lisa-frontend.plugins',
  'lisa-frontend.interface',
  'lisa-frontend.chat',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'growlNotifications',
  'ngSanitize',
  'ui.ace',
  'restangular',
  'ncy-angular-breadcrumb',
  'gettext',
  'ngAnimate'
])

.config(function LisaConfig ( $stateProvider, $urlRouterProvider, RestangularProvider, $breadcrumbProvider) {
  $breadcrumbProvider.setOptions({
    templateUrl: 'interface/breadcrumb.tpl.html'
  });

  RestangularProvider.setBaseUrl('backend/api/v1');
  RestangularProvider.setRequestSuffix('?format=json');
  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
      var newResponse;
      if (operation === 'getList') {
          newResponse = response.objects;
          newResponse.metadata = response.meta;
      } else {
          newResponse = response;
      }
      return newResponse;
  });


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

.run( function run ($Session, $Configuration, gettextCatalog) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  $Session.refreshUser();
  $Configuration.getConfig();

  if ($Configuration.configuration) {
      gettextCatalog.setCurrentLanguage($Configuration.configuration.lang);
      gettextCatalog.debug = true;
  }

})

.controller( 'LisaCtrl', function LisaCtrl ( $scope, $location, $Session, $log) {
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
