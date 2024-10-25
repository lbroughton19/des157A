(function(){

    function calculateResult(){
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5){
        document.getElementById('result').innerHTML = "Please answer all of the questions"
        return;
    }

    let jazzCount = 0;
    let popCount = 0;
    let hipHopCount = 0;

    const incrementCount = (genre) =>{
        if (genre === "Jazz") jazzCount++;
        else if (genre === "Pop") popCount++;
        else if (genre ==="Hip-Hop") hipHopCount++;
    } 

    incrementCount(q1.value);
    incrementCount(q2.value);
    incrementCount(q3.value);
    incrementCount(q4.value);
    incrementCount(q5.value);

    let result = '';
    if (jazzCount >= popCount && jazzCount >= hipHopCount){
        result="Jazz";    
    } else if (popCount >= jazzCount && popCount >= hipHopCount){
        result="Pop";
    } else {
        result= "Hip-Hop";
    }

    
    document.getElementById(`${result}`).classList.remove("hidden");
    document.getElementById(`${result}`).classList.add("overlay");

}
window.calculateResult = calculateResult;

const clsButtons = document.querySelectorAll('.close');
    for (let i = 0; i < clsButtons.length; i++) {
        clsButtons[i].addEventListener('click', function(event){
            event.preventDefault();
            const activeOverlay = document.querySelector('.overlay');
            if (activeOverlay) {
                activeOverlay.classList.add('hidden');
                activeOverlay.classList.remove('overlay');
            }
        });
    }

})();