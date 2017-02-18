import angular from 'angular';

export default function run($rootScope, $state, $templateCache) {
  'ngInject';

  $rootScope.currentUser = null;
  $rootScope.$state = $state;
}
