class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
         //lendo as informações da api que está na pasta server
        
         let xhr = new XMLHttpRequest();

         xhr.open('GET', 'negociacoes/semana');
 
         xhr.onreadystatechange = () => {
             if(xhr.readyState == 4 && xhr.status == 200) {
                 cb(null, JSON.parse(xhr.responseText).map(obj=>new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
             } else {
                 console.log(hr.responseText);
                 cb('Não foi possível Obter as Negociações')
             }
         };
 
         xhr.send();
    }
}