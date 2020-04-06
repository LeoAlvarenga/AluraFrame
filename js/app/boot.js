'use strict';

System.register(['./controllers/NegociacoesController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacoesController) {
      NegociacaoController = _controllersNegociacoesController.NegociacaoController;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map