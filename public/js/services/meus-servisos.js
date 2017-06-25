angular.module('meusServisos', ['ngResource']).factory('recursoFoto', function ($resource) {

    //Nesse arquivo ele vai fazer que eu não instacie toda hora o $resource nos arquivos fazendo como se fosse uma função

    return $resource('/v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });

}).factory('cadastroDeFoto', function (recursoFoto, $q,$rootScope) {//$q seria o nosso queue

    var service = {};
    var evento = 'fotoCadastrada';

    service.cadastrar = function (foto) {//cadastrar recebe uma foto que irá retornar uma promisse porque retorna uma $q
        return $q(function (resolve, reject) {
            if (foto._id) {//se foto.id for preenchida entra aki

                recursoFoto.update({ fotoId: foto._id }, foto, function () {//caso seja um update que eu fiz na foto entra aki
                    $rootScope.$broadcast(evento); //pegando o focado e quando ele for chamado ele irá execultar uma uma diretiva que etá pronta para receber a chamada
                    resolve({
                        mensagem:'Foto' + foto.titulo + 'Atualizada com Sucesso!!',
                        inclusao: false //objeto que será enviado caso seja um update

            });
                }, function (erro) {//caso apresentar um erro no if
                    console.log(erro);
                    reject({
                        mensagem: 'Infelismente não foi possivel alterar a foto' + foto.titulo });
                });

            } else {//caso a foto seja nova e precisa ser salva
                recursoFoto.save(foto,function() {
                    $rootScope.$broadcast(evento); //pegando o focado e quando ele for chamado ele irá execultar uma   diretiva que etá pronta para receber a chamada
                    resolve({//o resolve tem que passar um objeto para ele
                        mensagem: 'Foto' + foto.titulo + 'Incluída com Sucesso!!',
                        inclusao: true
                    }); 
                }, function(erro) { //caso apresente um erro no else
                    console.log(erro);
                    reject({
                        mensagem: 'Infelismente não foi possivel salvar a foto' + foto.titulo });
                });
            }

        });
    };

        return service;

});