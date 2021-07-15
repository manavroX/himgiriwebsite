const username = document.getElementById('username');
const password = document.getElementById('password');

const loginBtn = document.getElementById('login');

const database = firebase.database();

const rootRef = database.ref('experiences');

const loginRef = database.ref('login');

const forgotBtn = document.getElementById('forgot');

var imgUrl;
var files = [];
var reader;
var uploadRef;

var dbSevaCardRef = firebase.database().ref('updates').child('sevaCard');
var text = "<table>";

var dbMarqueeRef = firebase.database().ref('updates').child('upcomingEvents');

var imgSelected = false;

var addEventFiles = [];
var addEventReader;
var addEventImgSelected = false;

var dbEventRef = firebase.database().ref('updates').child('events');

var editEventFiles = [];
var editEventReader;

var editEventImgSelected = false;

var textEditEvent = "";

var textOnLoadPopUp = "";
var dbOnLoadPopUpRef = firebase.database().ref('updates').child('popUp');
var onLoadPopUpFiles = [];
var onLoadPopUpReader;
var onLoadPopUpImgSelected = false;

const credRef = firebase.database().ref('Credentials');

var credPass = "";

credRef.once('value', function(snapshot){
	credPass = snapshot.val().appPassword;
	// console.log(pass);
});

function sendEmail(username, password) {
	Email.send({
	  Host: "smtp.gmail.com",
	  Username: "gurusthanqueries@gmail.com",
	  Password: credPass,
	  To: 'gurusthanqueries@gmail.com',
	  From: "gurusthanqueries@gmail.com",
	  Subject: "Password",
	  Body: 'Your username is : "' + username + '" your password is : "' + password + '"',
	})
	  .then(function (message) {
		alert("mail sent successfully")
	  });
  }

function forgotPass()
{
	loginRef.once('value', snapshot => {
		var userid = snapshot.val().username;
		var pass = snapshot.val().password;
		sendEmail(userid, pass);
	});
}

forgotBtn.addEventListener('click', (e) => {
	e.preventDefault();
	forgotPass();
});



loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	loginRef.once('value', snapshot => {
		var user = username.value;
		var pass = password.value;
		if(user==snapshot.val().username && pass == snapshot.val().password)
		{
			console.log("admitted");
			document.getElementById('username').value = "";
			document.getElementById('password').value = "";
		//	Start of Spiritual Experience
			rootRef.orderByChild('priority').on('value', snapshot1 => {
				//console.log(snapshot1.val());
				var experienceArr = [];
			    snapshot1.forEach(function(item) {
			        var itemVal = item.val();
			        experienceArr.push(itemVal);
			    });
			    var text = '<h3>Experiences</h3>';
			    var count=0;
			    
			    for (i=0; i < experienceArr.length; i++) {
			    	if(!experienceArr[i].verified){
			    		console.log(experienceArr[i]);
			    		count++;
			    		text+= "Name: " + '<input type="text" id="'+experienceArr[i].key+'name" value="'+experienceArr[i].name + '"><br>';
			    		text+= "Experience: " + '<textarea rows="5" id="'+experienceArr[i].key+'experience">'+experienceArr[i].experience + '</textarea><br>';
			    		text+= "Email: " + '<input type="text" id="'+experienceArr[i].key+'email" value="'+experienceArr[i].email + '"><br>';
			    		text+= "Priority: " + '<input type="number" id="'+experienceArr[i].key+'priority" value="'+experienceArr[i].priority + '"><br>';
			    		text+= '<input type="submit" onclick="acceptclick(this.id)" value="accept and show" id="'+experienceArr[i].key+'" name="accept">';
			    		text+= '<input type="submit" onclick="acceptAndHideclick(this.id)" value="accept and hide" id="'+experienceArr[i].key+'" name="acceptHide">';
			    		text+= '<input type="submit" onclick="rejectclick(this.id)" value="reject" id="'+experienceArr[i].key+'" name="reject">';
			    		text+= '<hr style="max-width: 100%;">';
			    		//console.log(text);
					}
			    }
				for (i=0; i < experienceArr.length; i++) {
			    	if(experienceArr[i].verified){
			    		console.log(experienceArr[i]);
			    		count++;
			    		text+= "Name: " + '<input type="text" id="'+experienceArr[i].key+'name" value="'+experienceArr[i].name + '"><br>';
			    		text+= "Experience: " + '<textarea rows="5" id="'+experienceArr[i].key+'experience">'+experienceArr[i].experience + '</textarea><br>';
			    		text+= "Email: " + '<input type="text" id="'+experienceArr[i].key+'email" value="'+experienceArr[i].email + '"><br>';
			    		text+= "Priority: " + '<input type="number" id="'+experienceArr[i].key+'priority" value="'+experienceArr[i].priority + '"><br>';
			    		text+= '<input type="submit" onclick="acceptclick(this.id)" value="Update" id="'+experienceArr[i].key+'" name="Update">';
						text+= '<input type="submit" onclick="hideclick(this.id)" value="Hide" id="'+experienceArr[i].key+'" name="Hide">';
						text+= '<input type="submit" onclick="showclick(this.id)" value="Show" id="'+experienceArr[i].key+'" name="Show">';
						text+= '<input type="submit" onclick="rejectclick(this.id)" value="Delete" id="'+experienceArr[i].key+'" name="Delete">';

			    		text+= '<hr style="max-width: 100%;">';
			    		//console.log(text);
					}
			    }
			    if(count==0)
				{
					text = "There are no experiences to review";
					// console.log(text);
				}
		    	document.getElementById("spiritualExperience").innerHTML = text;
			});
		//End of spiritual experiences
		//Start of Marquee Text
			var textMarquee = "<h1>Marquee</h1>";
			dbMarqueeRef.once('value', snapshot => {
				
					textMarquee+='Marquee Text <input type="text" id="marqueeInput" name="marqueeInput" value = "' + snapshot.val().marquee + '"><br>';
					textMarquee+='<button id="marqueeUpdateBtn" onclick="updateMarquee()">Update</button>';
					textMarquee+='<button id="hideMarqueeBtn" onclick="hideMarquee()">Hide</button>';
					textMarquee+='<button id="showMarqueeBtn" onclick="showMarquee()">Show</button>';
					textMarquee+='<br><hr style="max-width: 100%;"><br>';
				

				document.getElementById('marquee').innerHTML = textMarquee;
			});
		//End of Marquee Text
		// Start of Seva Cards
			var textSevaCard ="<h1>Seva Cards</h1>";
			
			dbSevaCardRef.on('value', snapshot => {
				textSevaCard ="<h1>Seva Cards</h1>";
				snapshot.forEach(function(item) {
					textSevaCard+='Card Name <input type="text" id="cardName' + item.val().index + '" name="cardName' + item.val().index + '" value="'+item.val().Name+'"><br><br>';
					textSevaCard+='Card Text <textarea rows="8" id="cardText' + item.val().index + '" name="cardText' + item.val().index + '">'+item.val().Text+'</textarea><br><br>';
					textSevaCard+='<img id="Img' + item.val().index + '" class="myImg" src="'+item.val().URL+'"><br><br>';
					textSevaCard+='<p id = "prog' + item.val().index + '"></p>'
					textSevaCard+='<button id="' + item.val().index + '" onclick="selectSevaCardImg(this.id)">Select Image</button>'
					textSevaCard+='<button id="' + item.val().index + '" onclick="updateSevaCard(this.id)">Update</button>'
					textSevaCard+='<br><hr style="max-width: 100%;"><br>';
					
				});

				document.getElementById('sevaCards').innerHTML = textSevaCard;
				
				


			});
		//End of Seva Cards

		//Start of Events
			//Start of Add New Event
			var textAddEvent = "";
			textAddEvent+='<h1>Events</h1>';
	    	textAddEvent+='<h3>Add Event</h3>'
	    	textAddEvent+='Event Name <input type="text" name="addEventName" id="addEventName"><br><br>'
	    	textAddEvent+='Event Text <textarea rows="5" cols="80" id="addEventText"></textarea><br><br>'
	    	textAddEvent+='Event Priority <input type="number" name="addEventPriority" id="addEventPriority"><br><br>'
	    	textAddEvent+='<img class="myImg" id="addEventImg"><br><br>'
	    	textAddEvent+='<button id="selectAddEventImg" onclick="selectAddEventImg()">Select Image</button>'
	    	textAddEvent+='<button id="addEvent" onclick="addEvent()">Add Event</button>'
	    	textAddEvent+='<p id="addEventProgress"></p>'

	    	document.getElementById('addEvent').innerHTML = textAddEvent;
	    	//End of Add New Event

	    	//Start of edit current Events
	    	
	    	dbEventRef.orderByChild('priority').on('value', snapshot => {
	    		textEditEvent = "<h3>Edit Events</h3>";
	    		snapshot.forEach(function(item) {
	    			textEditEvent+='<br />';
	    			textEditEvent+='Event Name <input type="text" name="eventName" id="editEventName'+item.val().index+'" value="'+item.val().Name+'"><br>';
	    			textEditEvent+='Event Text <textarea rows="10" cols="80" id="editEventText'+item.val().index+'">'+item.val().Text+'</textarea><br>';
	    			textEditEvent+='Event Priority <input type="number" name="editEventPriority" id="editEventPriority'+item.val().index+'" value="'+item.val().priority+'"><br>';
	    			textEditEvent+='<img class="myImg" id="editEventImg'+item.val().index+'" src="'+item.val().URL+'" alt="Events'+item.val().index+'"><br>';
	    			textEditEvent+='<button id="'+item.val().index+'" onclick="selectEditEventImg(this.id)">Select Image</button>';
	    			textEditEvent+='<button id="'+item.val().index+'" onclick="updateEvent(this.id)">Update Event</button>';
	    			textEditEvent+='<button id="'+item.val().index+'" onclick="deleteEvent(this.id)">Delete Event</button>';
	    			textEditEvent+='<p id = "editProg' + item.val().index + '"></p>'
	    			textEditEvent+='<hr style="max-width: 100%;">';
	    		});

	    		document.getElementById('editEvent').innerHTML = textEditEvent;
	    	});
	    	//End of Edit Current Events
	    //End of Events
	    //Start of OnLoadPopUp
	    	dbOnLoadPopUpRef.on('value', snapshot => {
	    		textOnLoadPopUp = "<h3>Edit On Load Pop Up</h3>";
	    		textOnLoadPopUp += '<br />';
	    		textOnLoadPopUp += 'Pop Up Heading <input type="text" name="onLoadPopUpHeading" id="onLoadPopUpHeading" value="'+snapshot.val().heading+'"><br>';
	    		textOnLoadPopUp += 'Pop Up Text <textarea rows="10" cols="80" id="onLoadPopUpText">'+snapshot.val().text+'</textarea><br>';
	    		textOnLoadPopUp += '<img class="myImg" id="onLoadPopUpImg" src="'+snapshot.val().url+'"><br>';
	    		textOnLoadPopUp += '<button id="onLoadPopUpSelectImg" onclick="selectOnLoadPopUpImg()">Select Image</button>';
    			textOnLoadPopUp += '<button id="onLoadPopUpUpdate" onclick="updateOnLoadPopUp()">Update</button>';
    			textOnLoadPopUp += '<button id="onLoadPopUpHide" onclick="hideOnLoadPopUp()">Hide</button>';
    			textOnLoadPopUp += '<button id="onLoadPopUpShow" onclick="showOnLoadPopUp()">Show</button>';
    			textOnLoadPopUp += '<p id = "onLoadPopUpProg"></p>'
    			textOnLoadPopUp += '<hr style="max-width: 100%;">';

    			document.getElementById('onLoadPopUp').innerHTML = textOnLoadPopUp;
	    	});
	    //End of OnLoadPopUp
		}
		else {
			window.alert("Wrong username/password");
			console.log('login failed');
		}
    	//console.log(snapshot.val().username);
	});
});



