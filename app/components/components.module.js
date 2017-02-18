import angular from 'angular';

import mainContextModule from './mainContext/mainContext.module';


angular.module('iot.components', [
  mainContextModule,
]);

export default angular.module('iot.components')
.name;
