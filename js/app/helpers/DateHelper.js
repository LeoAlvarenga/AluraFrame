class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciada');
    }

    static dataParaTexto(data) {
        console.log(data);
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
      }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Deve estar no formato yyyy-mm-dd')
        //Data está retornando errado, bug será consertado nos próximos commits
        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));

    }
}