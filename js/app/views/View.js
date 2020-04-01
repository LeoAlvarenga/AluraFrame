class View {

    constructor(elemento) {

        this._elemento = elemento;
    }

    _template(model) {
        throw new Error("Método template deve ser implementado na classe filha");
    }

    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}