function acceptclick(key) {
	// console.log(key);
	console.log(document.getElementById(key+'name').value);
	const newData = {
		name: document.getElementById(key+'name').value,
		email: document.getElementById(key+'email').value,
		experience: document.getElementById(key+'experience').value,
		priority: parseInt(document.getElementById(key+'priority').value),
		verified: true,
		show: true
	}
	rootRef.child(key).update(newData);
}

function acceptAndHideclick(key) {
	// console.log(key);
	console.log(document.getElementById(key+'name').value);
	const newData = {
		name: document.getElementById(key+'name').value,
		email: document.getElementById(key+'email').value,
		experience: document.getElementById(key+'experience').value,
		priority: parseInt(document.getElementById(key+'priority').value),
		verified: true,
		show: false
	}
	rootRef.child(key).update(newData);
}

function rejectclick(key) {
	// console.log(key);
	rootRef.child(key).remove();
}

function hideclick(key) {
	// console.log(key);
	console.log(document.getElementById(key+'name').value);
	const newData = {	
		show: false
	}
	rootRef.child(key).update(newData);
	
}

function hideOnLoadPopUp() {
	const newData = {
		show: false
	}
	dbOnLoadPopUpRef.update(newData);
	alert("pop up hidden");
}

function showOnLoadPopUp() {
	const newData = {
		show: true
	}
	dbOnLoadPopUpRef.update(newData);
	alert("pop up visible");
}

