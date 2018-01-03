
//variabele om te bepalen of je aan het editen bent
var editing = false;

//storage voor adresgegevens
var addressBook = [];
/*
if(localStorage['addbook'] === undefined) {
	localStorage['addbook'] = [];
	console.log(addressBook);
} else { */
	var addressBook = JSON.parse(localStorage['addbook']);
	//console.log(addressBook)
	for (i = 0; i < addressBook.length; i++){
		addRow(addressBook[i].personName, addressBook[i].personAddress, addressBook[i].personPlace, addressBook[i].personPhone, addressBook[i].personEmail);
	}

function Person(name, address, place, phone, email) {
	this.personName = name;
	this.personAddress = address;
	this.personPlace = place;
	this.personPhone = phone;
	this.personEmail = email;
}

function clickAdressBook() {
	document.getElementById("adress-table").style.display = "block";
	document.getElementById("add-person").style.display = "none";
	editing = false;
}

function clickAddPerson() {
	document.getElementById("adress-table").style.display = "none";
	document.getElementById("add-person").style.display = "block";
}

//voegt een rij toe aan de tabel met de benodigde gegevens
function addRow(name, address, place, phone, email) {
	var table = document.getElementById("table");

	var row = table.insertRow(1);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);

	cell1.innerHTML = name;
	cell2.innerHTML = address;	
	cell3.innerHTML = place;
	cell4.innerHTML = phone;
	cell5.innerHTML = email;
	cell6.innerHTML = "<div class=edit onClick=editRow(this)>edit</div> - <div class=remove onClick=removeRow(this)>remove</div>";
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
        	//console.log(value);
            return i;
        }
    }
    return null;
}

//verwijdert een rij uit een tabel
function removeRow(element) {
	var row = element.closest('tr').rowIndex;
	var table = document.getElementById("table");
	//console.log(findObjectByKey(addressBook, "personName", table.rows[row].cells[0].innerHTML));

	if (editing == true) {
		addressBook.splice(findObjectByKey(addressBook, "personName", table.rows[row-1].cells[0].innerHTML) ,1);
		document.getElementById("table").deleteRow(row);
		localStorage['addbook'] = JSON.stringify(addressBook);
	} else {
		if (confirm("Are you sure you want to remove this person from the adress book?") == true) {
			console.log(findObjectByKey(addressBook, "personName", table.rows[row].cells[0].innerHTML));
			addressBook.splice(findObjectByKey(addressBook, "personName", table.rows[row].cells[0].innerHTML), 1);
			document.getElementById("table").deleteRow(row);
			
			
			//console.log(addressBook);
			localStorage['addbook'] = JSON.stringify(addressBook);
    	} else {}
    }
}

//creeert een nieuw persoon als object en gebruikt addRow om hem toe te voegen aan de tabel
function createPerson() {
	var formFirstName = document.getElementById("add-person-form").elements.namedItem("firstname").value + " " +
		document.getElementById("add-person-form").elements.namedItem("lastname").value;
	var formAddress = document.getElementById("add-person-form").elements.namedItem("address").value;
	var formPlace = document.getElementById("add-person-form").elements.namedItem("place").value;
	var formPhone = document.getElementById("add-person-form").elements.namedItem("phone").value;
	var formEmail = document.getElementById("add-person-form").elements.namedItem("email").value;
	
	var addition = new Person(formFirstName, formAddress, formPlace, formPhone, formEmail);
	
	addRow(addition.personName, addition.personAddress, addition.personPlace, addition.personPhone, addition.personEmail);
	
	document.addPersonForm.reset();

	if (editing == true) {
		removeRow(editElement);
		editing = false;
	}

	clickAdressBook();

	addressBook.push(addition);
	console.log(addressBook);
	localStorage['addbook'] = JSON.stringify(addressBook);
}

//opent een window waarin je persoonsgegevens kunt wijzigen
function editRow(element) {
	var row = element.closest('tr').rowIndex;
	var table = document.getElementById("table");

	var firstName = table.rows[row].cells[0].innerHTML.slice(0, table.rows[row].cells[0].innerHTML.indexOf(" "));
	var lastName = table.rows[row].cells[0].innerHTML.slice(table.rows[row].cells[0].innerHTML.indexOf(" ") + 1, table.rows[row].cells[0].innerHTML.length);
	var address = table.rows[row].cells[1].innerHTML;
	var place = table.rows[row].cells[2].innerHTML;
	var phone = table.rows[row].cells[3].innerHTML;
	var email = table.rows[row].cells[4].innerHTML;

	editing = true;
	editElement = element;

	clickAddPerson();

	document.getElementById("add-person-form").elements.namedItem("firstname").value = firstName;
	document.getElementById("add-person-form").elements.namedItem("lastname").value = lastName;
	document.getElementById("add-person-form").elements.namedItem("address").value = address;
	document.getElementById("add-person-form").elements.namedItem("place").value = place;
	document.getElementById("add-person-form").elements.namedItem("phone").value = phone;
	document.getElementById("add-person-form").elements.namedItem("email").value = email;

	/*
	myWindow = window.open("","","width=800,height=800");
	myWindow.document.open();
	myWindow.document.write("<h1>Edit person</h1>");
	myWindow.document.write("<form name=editPersonForm id=editPersonForm>");
	myWindow.document.write("First name: <br> <input type=text name=firstname value=" + firstName + "><br>");
	myWindow.document.write("Last name: <br> <input type=text name=lastname value=" + lastName + "><br>");
	myWindow.document.write("Address: <br> <input type=text name=address value=" + address + "><br>");
	myWindow.document.write("Place of residence: <br> <input type=text name=place value=" + place + "><br>");
	myWindow.document.write("Phone number: <br> <input type=text name=phone value=" + phone + "><br>");
	myWindow.document.write("Email address: <br> <input type=email name=email value=" + email + "><br>");
	myWindow.document.write("<input type='button' value='submit' onclick='test()'>");
	myWindow.document.write("</form>");
	myWindow.document.write("<scr" + "ipt>function test() {alert('test');}</scr"+"ipt>")
	myWindow.document.close();
	*/
}