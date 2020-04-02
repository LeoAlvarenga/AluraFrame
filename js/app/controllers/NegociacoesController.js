class NegociacaoController {

    constructor() {

        //imitando o JQuery, jogando o querySelector dentro de $ e dando o bind em document, para saber em que contesto o querySelector está atuando
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind (new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');

    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value));

        this._mensagem.texto= "Negociação adicionada com sucesso";

        this._limpaFormulario();
        
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Neogociações apagadas com sucesso';
    }
    
    importaNegociacoes() {

       let service = new NegociacaoService();

       service.obterNegociacoesDaSemana((err, negociacoes) =>{
           
        if(err) {
               this._mensagem.texto = err;
               return;
           }

           negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
           this._mensagem.texto = 'Negociações importadas com sucesso';


       });
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}