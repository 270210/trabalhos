angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto, cadastroDeFoto, $routeParams) {
    $scope.foto = {};
    $scope.mensagem = '';


    if ($routeParams.fotoId) {//caso a url seja para pegar um dado do banco de dados
        recursoFoto.get({ fotoId: $routeParams.fotoId }, function (foto) {
            $scope.foto = foto;
        }, function (erro) {
            console.log(erro);
            $scope.mensagem = "Não foi possivel editar a Foto"
        });
    }

    $scope.submeter = function () {//crinado a função submeter para ser usada no foto.html
        if ($scope.formulario.$valid) {//o formulário só vai entrar aqui se estiver valido   
            cadastroDeFoto.cadastrar($scope.foto)
                .then(function (dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao)
                        $scope.foto = {};

                })
                .catch(function (erro) {
                    $scope.mensagem = erro.mensagem;
                });
        }
    };
});