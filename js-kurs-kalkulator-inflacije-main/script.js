function inflationCalculator(){
	let rate = document.getElementById('inflationRate').value;
	let amount = document.getElementById('money').value;
	let years = document.getElementById('years').value;
	
	rate = parseFloat(rate);
	years = parseFloat(years);
	amount = parseFloat(amount);
	
	let result;
	let cnt = years;

	/*while(cnt>0){
		result = amount+(amount*(rate)/100);
		cnt--;
	}*/
	//----------------SA FOR PETLJOM-------------
	for(let i = 1; i<=years; i++){
		result = amount+(amount*(rate)/100);
	}
	result = result.toFixed(2);

	console.log(result);
	let newEl = document.createElement('div');
	newEl.classList = 'new-el';
	newEl.innerHTML = `</br><h3>Iznos ${amount}$ ce za ${years} godina  biti: ${result}$<h3>`;
	document.querySelector('.container').appendChild(newEl);
	

}
 