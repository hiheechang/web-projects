import { response } from "express";

console.log("testing client.js")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const API_URL = 'http://localhost:5000/stocks'


loadingElement.style.display = 'none';


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    console.log("form was submitted");// url changed
    
    form.style.display = 'none';
    loadingElement.style.display = '';
    
    const stock = {
        name,
        content
    };
    //console.log(stock);

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(stock),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdStock => {
            console.log(createdStock);
        })   
})



