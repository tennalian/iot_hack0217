import contracts from './contracts';

export default function Resources($resource) {
  'ngInject'

  const userInfo = $resource(contracts.userInfo, {}, {
    get: {method: 'GET', cache: true}
  });

  angular.extend(this, {
    userInfo,
    user,
    login
  });
}

