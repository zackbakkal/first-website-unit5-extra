/**
 * File Name: addlavaclay.js
 * Author: Zakaria Bakkal
 * Version: 4
 * Date: April 07, 2019
 * Description: This script handles adding Lava Clay item to the cart
 */

// Instantiate an object of Product type
var clay = new Product("Lava Clay", 14.99);

/*
* This function loads after the page finishes loading
*/
function start() {

	if (localStorage.getItem("mycart") == null) {
		localStorage.setItem("mycart", JSON.stringify((new Cart()).data));
		document.getElementById("carttotalqty").innerHTML = 0;
	} else {
		var qty = localStorage.getItem("carttotalqty");
		document.getElementById("carttotalqty").innerHTML = qty;
	}

	// Retrieve the addarganoil element amd add an event listner when it is clicked
	var addLavaClayButton = document.getElementById("addlavaclay");
	addLavaClayButton.addEventListener("click", addLavaClay, false);

}

/*
* Add lava clay item to the localStorage
*/
function addLavaClay() {

	indicateItemAdded();

	var myCart = new Cart();
	myCart.loadCart(JSON.parse(localStorage.getItem("mycart")));

	myCart.addProduct(clay);

	// used to show cart total quantity next to the cart icon
	localStorage.setItem("carttotalqty", myCart.totalQty);

	document.getElementById("carttotalqty").innerHTML = myCart.totalQty;
}

function indicateItemAdded() {

	// create an indicator element, looks like a circle with a
	// +1 inside it
	var indicator = document.createElement("span");
	indicator.style.position = "absolute";
	indicator.style.display = "inline";
	indicator.style.width = "auto";
	indicator.style.height = "auto";
	indicator.style.borderRadius = "50px";
	indicator.style.backgroundColor = "#E65100";
	indicator.style.fontWeight = "bold";
	indicator.style.margin = "0";
	indicator.style.padding = "0";
	indicator.style.transition = "all 2s ease-in";
	indicator.innerHTML = "+1";
	indicator.style.border = "solid 1px black";

	// Retrieve the main element of the page
	var addButton = document.getElementById("addbutton");
	// insert the indicator before the 2nd child element in main
	// which is the suggestions
	addButton.append(indicator);

	// change the indicator class that makes it move upwards.
	// setting a time out will make the script wait until the 
	// indicator element is created.
	setTimeout(function () {
		indicator.className = "indicatorup";
	});

	// wait 2 seconds then remove the indicator element
	setTimeout(function () {
		addButton.removeChild(addButton.childNodes[1]);
	}, 2000);
}

window.addEventListener("load", start, false);