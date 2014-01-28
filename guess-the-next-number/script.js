//variables
var score, guessRemaining, aiNum;

//functions

function reset(){
    score = 0;
    guessRemaining = 5;
    document.getElementById('score').innerHTML=score;
    document.getElementById('guess-remaining').innerHTML=guessRemaining;
    document.getElementById('ai-number').innerHTML='';
    document.getElementById('user-number').innerHTML='';
    document.getElementById('msg').innerHTML='Start';
    document.getElementById('result').innerHTML='';
    ai();
};

function ai(){
    aiNum = Math.floor(Math.random()*9)+1;
};

function user(n){
    document.getElementById('user-number').innerHTML=n;
    if(n==aiNum){
        score++;
        document.getElementById('msg').innerHTML='Correct <br> Make a new guess.';
    }else{
        document.getElementById('msg').innerHTML='Wrong <br> Make a new guess.';
    }
    guessRemaining--;
    displayResult();
};

function displayResult(){
    document.getElementById('ai-number').innerHTML=aiNum;
    document.getElementById('score').innerHTML=score;
    document.getElementById('guess-remaining').innerHTML=guessRemaining;
    if(guessRemaining==0){
        document.getElementById('result').innerHTML='Your score: '+score+' out of 5<br>Click RESET to play again.';
    }else{
        ai();
    }
};