(function (){

    let map; 
    let currentLocation; //this will be the correct locations of the photos
    let userGuess; // storing the users guess
    let guessLine;
    let marker1 = null;
    let guessCount = 0;
    const hint1 = document.querySelector('#hint1');
    const hint2 = document.querySelector('#hint2');
    let randomIndex;
    
    //putting all photos into an array with latlng
    const photos = [
        {src: 'worldImages/8T0A0007.avif', lat: 37.7749, lng: -122.4194, 
        hint1:"this country is known for its appreciation of llamas",
        hint2:"this country is known for its appreciation of llamas"}, //sf
        {src: 'worldImages/IMG_9879.avif', lat: 48.8566, lng: 2.3522}, //paris
        {src: 'worldImages/stream.avif', lat: 35.6895, lng: 139.6917} //tokyo
    ];
    
    // initializes map
    function startMap(){
    map=L.map('map').setView([6.2176, -75.5821], 1);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
            maxZoom: 20,
            minZoom: 1,
            attribution: 'OpenStreetMap'
        }).addTo(map);;

        //function for putting marker whereever user taps

    map.on('click', function(event){
        var location = event.latlng;
        userGuess = location;

        if (marker1){
            marker1.remove();
        }
        marker1 = L.marker([location.lat, location.lng]).addTo(map);
        
            
        
    })

        loadRandomPhoto(); //loads the map and calls function for random photo
    }

    //function for loading random photo

    function loadRandomPhoto(){
         randomIndex = Math.floor(Math.random()* photos.length); //math random will generate a number between 0 and 1. that will be multiplied by the total number of images in the array, and the number will be rounded down. the results are number from 0 the the length of the array-1.

        const photo = photos[randomIndex];//uses this random number to open the photo array and pull an image

        document.querySelector('#photo').src = photo.src; //changes the source of the photo in the game div to the photo in the array

        currentLocation = {lat: photo.lat, lng: photo.lng}; //the correct answer is set to the latlng in the original img src
    }

    function metersToMiles(meters){
        return meters *  0.00062137;
    }

    // function for letting the user guess

    document.querySelector('#guessButton').addEventListener('click',function(event) {
        event.preventDefault();
        //next step get location on tap, place marker on location, update userguess to this location

        // userGuess = map.getCenter(); //gets user guess by taking the latlng of what is in the center of the map. It would be better to add a marker on click and get the latlng from that marker.

        calculateResult(userGuess); //returns this value for use in a function called calculate results
    });

    function calculateResult(guess){//calls a function and redefines the variable from User guess to guess
        const distanceInMeters = map.distance(
            [currentLocation.lat, currentLocation.lng],
            [guess.lat, guess.lng],
            
        );

        const distance = metersToMiles(distanceInMeters);

        guessCount++;
        if (guessCount<=3){
        
            if (distance>1000 && guessCount===1){
                document.querySelector('#result').innerHTML = `Try again! You are ${Math.round(distance)} miles from the location.`;  
                hint1.innerHTML=  `Hint 1: ${photos[randomIndex].hint1}`;        
                }
            else if (distance>1000 && guessCount===2){
                document.querySelector('#result').innerHTML = `One More try! You are ${Math.round(distance)} miles from the location.`;
                hint2.innerHTML= `Hint 2: ${photos[randomIndex].hint2}`;
            }

            else{
        
            guessLine = [
                [currentLocation.lat, currentLocation.lng],
                [userGuess.lat, userGuess.lng]
            ];
            const polyline = L.polyline(guessLine, {color: 'red'}).addTo(map);
            let marker2 = L.marker([currentLocation.lat, currentLocation.lng],{color: 'green'}).addTo(map);
            document.querySelector('#result').innerHTML = `Distance from the actual location: ${Math.round(distance)} miles.`;
            map.fitBounds(polyline.getBounds());
        }
    }
}
    

    startMap();
})();