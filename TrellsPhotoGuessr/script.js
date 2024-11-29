(function (){
    const game = document.querySelector('#game');
    let map; 
    let photo;
    let direction = "";
    let currentLocation; //this will be the correct locations of the photos
    let userGuess; // storing the users guess
    let guessLine;
    let marker1 = null;
    let guessCount = 0;
    const startBtn = document.querySelector('#start');
    const playAgainBtn = document.querySelector('#playAgain');
    const intro = document.querySelector('#intro');
    const hint1 = document.querySelector('#hint1');
    const hint2 = document.querySelector('#hint2');
    let randomIndex;
    const zoomImage = document.querySelector('.zoom-image');
    const zoomLens = document.querySelector('.zoom-lens');
    let score= 0;
    let maxScore=0;
    let maxPoints = 100;
    let round=0; 
    let difference = 0;
    const scoreCounter = document.querySelector('#scoreCounter');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    
    //putting all photos into an array with latlng
    let photos = [
        {src: 'worldImages/8T0A0007.jpg', lat: -12.091318091867835, lng: -77.0858359339036, 
            hint1:"Sunsets Abound: People flock for this iconic view all along this 20km Pacific Highway.",
            hint2:"Stay Active: If surfing isn't your thing, nearby Costa Verde-San Miguel Park.",
            location:"Lima, Peru.",
            description:"Circuito de Playas de la Costa Verde is a 13-mile coastal highway. It connects various neighborhoods in Lima while providing scenic views and beach access."}, //Circuito de playas de la Costa Verde
        
        {src: 'worldImages/IMG_9879.jpg', lat: 5.1037001815250695, lng: -1.2407487631389815, 
            hint1:"Complex Histories: This city's identity is deeply influenced by its colonial era, which ended in 1957.",
            hint2:"Golden Hues: This country is known as the 'Land of Gold' due to its long association with gold production and trade.",
            location:"Cape Coast, Ghana.",
            description:"Cape Coast is a major city on Ghana's Atlantic Coast. It has a long history as a fishing community."}, //Cape Coast Sunset
        
        {src: 'worldImages/IMG_7968.jpg', lat: -3.353205785972626, lng: 36.860404014150845, 
            hint1:"Tucked in Treetops: Black and white colobus monkeys have been observed up to 50 feet between trees.",
            hint2:"Goin' Bananas: These monkeys have been known to eat the local corn crops, much to the annoyance of the local farmers (who call them 'kima').",
            location:"Arusha, Tanzania.",
            description:"Black and white colobus monkeys are common in East African countries including Kenya and Tanzania. They usually live in groups of 3-15 members."}, //Black and White Colobus Monkey in Usa River, Tanzania
        
        {src: 'worldImages/IMG_4692.jpg', lat: -3.4704, lng: 37.1865, 
            hint1:"A Real Life Oasis?!: This natural hot spring near the town of Boma Ng'ombe is tucked away in the otherwise dry landscape.",
            hint2:"(Not So) Hot Springs: The waters come from the melted runoff of Kilimanjaro, making for a cool swim.",
            location:"Kikuletwa Hot Springs, Tanzania.",
            description:"Kikuletwa (or Maji Moto) is a natural oasis in the semi-arid Kilimanjaro region of Northern Tanzania. It is a popular location for swimming, day trips, and relaxing."}, //Maji Moto Hot Springs
        
        {src: 'worldImages/IMG_4755.jpg', lat: 6.2238, lng: -75.568, 
            hint1:"They eat what?: Common food in this mountainous country includes arepas, ceviches, and buñuelos.",
            hint2:"Here and There: Traffic can get pretty hectic in this major city. I wonder where the buses are going?",
            location:"Medellín, Colombia.",
            description:"Medellín has a population of 2.5 million people, making it the second largest city in Colombia. The city has heavily invested in public transport to improve traffic congestion."}, //Medellin City Scape
        

        // {src: 'worldImages/IMG_4935.jpg', lat: 35.5210, lng: 35.5210, 
        //     hint1:"this country is known for its appreciation of llamas",
        //     hint2:"this country is known for its appreciation of llamas"}, //Bones picked clean at home

        {src: 'worldImages/IMG_5457.jpg', lat: 35.6895, lng: -75.1595, 
            hint1:"They eat what?: Common food in this mountainous country includes arepas, ceviches, and buñuelos.",
            hint2:"Here and There: Traffic can get pretty hectic in this major city. I wonder where the buses are going?",
            location:"Guatapé, Colombia.",
            description:"Guatapé is a town famous for its vibrant and colorful buildings. It has been nicknamed 'The Most Colorful Town in Colombia.'"}, //Guatapé Village
        
        {src: 'worldImages/IMG_5732.jpg', lat: 6.21859085470124, lng: -75.178592, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Guatapé, Colombia.",
            description:"Peñol Rock (La Piedra del Peñol) is a granite structure that rises 220 meters (720 feet) above the local landscape. People visit year-round for the panoramic views at the peak."}, //Guatapé Rock (Piedra del Peñol)
        
        {src: 'worldImages/IMG_8025.jpg', lat: -3.3582325516138027, lng: 36.903390883526, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Usa River, Tanzania.",
            description:"Usa River is a rural location located between Arusha and Kilimanjaro. Travelers commonly use it as a base of operations for touristic trips."}, //Usa River Roadside
        
        {src: 'worldImages/IMG_8087.jpg', lat: -3.346722361031439, lng: 36.89130306200241, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Imbaseni, Tanzania.",
            description:"These children in uniform are students from Imbaseni Primary School. Subjects include Swahili, mathematics, science, social studies, and English."}, //Imbaseni Primary School Kids
        
        {src: 'worldImages/IMG_9833.jpg', lat: 5.1037001815250695, lng: -1.2407487631389815, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Cape Coast, Ghana.",
            description:"Cape Coast has a deep and complicated colonial history. This image is taken at one of the dungeons located on the Atlantic coast."}, //Cape Coast Afternoon
        
        {src: 'worldImages/IMG_9857.jpg', lat: 5.103678808925347, lng: -1.2403196096965987, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Cape Coast, Ghana. It is a communal activity that many families rely on for income.",
            description:"Cape Coast has been a core fishing destination for centuries."}, //Cape Coast Canoes
        
        {src: 'worldImages/IMG_1809.jpg', lat: 25.28640380026731, lng: -308.4688925745286, 
            hint1:"This country is known for its appreciation of llamas.",
            hint2:"This country is known for its appreciation of llamas.",
            location:"Doha, Qatar.",
            description:"Souq Waqif Night Market has a history stretching back a century. It's a popular destination for enjoying art, food, and performances."}, //Doha Street Art/Souq Waqif Night Market
        
        {src: 'worldImages/IMG_1828.jpg', lat: 25.29173267843082, lng: -308.4599018105655, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Doha, Qatar.",
                description:"This wood engraving is of an ancient Persian soldier. The headdress implies association with warriors from the Achaemenid Empire (~550-330 BCE)."}, //Doha Persian Soldier Wood Engraving
            
        {src: 'worldImages/IMG_4602.jpg', lat: 6.196384386093956, lng: -75.5740106106896, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Medellín, Colombia.",
                description:"La Feria de las Flores (Festival of Flowers) takes place every August in Medellín since 1957. The festival celebrates the flower industry, which thrives in Medellín due to its climate and soil."}, //Medellín Flower Festival in Santa Fe
            
        {src: 'worldImages/IMG_0842.jpg', lat: 6.875301514437493, lng: -1.4447593706427144, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Kumasi, Ghana.",
                description:"Kumasi is the cultural homeland of the Ashanti kingdom, one of the oldest and most prominent in Africa. It is the origin of Kente cloth, known around the world as a symbol of cultural pride and identity."}, //King in Kumasi
            
        {src: 'worldImages/IMG_0235.jpg', lat: 5.64536911415853, lng: -0.18849134467018305, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Accra, Ghana.",
                description:"The Wulumoi people are an indigenous sub-community amongst the Ga people of Ghana. They are seen as keepers of sacred traditions that connect the Ga people to their ancestral heritage."}, //Betty in Accra
            
        {src: 'worldImages/8T0A0114.jpg', lat: -12.046109346953921, lng: -77.0296329260418, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Lima, Peru.",
                description:"The Archbishop's Palace is a Baroque-style building made during Peru's colonial era. The original building was constructed in the 16th century, but the current version was constructed in 1924."}, //Archbishop's Palace Lima
            
        {src: 'worldImages/8T0A0120.jpg', lat: -12.045259446084952, lng: -77.02746570115778, 
                hint1:"This country is known for its appreciation of llamas.",
                hint2:"This country is known for its appreciation of llamas.",
                location:"Lima, Peru.",
                description:"This shrine was built in the 17th century to house an image of the Virgin Mary. It is an important site for religious celebrations, especially Holy Week."}, //Shrine of Our Lady of Solitude (Santuario de Nuestra Señora de Soledad)
            
        {src: 'worldImages/8T0A0276.jpg', lat: -13.835069277562093, lng: -76.25331580644344, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"Paracas, Peru.",
                    description:"Paracas is the site of the Paracas civilization, which existed from 800 to 100 BCE. Today, it is a popular destination for adventure tourism including kite surfing and sandboarding."}, //Paracas Beach
                
        {src: 'worldImages/8T0A0337.jpg', lat: -13.855413905892132, lng: -76.28531456080964, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"Paracas, Peru.",
                    description:"The Paracas Candelabra is a 180 m tall geoglyph, etched into a hillside. Its original purpose is unknown, but some theories have linked it with the Nazca Lines."}, //Paracas Candelabra
                
        {src: 'worldImages/8T0A4585.jpg', lat: 37.802341368509886, lng: -122.40583062182851, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"San Francisco, California.",
                    description:"The San Francisco Skyline as seen from Coit Tower. You can see both Fisherman's Wharf and the Golden Gate Bridge from this panoramic view."}, //San Francisco Skyline
                
        {src: 'worldImages/8T0A4645.jpg', lat: 37.805172690644405, lng: -122.46499300024882, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"San Francisco, California.",
                    description:"Crissy Field is part of the Golden Gate National Recreation Area. It is a popular destination for kite flying, windsurfing, and stargazing."}, //Crissy Field/ Golden Gate Park
                
        {src: 'worldImages/8T0A4673.jpg', lat: 47.64571602127689, lng: -122.33422636996696, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"Seattle, Washington.",
                    description:"The Seattle skyline is one of the most notable views in the United States. It is distinguished by the Space Needle, a 605 ft. skyscraper built for the 1962 World's Fair."}, //Seattle Space Needle
                
        {src: 'worldImages/8T0A4674.jpg', lat: 47.64571602127689, lng: -122.33422636996696, 
                    hint1:"This country is known for its appreciation of llamas.",
                    hint2:"This country is known for its appreciation of llamas.",
                    location:"Seattle, Washington.",
                    description:"Gas Works Park was built on the foundation of the former Seattle Gas Light Company plant. This formerly polluted site has been transformed into a popular location for locals, travelers, and photographers."}, //Seattle Gas Works
                
        {src: 'worldImages/8T0A5292.jpg', lat: 47.606155810240736, lng: -122.34249651437494, 
                        hint1:"This country is known for its appreciation of llamas.",
                        hint2:"This country is known for its appreciation of llamas.",
                        location:"Seattle, Washington.",
                        description:"Mt. Rainier is a 14,110 ft. tall stratovolcano located in Washington State. On clear days, Mt. Rainier is an ever-present feature of the Seattle skyline."}, //Seattle Mt. Rainier
                    
        {src: 'worldImages/8T0A0078.jpg', lat: -12.04262053920696, lng: -77.03522399069244, 
                        hint1:"This country is known for its appreciation of llamas.",
                        hint2:"This country is known for its appreciation of llamas.",
                        location:"Lima, Peru.",
                        description:"Santa Rosa de Lima (1586-1617) is the first Catholic saint of the Americas, and the patron saint of Peru. She was known for her love of nature, and her sanctuary honors this with its tended gardens and peaceful atmosphere."}, //Santuario de Santa Rosa de Lima
                    
        {src: 'worldImages/8T0A0097.jpg', lat: -12.044729568255836, lng: -77.03123062851773, 
                        hint1:"This country is known for its appreciation of llamas.",
                        hint2:"This country is known for its appreciation of llamas.",
                        location:"Lima, Peru.",
                        description:"La Casa de la Gastronomía Peruana (House of Peruvian Gastronomy) is a museum dedicated to the culinary history of Peru, which is considered one of the world's premier destinations for food. The museum explores the country's history with dishes like ceviches, potatoes, and fusion dishes."}, //Casa de la Gastronomía Peruana
                    
        {src: 'worldImages/8T0A0107.jpg', lat: -12.047169096120564, lng: -77.03145682817195, 
                        hint1:"This country is known for its appreciation of llamas.",
                        hint2:"This country is known for its appreciation of llamas.",
                        location:"Lima, Peru.",
                        description:"Box balconies are a signature element of Lima, constructed during its colonial and early republican periods. Lima is home to 1,600 such balconies."}, //Box Balconies of Central Lima
                    
        {src: 'worldImages/8T0A0109.jpg', lat: -12.047022200446197, lng: -77.02983677392696, 
                        hint1:"This country is known for its appreciation of llamas.",
                        hint2:"This country is known for its appreciation of llamas.",
                        location:"Lima, Peru.",
                        description:"The Lima Metropolitan Cathedral began construction in 1535, making it one of the oldest churches in the Americas. It houses many works of art and the Tomb of Francisco Pizarro"}, //Lima Metropolitan Cathedral
                    ];

    //dismisses start screen and starts game when user presses button 

    startBtn.addEventListener('click', function(){
        intro.classList.add('hidden');
        game.classList.remove('hidden');
        startMap();
        playAgainBtn.classList.add('hidden');
        
        maxScore = maxScore + maxPoints;
    });



    
    // initializes map
    function startMap(){
    map=L.map('map').setView([0, 0], 1);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' , { attribution: '© Esri & contributors',
        minZoom: 1
    }).addTo(map);

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

        photo = photos[randomIndex];//uses this random number to open the photo array and pull an image

        document.querySelector('#photo').src = photo.src; //changes the source of the photo in the game div to the photo in the array

        document.querySelector('#smallPhoto').src = photo.src;//updates photo in round end overlay, refer to resultOverlay function.

        
        document.querySelector('#smallPhoto').innerHTML = `${photos[randomIndex].src}`;
        document.querySelector('#location').innerHTML=`You are in <span style="color: #c19613; font-size: 24px;">${photos[randomIndex].location}</span>`;
        document.querySelector('#description').innerHTML = `${photos[randomIndex].description}`;


        currentLocation = {lat: photo.lat, lng: photo.lng}; //the correct answer is set to the latlng in the original img src
        // console.log(`${photo.src}`);
        // console.log(photos.length);
        zoomLens.style.backgroundImage = `url(${photo.src})`;//for zoom overlay
        photos.splice(randomIndex, 1);//splice is taking the argument of the elemen t you want o start deleting, and how many elemnts from there. Random index sets the number, and we only want to delete one.
        
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

    //function for updating score after guesses and showing user
    function updateScore(){
        scoreCounter.innerHTML=`${score}/${maxScore}`;
    }

    function calculateResult(guess){//calls a function and redefines the variable from User guess to guess
        const distanceInMeters = map.distance(
            [currentLocation.lat, currentLocation.lng],
            [guess.lat, guess.lng],
            
        );

        const distance = metersToMiles(distanceInMeters);

        guessCount++;
        if (guessCount<=3){
        
            if (distance>500 && guessCount===1){
                //this is where i would put the logic for checking if you are further away north/sputh or east/west
                //compare absolute valuse of guess and current latlng, which will narrow down to say north/sout or east west
                //then compare which value is greater to print north/south or east/west

                if (Math.abs(photo.lat - guess.lat)>Math.abs(photo.lng - guess.lng)){
                    if (photo.lat > guess.lat){
                        direction = "North";
                    }

                    else{
                        direction = "South";
                    }
                }

                else {
                    if (photo.lng > guess.lng){
                        direction = "East";
                    }

                    else{
                        direction = "West";
                    }
                }

                document.querySelector('#result').innerHTML = `You are ${Math.round(distance)} miles away! Try going <strong>${direction}</strong>.`;  
                // hint1.innerHTML=  `Hint 1: ${photos[randomIndex].hint1}`;        
                }
            else if (distance>500 && guessCount===2){
                if (Math.abs(photo.lat - guess.lat)>Math.abs(photo.lng - guess.lng)){
                    if (photo.lat > guess.lat){
                        direction = "North";
                    }

                    else{
                        direction = "South";
                    }
                }

                else {
                    if (photo.lng > guess.lng){
                        direction = "East";
                    }

                    else{
                        direction = "West";
                    }
                }

                document.querySelector('#result').innerHTML = `One More try! You are ${Math.round(distance)} miles away! Try going <strong>${direction}</strong>.`;
                // hint2.innerHTML= `Hint 2: ${photos[randomIndex].hint2}`;
            }

            else{
                //function for ending round
            guessLine = [
                [currentLocation.lat, currentLocation.lng],
                [userGuess.lat, userGuess.lng]
            ];
            const polyline = L.polyline(guessLine, {color: 'red'}).addTo(map);
            let marker2 = L.marker([currentLocation.lat, currentLocation.lng],{color: 'green'}).addTo(map);

            //add round
            round++;

            //update score
            score = Math.max(0, 100 - Math.floor(distance*.2));//without having a floor of zero, scores can easily become negative

            //updates score in roundresults overlay
            document.querySelector('h2').innerHTML = `You Scored <span style="color: #c19613; font-size: 24px;">${score}</span> points!`;

            maxScore = maxPoints * round;

            //player feedback
            document.querySelector('#result').innerHTML = `Distance from the actual location: ${Math.round(distance)} miles. You scored ${score} points!`;
            map.fitBounds(polyline.getBounds());

            

            playAgainBtn.classList.remove('hidden');

            //run function for updating inner html of score
            updateScore();

            //Rrun function for result overlay
            resultOverlay();
        }
    }
}

    //function for round end overlay

    function resultOverlay(){
        const roundResults = document.querySelector('#roundResults');
        const closeInner = document.querySelector('#closeInner');
        
        
        roundResults.classList.remove('hidden');
        roundResults.classList.add('visible');

        //component for closing overlay without playing again
        closeInner.addEventListener('click', function(){
            roundResults.classList.remove('visible');
            roundResults.classList.add('hidden');
        })

        //function for looping game
        document.querySelector('#playAgainInner').addEventListener('click', function(){
        // Reset guess count and hints
           guessCount = 0;
           document.querySelector('#result').innerHTML = ''; // Clear result text
           hint1.innerHTML = '';
           hint2.innerHTML = '';

           // Clear any existing markers and polylines from the previous round
           if (marker1) {
               marker1.remove();
               marker1 = null;
           }
           map.eachLayer(function(layer) {
               if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                   map.removeLayer(layer);
               }
           });

         

           

           // Load a new random photo
           // loadRandomPhoto();

           // Hide the "Play Again" button until the round ends
           playAgainBtn.classList.remove('visible');
           playAgainBtn.classList.add('hidden');

           roundResults.classList.remove('visible');
           roundResults.classList.add('hidden');


           // reset zoom level or re-center the map
           map.setView([6.2176, -75.5821], 1);
               
               map.remove();
               startMap();
           })
        
    }

    //function for looping game
    playAgainBtn.addEventListener('click', function(){
         // Reset guess count and hints
            guessCount = 0;
            document.querySelector('#result').innerHTML = ''; // Clear result text
            hint1.innerHTML = '';
            hint2.innerHTML = '';

            // Clear any existing markers and polylines from the previous round
            if (marker1) {
                marker1.remove();
                marker1 = null;
            }
            map.eachLayer(function(layer) {
                if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                    map.removeLayer(layer);
                }
            });

          

            

            // Load a new random photo
            // loadRandomPhoto();

            // Hide the "Play Again" button until the round ends
            playAgainBtn.classList.add('hidden');

            // reset zoom level or re-center the map
            map.setView([6.2176, -75.5821], 1);
                
                map.remove();
                startMap();
            })
    // function for enlarging photo on click
        document.querySelector('#photo').addEventListener('click', function(){
            const overlay = document.querySelector('.overlay');
            const image = overlay.querySelector('img');
            
            overlay.classList.remove('hidden'); // Make sure overlay is visible
            image.src = document.querySelector('#photo').src; // Copy the image source
        });

    // function for closing enlarged photo

    document.querySelector(".close").addEventListener('click', function(event){
        const overlay = document.querySelector('.overlay');
        const image = overlay.querySelector('img');

        overlay.classList.add('hidden');
    });

    document.addEventListener('keydown', function(event){
        if (event.key === 'Escape'){
            const overlay = document.querySelector('.overlay');
            overlay.classList.add('hidden');
        }
    });

    // Event listeners for zoom effect
