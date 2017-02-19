import template from './main.html';

function MainContext(Resources, $q, $interval) {
  'ngInject';
  var vm = this;

  vm.user = {};
  vm.sensors = [];
  vm.noSensors = false;
  vm.loading = true;
  vm.error = false;

  vm.one={};
  vm.two={};
  vm.fire={};
  vm.energy = {
    title: '[Hack gas, liquid and electricity meter]',
    model: 'EnergyCam',
    data: 2147682816
  }

  initComponent();

  ////

  function initComponent() {
    Resources.userInfo.get().$promise.then((userInfo) => {
      vm.user.username = userInfo.username;
      vm.user.name = userInfo.firstname + ' ' + userInfo.lastname;
      vm.user.email = userInfo.email;

      getSensors();
    }).catch((err) => {
      vm.loading = false;
      vm.error = true;
      console.log(err)
    });
  }

  function getSensors() {
    let contacts = $interval(() => {
      let one = Resources.contactOne.get().$promise.then(d => {
        return {one: d}
      });
      let two = Resources.contactTwo.get().$promise.then(d => {
        return {two: d}
      });
      let three = Resources.contactFire.get().$promise.then(d=> {
        return {fire: d}
      });

      $q.all([one, two, three]).then((data) => {
        vm.loading = false;

        angular.forEach(data, function(d) {
          if (d.one) {
            vm.one = {
              title: d.one.description,
              model: d.one.model,
              state: !!d.one.state.data[0],
              isEmpty: ((d.one.state) ? false : true)
            }
          }

          if (d.two) {
            vm.two = {
              title: d.two.description,
              model: d.two.model,
              state: !!d.two.state.data[0],
              isEmpty: ((d.two.state) ? false : true)
            }
          }

          if (d.fire) {
            vm.fire = {
              title: d.fire.description,
              model: d.fire.model || '',
              fire: d.fire.state.data[0],
              t: d.fire.state.data[6],
              isEmpty: ((d.fire.state) ? false : true)
            }
          }
        })
      }, err => {
        vm.loading = false;
        vm.error = true;
        $interval.cancel(contacts)
        console.log(err.status, err.statusText)
      })
    }, 500)
  }
};

export default {
  template,
  controller: MainContext,
  controllerAs: 'vm'
};
