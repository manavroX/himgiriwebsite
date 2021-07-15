const marqueeRef = firebase.database().ref('updates').child('upcomingEvents');

// console.log("hello world");
// $('#loading').hide();
var popUp = false;

var timeleft = 4;
var downloadTimer = setInterval(function(){
	if(timeleft <= 0){
		$('#loading').hide();
		if(!popUp)
		{
			$('#onLoadPopUp').modal('show');
			popUp = true;
		}
	  	clearInterval(downloadTimer);
	}
	timeleft -= 1;
}, 1000);

marqueeRef.once('value', snapshot => {
	var marqueeTextValue = snapshot.val().marquee;
	if(snapshot.val().show)
	{
		document.getElementById('marqueeText').innerHTML = marqueeTextValue;
	}
	
	$('#loading').hide();
	if(!popUp)
	{
		$('#onLoadPopUp').modal('show');
		popUp = true;
	}
});

const sevaCardsRef = firebase.database().ref('updates').child('sevaCard');

var text = "";

sevaCardsRef.on('value', snapshot => {
	text = "";
	snapshot.forEach(function(item) {
		text+='<div class="item col-md-2 col-sm-4 col-xs-12">';
		text+='<div class="sevaCard">';
		text+='<div>';
		text+='<img class="img-responsive cardImage" src="'+item.val().URL+'">';
		text+='</div>';
		text+='<h3 class="sub-title">' + item.val().Name +'</h3>';
		text+='<div class="desc">';
		text+='<p>'+item.val().Text + '</p>';
		text+='</div>';
		text+='</div>';
		text+='</div>';
	});

	document.getElementById('sevaCards').innerHTML = text;


	

});

const dbEventsRef = firebase.database().ref('updates').child('events');
var eventsText = "";

dbEventsRef.orderByChild('priority').on('value', snapshot => {
	var cnt = 1;
	eventsText = "";
	snapshot.forEach(function(item) {
		if(cnt%2==1)
		{
			eventsText+='<div class="eventsRow col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 zeroPadding">';
			eventsText+='<div class="col-lg-4 col-md-4 col-sm-6 zeroPadding imageLeft">';
			eventsText+='<img class="imgMobile eventsImage" src="'+item.val().URL+'" alt="Events'+item.val().index+'">';
			eventsText+='</div>';
			eventsText+='<div class="col-lg-8 col-md-8 col-sm-6 text-left">';
			eventsText+='<br />';
			eventsText+='<h5>'+item.val().Name+'</h5>';
			eventsText+='<p>'+item.val().Text+'</p>';
			eventsText+='</div>';
			eventsText+='</div>';
		}
		else
		{
			eventsText+='<div class="eventsRow col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 zeroPadding columnReverse">';
			eventsText+='<div class="col-lg-8 col-md-8 col-sm-6 text-left eventTextPadding">';
			eventsText+='<br />';
			eventsText+='<h5>'+item.val().Name+'</h5>';
			eventsText+='<p>'+item.val().Text+'</p>';
			eventsText+='</div>';
			eventsText+='<div class="col-lg-4 col-md-4 col-sm-6 zeroPadding imageRight">';
			eventsText+='<img class="imgMobile eventsImage" src="'+item.val().URL+'" alt="Events'+item.val().index+'">';
			eventsText+='</div>';
			eventsText+='</div>';
		}
		cnt++;
	});
	// console.log("works till here");
	document.getElementById('eventText').innerHTML = eventsText;
});


const onLoadPopUpRef = firebase.database().ref('updates').child('popUp');
onLoadPopUpRef.on('value', snapshot => {
	var popUpText = "";
	if(snapshot.val().show)
	{
		popUpText+='<div class="modal-dialog">';
		popUpText+='<div class="modal-content">';
		popUpText+='<div class="modal-header">';
		popUpText+='<button type="button" class="close" data-dismiss="modal">&times;</button>';
		popUpText+='<h4 class="modal-title">'+snapshot.val().heading+'</h4>';
		popUpText+='</div>';
		popUpText+='<div class="modal-body">';
		popUpText+='<img src="'+snapshot.val().url+'" style="max-height: 200px; max-width: 180px;">';
		popUpText+='<p>'+snapshot.val().text+'</p>';
		popUpText+='</div>';
		popUpText+='<div class="modal-footer">';
		popUpText+='<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		popUpText+='</div>';
		popUpText+='</div>';
		popUpText+='</div>';
	}
	document.getElementById('onLoadPopUp').innerHTML = popUpText;
});