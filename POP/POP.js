//deze functie is nodig anders moet je een extra keer klikken om content te laten zien de eerste keer na reload.
//ik denk dat het komt omdat hij er in eerste instantie geen string als waarde toevoegd aan style.display.
hideProgressContent()

//navigeert je automatisch naar de homepage
navigate(document.getElementById("navHome"));

//neemt alle voltooide content, maakt het italic en zet er (completed) achter
showComplete()

//Navigeert tussen de verschillende onderdelen van de website
function navigate(element) {
	//Neemt alle content en verbergt het.
	//Neemt tevens alle navigation elements en zorgt dat de juiste achtergrond kleur word gekozen.
	var contentElements = document.getElementsByClassName("content");
	var navElements = document.getElementsByClassName("nav");

    for (var i = 0; i < contentElements.length; i++){
        contentElements[i].style.display = "none";
        navElements[i].style.backgroundColor = "#DCD0C0";
    }

    //Laat de gewenste content zien, vergt minder rekenkracht dan een if functie in de vorige for loop denk ik. 
    //Werkt alleen als de navbar innerHTMl hetzelfde is als je content id names.
    document.getElementById(element.innerHTML).style.display = "block";
    element.style.backgroundColor = "#C0B232";
}

//hide alle progress content
function hideProgressContent() {
	elements = document.getElementsByClassName("progressContent")
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = "none";
	}
}

//laat content zien, gebruikt voor onClick in de PDP
function toggleContent(element) {
	//element.nextElementSibling.style.display="block";
	$(element.nextElementSibling).slideToggle();
}

//zet "completed" achter elk voltooid punt en maakt het italic
function showComplete() {
	elements = document.getElementsByClassName("complete")
	for (i = 0; i < elements.length; i++) {
		elements[i].innerHTML += " (completed)";
		elements[i].style.fontStyle="italic";
	}
}