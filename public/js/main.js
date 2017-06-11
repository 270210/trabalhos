angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute']).config(function ($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true);//usando as novas vantagens do html5 e tirando os sharp das url de padrão
                                      //caso o navegador não suporta ele irá usar o sharp padrão

    $routeProvider.when('/fotos', {
        templateUrl: 'partials/principal.html',
        controller: 'FotosController'
    });
    $routeProvider.when('/fotos/new', {
        templateUrl: 'partials/foto.html',
    });

    $routeProvider.otherwise({redirectTo: '/fotos'}); //nesse caso se o usuario entrar em uma pagina inexistente ele vai para essa
})