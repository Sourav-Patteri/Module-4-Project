// Javascript Document

// accessing the JSON file using a XMLHttpRequest object
let requestURL = 'https://sourav-patteri.github.io/Module-4-Project/products.json';

//a callback function that access the information using jsonObj and adds product information to the web page
function displayProducts(jsonObj) {
    let products = jsonObj.products;
    let main = document.querySelector('main');
    let section = document.createElement('section');
    for (let i = 0; i < products.length; i++) {
        //create HTML elements dynamically for each product in the JSON Result object.
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let h4 = document.createElement('h4');
        let img = document.createElement('img');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        img.src = `https://sourav-patteri.github.io/Module-4-Project/img/${products[i].image}`;
        img.alt = `${products[i].name}`;
        h2.textContent = `${i+1}) ${products[i].name}`;
        p1.textContent = `Price - ${products[i].price}$`;
        h4.textContent = 'Details';
        p2.textContent = `${products[i].details}`;
        img.classList.add('h-25');
        img.classList.add('w-25');
        section.classList.add('d-flex');
        section.classList.add('flex-column');
        article.classList.add('p-3');
        article.classList.add('mt-2');
        article.append(h2);
        article.append(p1);
        article.append(h4);
        article.append(p2);
        article.append(img);
        section.append(article);
        main.append(section);
    }
}

//a function that accesses the information from the server using an XMLHTTPRequest (XHR) object with params for URL and callback function
function loadAsset(requestURL) {
    return new Promise(function(resolve, reject) {
        // executor
        //creating new XMLHttpRequest object, it will allow us to fetch data without a page refresh
        let request = new XMLHttpRequest();
        //opening a new request
        request.open('GET', requestURL);
        //response type
        request.responseType = 'json';

        request.onload = function() {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('JSON didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function() {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };
        // Send the request
        request.send();
    });
}

async function getProducts() {
    try {
        let productsPromise = await loadAsset(requestURL);
        displayProducts(productsPromise);
    } catch (e) {
        console.log(e);
    }

}

//invoking getProducts function
getProducts();