zoomImage.addEventListener("mousemove", moveLens);
zoomImage.addEventListener("mouseenter", showLens);
zoomImage.addEventListener("mouseleave", hideLens);

// Functions for showing, hiding, and moving the lens
function showLens() {
    zoomLens.style.display = "block";
}

function hideLens() {
    zoomLens.style.display = "none";
}

function moveLens(e) {
    const rect = zoomImage.getBoundingClientRect(); //gits width and height for image
    const lensSize = 150; // Size of the zoom lens
    const zoomFactor = 2.5; // Increase or decrease to control zoom intensity
    
    // Calculate mouse position relative to the image
    let x = e.clientX - rect.left - lensSize / 3.5;
    let y = e.clientY - rect.top - lensSize / 3.5;

    let offsetX = 40;
    let offsetY = 80;

    //logic for adjusting zoom lens if moving too far left or right

    if (x+ offsetX + lensSize > rect.width){//will activate if near right edge
        offsetX = -(offsetX) - lensSize;
    } else if (x<lensSize/2){//will activate if near left edge
        offsetX = 40;
    }

    //logic for adjusting zoom lens if moving too far top or bottom

    // if (y + offsetY + lensSize > rect.height) { // If near the bottom edge
    //     offsetY = -(offsetY) - lensSize; 
    // } else if (y < lensSize / 2) {  // If near the top edge
    //     offsetY = 0; 
    // }


    // Constrain the lens within image boundaries
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    // Position the zoom lens

    zoomLens.style.left = `${x+ offsetX}px`;
    zoomLens.style.top = `${y+ offsetY}px`; //adding values pushes closer to center, but there is the risk for going of screen, write code to flip direction
    zoomLens.style.width = `${lensSize}px`;
    zoomLens.style.height = `${lensSize}px`;

    // Set zoomed background position
    zoomLens.style.backgroundImage = `url(${zoomImage.src})`;
    zoomLens.style.backgroundSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`;
    zoomLens.style.backgroundPosition = `-${x * zoomFactor}px -${y * zoomFactor}px`;
    
    zoomLens.style.transition = "left 0.1s, top 0.1s";
}

if (!isTouchDevice) {
    zoomImage.addEventListener("mousemove", moveLens); 
    zoomImage.addEventListener("mouseenter", showLens);
    zoomImage.addEventListener("mouseleave", hideLens);
    document.querySelector('#tip2').style.display="none";
}

})();