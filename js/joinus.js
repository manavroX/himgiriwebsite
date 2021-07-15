const nameText = document.getElementById("name");
const homeTown = document.getElementById("homeTown");
const whatsappNo = document.getElementById("phn");

const submitBtn1 = document.getElementById("join_submit");

const joinUsForm = document.getElementById("joinUsform");

const credsRef = firebase.database().ref('Credentials');

var pass = "";

credsRef.once('value', function(snapshot){
	pass = snapshot.val().appPassword;
	// console.log(pass);
});

function sendEmail(body) {
      Email.send({
        Host: "smtp.gmail.com",
        Username: "gurusthanqueries@gmail.com",
        Password: pass,
        To: 'gurusthanqueries@gmail.com',
        From: "gurusthanqueries@gmail.com",
        Subject: "New Joinee",
        Body: body,
      })
        .then(function (message) {
          //alert("mail sent successfully")
        });
    }

submitBtn1.addEventListener('click', (e) => {
	// console.log("works till here");
	if(nameText.value.length==0||homeTown.value.length==0||whatsappNo.value.length==0)
	{
		window.alert("Please fill all values");
	}
	else
	{
		var emailBody = "there is a new joinee \n name: " + nameText.value + "\n homeTown: " + homeTown.value + "\n whatsappNo: " + whatsappNo.value;
		sendEmail(emailBody);
		document.getElementById("name").value = "";
		document.getElementById("homeTown").value="";
		document.getElementById("phn").value = "";
		alert("Your response has been recorded. We will contact you shortly.");
		// document.getElementById("joinUsform").modal('hide');
	}
});
// joinus.js
// Displaying joinus.js.