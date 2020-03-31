class NegociacaoController {

    constructor() {

        //imitando o JQuery, jogando o querySelector dentro de $ e dando o bind em document, para saber em que contesto o querySelector está atuando
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }

    adiciona(event) {
        event.preventDefault();

        console.log(this._inputData.value.split('-').map((item, indice) => {
            if(indice == 1) return item - 1;
            return item;
        }));

        //Data está retornando errado, bug será consertado nos próximos commits

        let data = new Date(this._inputData.value.split('-').map((item, indice) => {
            if(indice == 1) return item - 1;
            return item;
        }));

        console.log(data);

        let negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);

        console.log(negociacao);
    }

}