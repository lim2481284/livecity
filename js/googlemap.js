
var markers = [];

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: {lat: 3.333333, lng: 101.5 },
		disableDefaultUI: true,
		styles:
		[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f4f4f4"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f4f4f4"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fbdd9f"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f4f4f4"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f4f4f4"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#afd2fe"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
	});
	map.addListener('click', function(e) {
		var i = markers.length-1;
		if(i!=-1){
			clearOverlays();
		}
		createMarker(e.latLng, map);
	});
	fire.getEvent(map);
	
}
	 
function createMarker(latLng, map) {
	infowindow.close();
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title:"Hello World!",
		draggable:true
	});
	
	marker.addListener('click', function() {
		infowindow.setContent(html);
		infowindow.open(map, marker);	
    });
	
	var value = window.localStorage.getItem("role");
    if(value =='student')
	{
		var html = "<div ><input type='hidden' id='lat' value='"+latLng.lat()+"'/> <input type='hidden' id='lng' value='"+latLng.lng()+"'/> <table class='form'>" +
   "<tr><td>Categories</td> <td><select id='type'>" +
  "<option value='Disaster' SELECTED>Disaster</option>" +
				  "<option value='DamageReport'>Damage Report</option>" +
				  "<option value='EnquiriesAndRequests'>Enquiries and Requests</option>" +
				  "<option value='ComplaintsAndFeedback'>Complaints and Feedback</option>" +
				  "<option value='Crime'>Crime</option>" +
  "</select> </td></tr>" +
				"<tr><td>Name</td> <td><input class='input' type='text' id='name' /> </td> </tr>" +
  "<tr><td>Description</td> <td><textarea id='description'/></textarea> </td> </tr>" +
					 "<tr><td colspan='2'><button style='    margin-top: 5%;width:50%;height:10%;border:none; padding:6% !important;color :white; background-color:#7cff9e;' type='button' value='Create' onclick='createPost();clearOverlays(); '>Create</button><button style='    margin-top: 5%;width:50%;padding:6% !important;color:white;border:none;background-color:#ff6666' type='button' value='Cancel' onclick='clearOverlays()'>Cancel </button></td>	</tr> </div>";
		
	}
	else 
	{
		var html = "<div ><input type='hidden' id='lat' value='"+latLng.lat()+"'/> <input type='hidden' id='lng' value='"+latLng.lng()+"'/> <table class='form'>" +
   "<tr><td>Categories</td> <td><select id='type'>" +
  "<option value='event' SELECTED>Event</option>" +
				  "<option value='project'>Project </option>" +
				  "<option value='annoucement'>Annoucement</option>" +
				  "<option value='Disaster'>Disaster</option>" +	
  "</select> </td></tr>" +
				"<tr><td>Name</td> <td><input class='input' type='text' id='name' /> </td> </tr>" +
  "<tr><td>Description</td> <td><textarea id='description'/></textarea> </td> </tr>" +
					 "<tr><td colspan='2'><button style='    margin-top: 5%;width:50%;height:10%;border:none; padding:6% !important;color :white; background-color:#7cff9e;' type='button' value='Create' onclick='createPost();clearOverlays(); '>Create</button><button style='    margin-top: 5%;width:50%;padding:6% !important;color:white;border:none;background-color:#ff6666' type='button' value='Cancel' onclick='clearOverlays()'>Cancel </button></td>	</tr> </div>";
	}
	
	infowindow = new google.maps.InfoWindow({
		content: html
	});
	infowindow.close();	
	infowindow.setContent(html);
	infowindow.open(map, marker);
	map.panTo(latLng);

	markers.push({
		mark:marker
	});		 
}
var marker_api = [];
function getMarker(latt,long,maps,icon,info){
	var icons={
		url:icon,
		scaledSize:new google.maps.Size(50,61)
	}
	var marker=new google.maps.Marker({
		position: {lat: latt, lng: long},
		icon:icons,
		map: maps,
		animation: google.maps.Animation.DROP,
		title:"Hello World!",
		draggable:false
	})

	var content="<div style='width:300px; padding:10px 10px' ><h3>"+info.val().name+"</h3><p>"+info.val().description+"</p><button style='width:100%;  border:none;background-color:#69b2e9; color:white;padding-top:5%;padding-bottom:5%;' key="+info.key+" onclick='fire.selectEvent($(this).attr(&quot;key&quot))'>View more</button><br><br><div class='like'><label id='pos'>13</label><a onclick='add()'><img id='like' src='img/like.png'/> </a><label id='neg'>99</label><a onclick='add2()'><img  id='dislike' src='img/dislike.png'/></a></div></div>";

	infowindow=new google.maps.InfoWindow({
		content:content
	})

	marker.addListener('click',function(){
		infowindow.close();
		infowindow.setContent(content);
		infowindow.open(map,marker);
	})

		
}


function add(){
	
	var name = $('#pos').text();
	name = parseInt(name) + 1;
	$('#pos').html(name);
	$('#like').attr("src","img/like-color.png");
	$('#dislike').attr("src","img/dislike.png");
		
	
}

function add2(){
	
	var name = $('#neg').text();
	name = parseInt(name) - 1;
	$('#neg').html(name);
	$('#dislike').attr("src","img/dislike-color.png");
		$('#like').attr("src","img/like.png");
}



function createPost(){

	console.log("clicked");
	var name = $('#name').val();
	var description = $('#description').val();
	//var needgive = $('#needgive').val();
	var type = $('#type').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	var needGiveSample= [];
	var types;
	var h;
	
	fire.createEvent(name,description,type,lat,lng);
	
	
}
$(window).load(function(){
	$('.like').on("click",'#like', function() {
		alert(123);
		
	});
	
	$('#dislike').on("click", function() {
		var name = $('#pos').val();
	name = name - 1;
	$('#pos').html(name);
	});
});


	
function clearOverlays() {
	var i = markers.length-1;
	markers[i].mark.setMap(null);
	markers.pop();
}
	 
function saveData() {
	var i = markers.length-1;
	markers[i].setMap(null);
	markers.pop();
 	setMapOnAll(null);
}

