export default function($httpProvider, $stateProvider, $qProvider, $locationProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(internalServerError);
    $qProvider.errorOnUnhandledRejections(false);
}

function  internalServerError($q, $timeout, $injector) {
    'ngInject';
    return {
        'responseError': function (rejection) {
            // if (rejection.status >= 500 && rejection.status < 600) {
            //     var toastr = $injector.get('toastr');
            //     toastr.error('Ошибка на сервере!');
            // }

            if (rejection.status == 401) {
                var state = $injector.get('$state')
                state.go('login');
            }

            return $q.reject(rejection);
        }
    };
}

