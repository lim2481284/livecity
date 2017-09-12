


  // Initialize Firebase
var config = {
apiKey: " AIzaSyD-05Oz3dIlcAYYo4wv3bf3GxCHqTMAdtg",
authDomain: "smartselangor-d005e.firebaseapp.com",
databaseURL: "https://smartselangor-d005e.firebaseio.com",
projectId: "smartselangor-d005e",
storageBucket: "smartselangor-d005e.appspot.com",
messagingSenderId: "784184516276"
};

  firebase.initializeApp(config);

function Api(){
	this.getEvent=function(map){
		var events=firebase.database().ref("events");
		events.on("child_added",function(snap){
			if (snap.val().type=="annoucement" ){
			var icon="img/annucement.png";
		}
		else if (snap.val().type=="Disaster" ){
			var icon="img/disaster.png";
		}
		else if (snap.val().type=="EnquiriesAndRequests"){
			var icon="img/enquireies.png";
		}
		else if (snap.val().type=="event" ){
			var icon="img/event.png";
		}
		else if (snap.val().type=="ComplaintsAndFeedback" ){
			var icon="img/feedback.png";
		}
		else if (snap.val().type=="notice"){
			var icon="img/general.png";
		}
		else if (snap.val().type=="project" ){
			
			var icon="img/project.png";
		}
			getMarker(parseFloat(snap.val().lat),parseFloat(snap.val().long),map,icon,snap);
			//console.log("The value is: ",snap.val())
			//console.log("the key is: ",snap.key)
		});
	}

	this.getEventForList=function(){
		var events=firebase.database().ref("events");
		events.on("child_added",function(snap){

		if (snap.val().type=="annoucement" ){
			var icon="img/annucement.png";
		}
		else if (snap.val().type=="Disaster" ){
			var icon="img/disaster.png";
		}
		else if (snap.val().type=="EnquiriesAndRequests"){
			var icon="img/enquireies.png";
		}
		else if (snap.val().type=="event" ){
			var icon="img/event.png";
		}
		else if (snap.val().type=="ComplaintsAndFeedback" ){
			var icon="img/feedback.png";
		}
		else if (snap.val().type=="notice"){
			var icon="img/general.png";
		}
		else if (snap.val().type=="project" ){
			
			var icon="img/project.png";
		}
		

		$('#list').append("<a style='cursor:pointer' class='event_row' key="+snap.key+"><img style='width:20vw;height:10vh;float:left;margin:5px;padding:5px;' src="+icon+"><div style=''><h3>"+snap.val().name+"</h3><p style='width:40%'>"+snap.val().description+"</p></a><hr>")
		$(".event_row").on('click',function(){
			console.log('clicked');
			fire.selectEvent($(this).attr("key"));
			window.location.href = 'details.html';
		});

	});	
		
		
	}	
	this.createEvent=function(evname,description,type,lat,long){
		firebase.database().ref("events").push({
			name:evname,
			description:description,
			type:type,
			lat:lat,
			long:long
		});
			
	}

	this.selectEvent=function(key){
		var selected=firebase.database().ref("events/"+key);
		selected.on("value",function(snap){
			//console.log("Selected child is",snap.val());
			localStorage.setItem("current_details",JSON.stringify(snap.val()));
			localStorage.setItem("current_key",snap.key);
			window.location="details.html";
		})
	}

	this.createMessage=function(title,message){
		firebase.database().ref("message").push({
			title:title,
			message:message
		})
	}

	this.getMessage=function(){
		
		var message=firebase.database().ref("message").limitToLast(1);
		message.on("child_added",function(snap){
				
				$('#noti_message').html(snap.val()[Object.keys(snap.val())[0]]);
		})
	}

	this.writeComment=function(key,comment,writer){

		firebase.database().ref("events/"+key+"/comments").push({
			comments:comment,
			writer:writer
		})
	}
	
	this.getComment=function(key){
	
		var events=firebase.database().ref("events/"+key+"/comments");
		events.on("child_added",function(snap){
			$('#commentArea').append("<div class='commentList'> <div style='width:100%'><input type='text' style='color:gray;margin:0; padding:0;' class='comment2' value='" +snap.val().writer+ "'/><input type='text' class='comment2' value='" +snap.val().comments+ "'/></div></div>");
			//console.log("the key is: ",snap.key)
		});
	}
}

//added noti message
var fire=new Api();
fire.getMessage();
	


function publishNoti() {
    var msg = prompt("Publish Notification");
	var fire=new Api();
	fire.createMessage("title",msg);

}	
	
	 