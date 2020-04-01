class NegociacaoController {

    constructor() {

        //imitando o JQuery, jogando o querySelector dentro de $ e dando o bind em document, para saber em que contesto o querySelector está atuando
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value));
        console.log(this._listaNegociacoes)
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();
        
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}