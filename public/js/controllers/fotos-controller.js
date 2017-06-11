angular.module('alurapic').controller('FotosController', function($scope, $http) {
	
	$scope.fotos = [];
	$scope.filtro = '';

	$http.get('/v1/fotos')
	.success(function(retorno) {
		console.log(retorno);
		$scope.fotos = retorno; // não precisa fazer retorno.data
	})
	.error(function(erro) {
		console.log(erro);
	});

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