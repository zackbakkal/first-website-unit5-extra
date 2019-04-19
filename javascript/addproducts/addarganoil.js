/**
 * File Name: addarganoil.js
 * Author: Zakaria Bakkal
 * Version: 3
 * Date: April 07, 2019
 * Description: This script handles adding Argan Oil item to the cart
 */

// Instantiate an object of Product type
var arganOil = new Product("Argan Oil", 24.99);

/*
* This function loads after the page finishes loading
*/
function start() {

	if (localStorage.getItem("mycart") == null) {
		localStorage.setItem("mycart", JSON.stringify((new Cart()).data));
		localStorage.setItem("carttotalqty", 0);
		document.getElementById("carttotalqty").innerHTML = 0;
	} else {
		var qty = localStorage.getItem("carttotalqty");
		document.getElementById("carttotalqty").innerHTML = qty;
	}

	// Retrieve the addarganoil element amd add an event listner when it is clicked
	var addArganButton = document.getElementById("addarganoil");
	addArganButton.addEventListener("click", addArganOil, false);

}

/*
* Add arganoil item to the localStorage
*/
function addArganOil() {

	indicateItemAdded();

	var myCart = new Cart();
	myCart.loadCart(JSON.parse(localStorage.getItem("mycart")));

	myCart.addProduct(arganOil);

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