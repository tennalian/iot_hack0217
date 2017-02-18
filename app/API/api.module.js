import angular from 'angular';
import Resources from './resources.service';

export default angular
  .module('iot.api', [])
  .service('Resources', Resources)
  .name;
