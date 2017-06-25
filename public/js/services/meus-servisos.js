angular.module('meusServisos', ['ngResource']).factory('recursoFoto', function ($resource) {

    //Nesse arquivo ele vai fazer que eu não instacie toda hora o $resource nos arquivos fazendo como se fosse uma função

    return $resource('/v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });

}).factory('cadastroDeFoto', function (recursoFoto, $q) {//$q seria o nosso queue

    var servico = {};

    servico.cadastrar = function (foto) {//cadastrar recebe uma foto que irá retornar uma promisse porque retorna uma $q
        return $q(function (resolve, reject) {
            if (foto.id) {//se foto.id for preenchida entra aki

                recursoFoto.update({ fotoId: foto._id }, foto, function () {//caso seja um update que eu fiz na foto entra aki
                    resolve({
                        mensagem:'Foto' + foto.titulo + 'Atualizada com Sucesso!!',
                        inclusão: false //objeto que será enviado caso seja um update

            });
                }, function (erro) {//caso apresentar um erro no if
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possivel alterar a foto' + foto.titulo });
                });

            } else {//caso a foto seja nova e precisa ser salva
                recursoFoto.save(foto,function() {
                    resolve({//o resolve tem que passar um objeto para ele
                        mensagem: 'Foto' + foto.titulo + 'Incluída com Sucesso!!',
                        inclusão: true
                    }); 
                }, function(erro) { //caso apresente um erro no else
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possivel salvar a foto' + foto.titulo });
                });
            }

        });
    };

        return servico;

});