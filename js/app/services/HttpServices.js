class HttpServices {

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("Entrou Aqui resolve");
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        console.log(xhr.status);
                        console.log(xhr.readyState);

                        console.log("Entrou Aqui reject");
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }
}