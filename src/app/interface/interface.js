/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'lisa-frontend.interface', [
  'ui.router',
  'SessionManager',
  'ConfigurationManager',
  'restangular',
  'gettext',
  'growlNotifications'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'UserDropdownCtrl', function UserDropdownCtrl( $scope, $Session, $Configuration, $modal) {

  $scope.Session = $Session;
  $scope.Configuration = $Configuration.configuration;

  $scope.profile = function () {
    var modalInstance = $modal.open({
      templateUrl: 'interface/profile.tpl.html',
      controller: 'ProfileCtrl'
    });
  };
})

.controller( 'ProfileCtrl', function ProfileCtrl($scope, $modalInstance, Restangular, gettextCatalog, growlNotifications ) {

  $scope.submit = function () {
    console.log($scope.Session.User);
    $scope.Session.User.save();
    //$modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.regenerateAPIKey = function () {
    Restangular
    .one('user', $scope.Session.User.id).one('regenerateapikey')
    .get().then(function(response){
      if(response.apikey) {
        growlNotifications.add(gettextCatalog.getString('The API Key has been regenerated'), 'success');
        $scope.Session.User.apikey = response.apikey;
        $scope.Session.setApiKeyAuthHeader();
      } else {
        growlNotifications.add(gettextCatalog.getString('There was an error with the API Key'), 'error');
      }
    }, function(response) {
      console.error("Error retrieving user api.");
    });
  };
})
;