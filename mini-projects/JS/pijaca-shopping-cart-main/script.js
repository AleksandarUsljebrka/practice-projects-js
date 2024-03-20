let totalValue = 0;
function addToCart(element){
	let mainEl = element.closest('.single-item');
	let elementName = mainEl.querySelector('h3').innerText;
	let price = mainEl.querySelector('.price').innerText;
	let quantity = mainEl.querySelector('input').value;
	let cart = document.querySelector('.cart');
	let cartItems = cart.querySelector('.cart-items');
	let total = cart.querySelector('.total');
		
	price = price.substring(1);
	price = parseInt(price);

	quantity = parseInt(quantity);

	let newEl =document.createElement('div');
	newEl.classList = 'cart-single-item';
	
	
	if(quantity>0){
		newEl.innerHTML = `<h3>${elementName}</h3><p>$${price} x ${quantity} = $${price*quantity}</p></br>
							<button onClick="removeFromCart(this)">Ukloni</button>`
		cartItems.appendChild(newEl);

		totalValue += price*quantity;
		total.innerText = `Total: $${totalValue}`	
		
		element.setAttribute('disabled', 'true');
		element.innerText = "Dodato";

	}else{
		alert('Izaberi kolicinu!');
	}

}
function removeFromCart(element){
	let divToRemove = element.closest('.cart-single-item');
	//let parentDiv = document.querySelector('.cart-items');
	//parentDiv.removeChild(divToRemove);
	
	//----Smanjujemo totalPrice
	let total = document.querySelector('.total');
	let totalFromEl = divToRemove.querySelector('p').innerText;
	totalFromEl = parseInt(totalFromEl.split("= ")[1].substring(1));
	
	totalValue-= totalFromEl;
	total.innerText= `Total: $${totalValue}`;

	//----Pretrazujemo svo povrce i trzimo koje da azuriramo
	let elementName = divToRemove.querySelector('h3').innerText;
	let vegetabels = document.querySelectorAll('.single-item');
	vegetabels.forEach((vegEl)=>{
		if(vegEl.querySelector('.si-content h3').innerText === elementName){
			let button = vegEl.querySelector('button');
			button.innerText = "Dodaj";
			button.removeAttribute('disabled');
			
			vegEl.querySelector('.actions input').value = 0;
		}
	})
	//console.log(elementName);

	divToRemove.remove();

}