function showMarquee() {
	const newData = {
		show: true
	}
	dbMarqueeRef.update(newData);
	alert("marquee visible");
}

function hideMarquee() {
	const newData = {
		show: false
	}
	dbMarqueeRef.update(newData);
	alert("marquee hidden");
}

function showclick(key) {
	// console.log(key);
	console.log(document.getElementById(key+'name').value);
	const newData = {	
		show: true
	}
	rootRef.child(key).update(newData);
}

function selectOnLoadPopUpImg() {
	var onLoadPopUpInput = document.createElement('input');
	onLoadPopUpInput.type = 'file';
	onLoadPopUpInput.onchange = function() {
		onLoadPopUpFiles = event.target.files;
		onLoadPopUpReader = new FileReader();
		onLoadPopUpReader.onload = function() {
			document.getElementById('onLoadPopUpImg').src = onLoadPopUpReader.result;
		}
		onLoadPopUpReader.readAsDataURL(onLoadPopUpFiles[0]);
	}
	onLoadPopUpInput.click();
	onLoadPopUpImgSelected = true;
}

function selectAddEventImg() {
	// console.log('inside selectAddEVentImg function');
	var addEventInput = document.createElement('input');
	addEventInput.type = 'file';
	addEventInput.onchange = function() {
		addEventFiles = event.target.files;
		addEventReader = new FileReader();
		addEventReader.onload = function() {
			document.getElementById('addEventImg').src = addEventReader.result;
		}
		addEventReader.readAsDataURL(addEventFiles[0]);
	}
	addEventInput.click();
	addEventImgSelected = true;
}

function selectEditEventImg(id){
	var editEventInput = document.createElement('input');
	editEventInput.type = 'file';
	editEventInput.onchange = function() {
		editEventFiles = event.target.files;
		editEventReader = new FileReader();
		editEventReader.onload = function() {
			document.getElementById('editEventImg' + id).src = editEventReader.result;
		}
		editEventReader.readAsDataURL(editEventFiles[0]);
	}
	editEventInput.click();

	editEventImgSelected = true;
}


function selectSevaCardImg(id){
	var input = document.createElement('input');
	input.type = 'file';
	input.onchange = function() {
		files = event.target.files;
		reader = new FileReader();
		reader.onload = function() {
			document.getElementById('Img' + id).src = reader.result;
		}
		reader.readAsDataURL(files[0]);
	}
	input.click();

	imgSelected = true;

}

function updateMarquee(){
	var marqueeInputText = document.getElementById('marqueeInput').value;
	const newData = {
		marquee: marqueeInputText
	}
	dbMarqueeRef.update(newData);
	alert('marqueeUpdated');
}

function addEvent() {
	var noOfEvents = 0;
	firebase.database().ref('updates').child('events').limitToLast(1).once('value', snapshot => {
		snapshot.forEach(function(item){
			noOfEvents = item.val().index;
			// console.log(noOfEvents);
		});
		noOfEvents++;
		if(document.getElementById('addEventName').value.length==0||
			document.getElementById('addEventText').value.length==0||
			!addEventImgSelected)
		{
			alert('Please enter all details')
		}
		else
		{
			addEventImgSelected = false;
			var addEventRef = firebase.storage().ref('events/' + noOfEvents + '.webp').put(addEventFiles[0]);
			addEventRef.on('state_changed', function(snapshot){
				var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
				document.getElementById('addEventProgress').innerHTML = progress + '% uploaded';

				addEventRef.snapshot.ref.getDownloadURL().then(function(url){
					imgUrl = url;

					firebase.database().ref('updates').child('events').child(noOfEvents).set({
						URL: imgUrl,
						Name: document.getElementById('addEventName').value,
						Text: document.getElementById('addEventText').value,
						index: noOfEvents,
						priority: parseInt(document.getElementById('addEventPriority').value)
					}).then(function(){
						document.getElementById('addEventName').value="";
						document.getElementById('addEventText').value="";
						document.getElementById('addEventImg').src = "";
						alert("event added");
						location.reload();
					});
				});
			},
			function(error){
				alert("error in saving Image" + error);
			});
		}
	});
}

