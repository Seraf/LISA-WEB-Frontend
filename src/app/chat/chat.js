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
angular.module( 'lisa-frontend.chat', [
  'ui.router',
  'gettext'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider, gettext ) {
  $stateProvider.state( 'chat', {
    url: '/chat',
    views: {
      "main": {
        controller: 'ChatCtrl',
        templateUrl: 'chat/chat.tpl.html'
      }
    },
    data: {
        pageTitle: gettext('Chat'),
        ncyBreadcrumbLabel: gettext('<i class="fa fa-chat"></i> Chat')
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ChatCtrl', ['$location', '$scope', function ChatController( $location, $scope ) {
    var $port = '';
    if($location.port()){
        $port = ':' + $location.port();
    }

    var sock = new SockJS('http://' + $location.host() + $port + '/websocket');

    $scope.messages = [];
    $scope.sendMessage = function() {
        var text = '{"body": "' + $scope.messageText + '", "type": "chat", "from": "Lisa-Web", "zone": "WebSocket"}';
        sock.send(text);
        $scope.messages.push({'body':$scope.messageText, 'class': 'message-me'});
        $scope.messageText = "";
    };

    sock.onmessage = function(e) {
        var oResponse = angular.fromJson(e.data);
        $scope.messages.push({'body':oResponse.body, 'class': 'message-lisa'});
        $scope.$apply();
    };

    $scope.isopen = true;


}])
;

