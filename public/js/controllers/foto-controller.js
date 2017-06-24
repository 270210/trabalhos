angular.module('alurapic').controller('FotoController', function ($scope, $http,$routeParams) {
    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){//caso a url seja para pegar um dado do banco de dados
        $http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function (foto) {
            $scope.foto = foto;
        })
        .error(function (erro){
            console.log(erro);
            $scope.mensagem = "Não foi possivel editar a Foto"
        })
    }



    $scope.submeter = function () {//crinado a função submeter para ser usada no foto.html
        if ($scope.formulario.$valid) {//o formulário só vai entrar aqui se estiver valido
            if ($scope.foto._id) {//nesse caso se o navegador enteder que for uma altualização ele irá fazer o codigo a seguir
                $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
                .success(function () {
                    $scope.mensagem = "A foto" + "" + $scope.foto.titulo + "" + "foi alterada com Sucesso!!!";
                })
                .error(function(erro){
                    console.log(erro);
                    $scope.mensagem = 'Não foi possivel alterar a foto' + $scope.foto.titulo;
                })
            } else {//caso o navegador entender que ao salvar for para incluir uma nova foto ele irá fazer o codigo a seguir
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
        }
    };
});