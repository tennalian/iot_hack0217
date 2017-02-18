import template from './main.html';

function MainContext(Resources, $q) {
  'ngInject';
  var vm = this;

  vm.user = {};
  vm.sensors = [];
  vm.noSensors = false;
  vm.loading = true;
  vm.error = false;

  initComponent();

  ////

  function initComponent() {
    Resources.userInfo.get().$promise.then((userInfo) => {
      let one = Resources.contactOne.get().$promise;
      let two = Resources.contactTwo.get().$promise;

      $q.all([one, two]).then((data) => {
        vm.loading = false;

        vm.user.username = userInfo.username;
        vm.user.name = userInfo.firstname + ' ' + userInfo.lastname;
        vm.user.email = userInfo.email;

        if (!_.isEmpty(data)) {
          angular.forEach(data, function(d) {
            let item = {};
            item.title = d.description;
            item.model = d.model;
            moment.locale('ru');
            item.data = moment(d.time*1000).fromNow();
            item.state = !!d.state.data[0];

            vm.sensors.push(item);
          })
        } else {
          vm.noSensors = true;
        }
      }).catch(err => {
        vm.loading = false;
        vm.error = true;
        console.log(err)
      })
    }).catch((err) => {
      vm.loading = false;
      vm.error = true;
      console.log(err)
    });

    // let socketOne = io('http://37.46.129.213:8080/service/api/sensor/contact1');
    // socketOne.on()

  }
};

export default {
  template,
  controller: MainContext,
  controllerAs: 'vm'
};
