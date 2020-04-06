import { ListaNegociacoes } from "../models/ListaNegociacoes";
import { Mensagem } from "../models/Mensagem";
import { NegociacoesView } from "../views/NegociacoesView";
import { MensagemView } from "../views/MensagemView";
import {NegociacaoService} from '../services/NegociacaoServices';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacoes';

export class NegociacaoController {

    constructor() {

        //imitando o JQuery, jogando o querySelector dentro de $ e dando o bind em document, para saber em que contesto o querySelector está atuando
        let $ = document.querySelector.bind(document);

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

    _init() {

        this._service.lista().then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        }).catch(erro => {
            console.log(erro);
            this._mensagem.texto = erro;
        });

        setInterval(() => {
            this.importaNegociacoes();
        }, 2000);

    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));

        this._service.cadastra(negociacao).then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
        }).catch(erro => this._mensagem.texto = erro);

    }

    apaga() {

        console.log("apaga");

        this._service.apaga().then(mensagem => {
            this._mensagem.texto = mensagem;
            this._listaNegociacoes.esvazia();
        }).catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoes() {

        this._service.importa(this._listaNegociacoes.negociacoes).then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas';
        })).catch(erro => this._mensagem.texto = erro);

    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}