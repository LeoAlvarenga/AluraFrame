var stores = ['negociacoes'];
var version = 3;
var dbName = 'aluraframe';

var connection = null;

class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                
                ConnectionFactory._createStores(e.target.result);
            };
            
            openRequest.onsuccess = e => {
                
                resolve(e.target.result);
            };
            
            openRequest.onerror = e => {
                
                console(e.target.error);

                reject(e.target.error.name);
            };
        });
    }
    
    static _createStores(connection) {
        
        stores.forEach(store => {
    
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
    
            connection.createObjectStores(store, { autoIncrement: true });
        });
        
    }
}