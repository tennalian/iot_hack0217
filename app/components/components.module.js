import angular from 'angular';

import mainContextModule from './main/main.module';


angular.module('iot.components', [
  mainContextModule,
]);

export default angular.module('iot.components')
.name;
