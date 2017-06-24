angular.module('alurapic').controller('FotosController', function($scope, $http) {
	
	//Este arquivo ele pega as imagens atraves do http.get e coloca dentro de um array

	$scope.fotos = [];//array
	$scope.filtro = '';//pegando o filtro e manipulando ele
	$scope.mensagem = '';

	$http.get('/v1/fotos')
	.success(function(retorno) {
		console.log(retorno);
		$scope.fotos = retorno; // não precisa fazer retorno.data
	})
	.error(function(erro) {
		console.log(erro);
	});

	//Na manipu

	$scope.remover = (foto)=>{
		$http.delete('v1/fotos/' + foto._id).success(function(){
			var indiceFoto = $scope.fotos.indexOf(foto);//pegando o indece da foto
			$scope.fotos.splice(indiceFoto,1);///removendo a foto que encontra-se na variavel indeceFoto e a quantidade que quero excluir
			$scope.mensagem = 'Foto' + " " + foto.titulo + " " + 'removida com Sucesso!!';
		}).error((erro)=>{
			console.log(erro);
			$scope.mensagem = 'Não foi possivel remover a ' + ' ' +  foto.titulo + ' ' + 'com Sucesso!!';
		})
	};

});

//OUTRO EXEMPLO

/*
    var promise = $http.get('v1/fotos');//o objeto $http ele pode não retornar oque queremos que no caso é v1/fotos então colocar-se promisse
    promise.then((retorno) => {
        $scope.fotos = retorno.data;//caso ele retorne ele irá fazer isso 
        console.log("funciona tambem");
    }).catch(function (error) {//caso ele não retorne
        console.log(error);
    });
});

*/