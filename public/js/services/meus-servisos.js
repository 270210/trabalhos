angular.module('meusServisos', ['ngResource']).factory('recursoFoto',function ($resource) {

    //Nesse arquivo ele vai fazer que eu não instacie toda hora o $resource nos arquivos

    return $resource('/v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });

});