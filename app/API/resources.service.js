import contracts from './contracts';

export default function Resources($resource) {
  'ngInject'

  const userInfo = $resource(contracts.userInfo, {}, {
    get: {method: 'GET', cache: true}
  });

  const contactOne = $resource(contracts.contactOne, {}, {
    get: {method: 'GET'}
  });

  const contactTwo = $resource(contracts.contactTwo, {}, {
    get: {method: 'GET'}
  });



  angular.extend(this, {
    userInfo,
    contactOne,
    contactTwo
  });
}

