export default function($httpProvider, $stateProvider, $qProvider, $locationProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);
}