function deleteEvent(id) {

	firebase.database().ref('updates').child('events').child(id).remove();
	firebase.storage().ref('events').child(id + '.webp').delete().then(function(){
		alert("Event Deleted");
		location.reload();
	});
	
}

function updateEvent(id)
{
	if(editEventImgSelected)
	{
		var editEventRef = firebase.storage().ref('events/' + id + '.webp').put(editEventFiles[0]);
		editEventRef.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('editProg' + id).innerHTML = 'progress = ' + progress + '%';
		},
		function(error){
			alert("error in saving" + error);
		},
		function(){
			editEventRef.snapshot.ref.getDownloadURL().then(function(url){
				imgUrl = url;
				// console.log(document.getElementById('editEventPriority' + id).value);
				firebase.database().ref('updates').child('events').child(id).update({
					URL: imgUrl,
					Name: document.getElementById('editEventName' + id).value,
					Text: document.getElementById('editEventText' + id).value,
					index: parseInt(id),
					priority: parseInt(document.getElementById('editEventPriority' + id).value)
				});
				editEventImgSelected =false;
				alert("Event Updated and Image Saved");
			});
		});
	}
	else
	{
		// console.log(parseInt(id));
		firebase.database().ref("updates").child('events').child(id).update({
			Name: document.getElementById('editEventName' + id).value,
			Text: document.getElementById('editEventText' + id).value,
			index: parseInt(id),
			priority: parseInt(document.getElementById('editEventPriority' + id).value)
		});
		alert("Event Updated");
	}
}


function updateSevaCard(id){
	if(imgSelected)
	{
		var uploadRef = firebase.storage().ref('sevaCard/'+id+'.webp').put(files[0]);
		uploadRef.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('prog' + id).innerHTML = 'progress = ' + progress + '%';
		},
		function(error){
			alert("error in saving img" + error);
		},
		function(){
			// console.log("works till here 2");
				uploadRef.snapshot.ref.getDownloadURL().then(function(url){
				imgUrl = url;

				firebase.database().ref().child('updates').child('sevaCard').child(id).set({
				URL: imgUrl,
				Name: document.getElementById('cardName' + id).value,
				Text: document.getElementById('cardText' + id).value,
				index: parseInt(id)
				});
				imgSelected = false;
				alert("Image saved successfully and seva card updated");
			});
		});
	}
	else
	{
		firebase.database().ref().child('updates').child('sevaCard').child(id).update({
			Name: document.getElementById('cardName' + id).value,
			Text: document.getElementById('cardText' + id).value,
			index: parseInt(id)
		});
		alert('seva card updated');
	}
}

function updateOnLoadPopUp(){
	if(onLoadPopUpImgSelected)
	{
		var uploadRef = firebase.storage().ref('popup/popup.webp').put(onLoadPopUpFiles[0]);
		uploadRef.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('onLoadPopUpProg').innerHTML = 'progress = ' + progress + '%';
		},
		function(error){
			alert("error in saving img" + error);
		},
		function(){
			// console.log("works till here 2");
				uploadRef.snapshot.ref.getDownloadURL().then(function(url){
				imgUrl = url;

				firebase.database().ref().child('updates').child('popUp').update({
				url: imgUrl,
				heading: document.getElementById('onLoadPopUpHeading').value,
				text: document.getElementById('onLoadPopUpText').value
				});
				onLoadPopUpImgSelected = false;
				alert("Image saved successfully and pop up updated");
			});
		});
	}
	else
	{
		firebase.database().ref().child('updates').child('popUp').update({
			heading: document.getElementById('onLoadPopUpHeading').value,
			text: document.getElementById('onLoadPopUpText').value
		});
		alert('pop up updated');
	}
}

