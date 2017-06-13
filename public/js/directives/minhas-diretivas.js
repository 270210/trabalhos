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
	});