import { HttpServices } from "./HttpServices";
import { ConnectionFactory } from "./ConnectionFactory";
import { NegociacaoDao } from "../dao/NegociacaoDao";
import { Negociacao } from "../models/Negociacoes";

export class NegociacaoService {

    constructor() {

        this._http = new HttpServices();
    }

    obterNegociacoesDaSemana() {
        //lendo as informações da api que está na pasta server
        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                })
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/anterior').then(negociacoes => {
                resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana anterior');
            });
        });

    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/retrasada').then(negociacoes => {
                resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana retrasada');
            });
        });

    }
    obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
	} 

    cadastra(negociacao) {

        return ConnectionFactory.getConnection().then(connection => {

            new NegociacaoDao(connection).adiciona(negociacao).then(() => {
                this._mensagem.texto = "Negociação adicionada com sucesso";
            }).catch(() => { throw new Error('Não foi possível adicionar a negociação') });
        });

    }

    lista() {

        return ConnectionFactory.getConnection().then((connection) => {
            new NegociacaoDao(connection).listaTodos();
        }
        ).catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações');
        });
    }

    apaga() {

        return ConnectionFactory
            .getConnection().then(connection => {
                new NegociacaoDao(connection).apagaTodos().then(() => {
                    'Negociações apagadas com sucesso';
                }
                ).catch(erro => {
                    console.log(erro);
                    throw new Error("Não foi possível apagar as Negociações");
                })
            });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente => 
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }

}
