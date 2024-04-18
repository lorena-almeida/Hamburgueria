let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
//Aqui, estamos selecionando elementos do usando document.querySelector() com as classes correspondentes.

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
}) // adicionam e removem a classe active ao corpo (body) da página quando os botões com as classes .shopping e .closeShopping são clicados, respectivamente.

//lista de objetos cada objeto tem seu respectivo id,nome, imagem e preço.
let products = [
    {
        id: 1,
        name: 'Prime Cheese Bacon',
        image: 'xbacon.jpg',
        price: 30
    },
    {
        id: 2,
        name: 'Prime Burguer',
        image: 'xburguer.jpg',
        price: 50
    },
    {
        id: 3,
        name: 'Prime Onion Rings Duplo',
        image: 'xonion-rings.jpg',
        price: 65
    },
    {
        id: 4,
        name: 'Batata Frita',
        image: 'batata-frita.jpg',
        price: 20
    },
    {
        id: 5,
        name: 'Anéis de Cebola',
        image: 'onion-rings.jpg',
        price: 32
    },
    {
        id: 6,
        name: 'Coca-Cola',
        image: 'coca-cola.jpg',
        price: 6
    }
];
let listCards  = [];
function initApp(){ // // Criação e inserção de elementos na lista
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="imagens/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">R$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adicionar ao carrinho</button>`;
        list.appendChild(newDiv);
    }) 
}
initApp();
//A função initApp() é chamada para inicializar a aplicação. Ela cria elementos HTML para cada produto na lista products e os insere na list.
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
} // Esta função é chamada quando o botão "Adicionar ao carrinho" é clicado. Ela adiciona o produto correspondente à lista listCards de produtos no carrinho e atualiza a quantidade para 1.

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{ // for each para que execute cada item do array (nossos 6 iten) 
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="imagens/${value.image}"/></div>
                <div>${value.name}</div>
                <div>R$${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = 'R$' + totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
} //Esta função é chamada quando os botões de "+" ou "-" são clicados no carrinho. Ela atualiza a quantidade e o preço do produto no carrinho de acordo com a ação do usuário.

function zerartotal() {
    total.textContent="R$0,00";
    listCards=[];
    reloadCard()
}