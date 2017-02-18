/* global process */
import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import io from 'socket.io-client';

import './assets/styles/index.less';

import appConfig from './index.config';
import appRoute from './index.route';
import appRun from './index.run';

import appComponents from './components/components.module';
import appApi from './API/api.module';

export default angular.module('iot', [
  ngResource,
  uiRouter,

  appComponents,
  appApi,
])
.config(appConfig)
.config(appRoute)
.constant('ENVIRONMENT', process.env.ENV_NAME)
.run(appRun)
.name;
