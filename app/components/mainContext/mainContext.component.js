import template from './mainContext.html';

function MainContext($state, $document, $window, $timeout, Resources, $http) {
  'ngInject';
  var vm = this;
  initComponent();

  ////

  function initComponent() {
    vm.user = {};
    vm.loading = true;
    Resources.userInfo.get().$promise.then((d) => {
      vm.user.username = d.username;
      vm.user.name = d.firstname + d.lastname;
      vm.user.email = d.email;
      vm.loading = false;
    }).catch(err => {
      console.log(err);
    });
  }
};

export default {
  template,
  controller: MainContext,
  controllerAs: 'vm'
};
