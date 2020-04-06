import { ProxyFactory } from "../services/ProxyFactory";

export class Bind {

    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, mode => view.update(model));

        view.update(model);

        return proxy;
    }
}