const name = document.getElementById('name1');
const email = document.getElementById('email');
// const experience = document.getElementById('experience');

const submitBtn = document.getElementById('submit');

const database = firebase.database();

const rootRef = database.ref('experiences');


const credRef = firebase.database().ref('Credentials');

var pass = "";

credRef.once('value', function(snapshot){
	pass = snapshot.val().appPassword;
	// console.log(pass);
});


function sendEmail() {
      Email.send({
        Host: "smtp.gmail.com",
        Username: "gurusthanqueries@gmail.com",
        Password: pass,
        To: 'gurusthanqueries@gmail.com',
        From: "gurusthanqueries@gmail.com",
        Subject: "New Experience",
        Body: 'There are new experiences. Please check them <a href="himgirihealing2feeling.org/verifyExperiences.html">here</a>.',
      })
        .then(function (message) {
          //alert("mail sent successfully")
        });
    }



submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const autoId = rootRef.push().key;
	// console.log(email.value);
	var nameSubmitted = name.value;
	if(name.value.length==0)
		nameSubmitted = "Anonymous";
	if(experience.value.length!=0&&(email.value.length==0||validateEmail(email.value))){
				rootRef.child(autoId).set({
				name: nameSubmitted,
				email: email.value,
				experience: experience.value,
				verified: false,
				show: false,
				priority: 10,
				key: autoId
		})
		.then(() => {
				window.alert("Thank you. Your resposnse has been recorded. It will be available on the website after verification and filtering.");
				sendEmail();
		}).catch(error => {
				window.alert("There was a problem inserting, please try again");
				console.error(error);
		});

		document.getElementById('name1').value = '';
		document.getElementById('email').value = '';
		document.getElementById('experience').value = '';
	}
	else if(!validateEmail(email.value))
	{
		alert("Please enter a valid email id");
	}
	else {
		window.alert("Please enter your experience");
	}
	
});




rootRef.orderByChild('priority').on('value', snapshot => {
	// console.log(snapshot.val());
		var experienceArr = [];
    snapshot.forEach(function(item) {
        var itemVal = item.val();
        experienceArr.push(itemVal);
    });
	
    var text = '';
    for (i=0; i < experienceArr.length; i++) {
    	if(experienceArr[i].verified && experienceArr[i].show){
			if(i==0)
				text+= '<div class="item experienceTextBG active">';			
			else
				text+= '<div class="item  experienceTextBG">';
    		// console.log(experienceArr[i]);
			text+= '<div class="carousel-caption">';
			text+= '<h5>';			
    		text+=  experienceArr[i].name;
			text+= '</h5">';			
			text+= '<p class="experienceScrollTxt">';
			text+= '<br>';
    		text+=  experienceArr[i].experience;
			text+= '</p>';
			text+= '</div>';
			text+= '</div>';
    		//console.log(text);
    	}
    }
    document.getElementById("spiritualExperience").innerHTML = text;
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}