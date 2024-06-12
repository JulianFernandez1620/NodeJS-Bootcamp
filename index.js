const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./starter/modules/replaceTemplate');

//Server/////////////////
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);

//Templates
const overview_temp = fs.readFileSync(`${__dirname}/starter/templates/overview.html`,'utf-8');
const product_temp = fs.readFileSync(`${__dirname}/starter/templates/product.html`,'utf-8');
const card_temp = fs.readFileSync(`${__dirname}/starter/templates/card_template.html`,'utf-8');


//Creating the server
const server = http.createServer((req, res) => {
    const {query , pathname} = url.parse(req.url,true)
    //Overview Page /////////////////////////////////////////
    if (pathname === '/' || pathname === '/overview'){

        const cardHtml = dataObject.map(el => replaceTemplate(card_temp , el))
        const output = overview_temp.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.writeHead(200 , {
            'Content-type': 'text/html'
        });
        res.end(output);

    //Product Page /////////////////////////////////////////
    } else if (pathname === '/product'){
        res.writeHead(200 , {
            'Content-type': 'text/html'
        });
        const product = dataObject[query.id]
        const output = replaceTemplate(product_temp,product)
        res.end(output);

    //API //////////////////////////////////////////////    
    } else if (pathname === '/api') {
        res.writeHead(200 , {
            'Content-type': 'application/json'
        });
        res.end(data);
        
    //NOT FOUND ////////////////////////////////////
    } else {
        res.writeHead(404 , {                              // http status code
            'Puto' : 'el que lo lea'                                              // los headers que tendra el status code
        });  
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000,'127.0.0.1', () =>{
    console.log('Listening to request on port 8000');
})