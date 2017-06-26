angular.module('minhasDiretivas', [])
	.directive('meuPainel', function() {

		//Este arquivo é para uma tag chamada <meu-painel></meu-painel>

		var ddo = {};

		ddo.restrict = "AE"; //ddo é directive definition object usado para criar tags no html
        //A significa que ela pode ser usada com atributo e E como elemento pode colocar uma só se quiser
        ddo.transclude = true; //se caso eu queira charregar os filhos tambem que contem na tag exemplo um img de uma div


		ddo.scope = {
            titulo: '@' //titulo do html @titulo
        };

        ddo.templateUrl = 'js/directives/meu-painel.html'; //quando a tag for busca onde ela vai ler a estrutura nesse caso ela vai busca o mepainel.html

		return ddo;
	}).directive('minhaFoto',function(){ //criando mais uma tag
		
		var ddo = {};

		ddo.restrict = "AE";

		ddo.scope = {
			titulo:'@', //não esquecer dessa virgula se caso tiver algo para agrecentar antes de fechar o corpo
			url:'@'
		};

		ddo.template = '<img class="img-reponsive center-block" src="{{url}}" alt="{{titulo}}"></img>';//nesse caso ele irá cria uma imagen no html

		return ddo;
	}).directive('meuBotaoPerigo', function() {
		var ddo = {};
		ddo.restrict = "E";

		ddo.scope = {
			nome:'@',
			acao:'&' //expreção para ser avaliada fazendo que acao(foto) não execute como uma string e sim como uma acao
		};

		ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>';

		return ddo;
	}).directive('meuFocus',function() {
		var ddo = {};
		ddo.restrict = "A";

		ddo.link = function(scope,element) {//essa função link nos dá acesso a minulação do DOM
			scope.$on('fotoCadastrada',function() {//se evento fotoCadastrada for disparado ele irá execultar esse função
				element[0].focus();
			});
		}

		return ddo;

	}).directive('meusTitulos',function() {
		
		var ddo = {};
		ddo.restrict = "E";

		ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';//templade que será inserido a cada rodada de um loop
		ddo.controller = function($scope,recursoFoto) {
			recursoFoto.query(function(fotos) {
				$scope.titulos = fotos.map(function(foto) {//A função map itera sobre nossa lista fornecendo acesso ao elemento da iteração no seu parâmetro. 
					return foto.titulo;//retornando somente os titulos da fotos
				});
			});
		};
		return ddo;
	});