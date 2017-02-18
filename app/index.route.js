export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise(function($injector){
    $injector.invoke(['$state', function($state) {
      $state.go('main');
    }]);
  });

  $stateProvider
    .state('main', {
      url: '/',
      template: '<main-context></main-context>',
      ncyBreadcrumb: {
        skip: true
      }
    })
}
