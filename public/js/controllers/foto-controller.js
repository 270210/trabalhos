angular.module('alurapic').controller('FotoController', function ($scope, $http) {
    $scope.foto = {};
    $scope.mensagem = '';
    $scope.submeter = function () {//crinado a função submeter para ser usada no foto.html
        if ($scope.formulario.$valid) {//o formulário só vai entrar aqui se estiver valido

            $http.post('v1/fotos', $scope.foto)//nesse bloco ele está colocando a foto no banco de dados 
                .success(function () {
                    $scope.foto = {};
                    $scope.mensagem = "Foto Cadastrada com Sucesso!!";
                })
                .error(function (erro) {//caso aconteça qualquer erro esse codigo íráa ser execultado
                    console.log(erro);
                    $scope.mensagem = "Não foi possivel cadastrar foto";
                })
        }
    };
});