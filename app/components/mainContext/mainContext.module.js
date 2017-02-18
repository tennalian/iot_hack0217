import angular from 'angular';

import mainContext from './mainContext.component';

export default angular
  .module('ulsApp.main', [])
  .component('mainContext', mainContext)
  .name;