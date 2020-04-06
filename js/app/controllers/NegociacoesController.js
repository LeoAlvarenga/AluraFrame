'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        //imitando o JQuery, jogando o querySelector dentro de $ e dando o bind em document, para saber em que contesto o querySelector está atuando
        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.texto = erro;
            });

            setInterval(function () {
                _this.importaNegociacoes();
            }, 2000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));

            this._service.cadastrar(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this3 = this;

            console.log("apaga");

            this._service.apaga().then(function (mensagem) {
                _this3._mensagem.texto = mensagem;
                _this3._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this4._listaNegociacoes.adiciona(negociacao);
                    _this4._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacoesController.js.map