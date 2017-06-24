angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto,$routeParams) {
    $scope.foto = {};
    $scope.mensagem = '';


    if($routeParams.fotoId){//caso a url seja para pegar um dado do banco de dados
        recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
            $scope.foto = foto;
        },function(erro) {
            console.log(erro);
            $scope.mensagem = "Não foi possivel editar a Foto"
        });
    }

    $scope.submeter = function () {//crinado a função submeter para ser usada no foto.html
        if ($scope.formulario.$valid) {//o formulário só vai entrar aqui se estiver valido
            if ($scope.foto._id) {//nesse caso se o navegador enteder que for uma altualização ele irá fazer o codigo a seguir
                recursoFoto.update({fotoId: $scope.foto._id},
                    $scope.foto,function() {
                        $scope.mensagem = "A foto" + "" + $scope.foto.titulo + "" + "foi alterada com Sucesso!!!";    
                    },function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possivel alterar a foto' + $scope.foto.titulo;           
                    });
            
            } else {//caso o navegador entender que ao salvar for para incluir uma nova foto ele irá fazer o codigo a seguir
                recursoFoto.save($scope.foto,function() {//nesse bloco ele está colocando a foto no banco de dados
                    $scope.foto = {};
                        $scope.mensagem = "Foto Cadastrada com Sucesso!!";
                },function(erro) {
                    console.log(erro);//caso aconteça qualquer erro esse codigo íráa ser execultado
                        $scope.mensagem = "Não foi possivel cadastrar foto";    
                }); 
            
            }
        }
    };
});