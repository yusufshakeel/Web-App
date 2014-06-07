var r,g,b;  //value from input
var rh='00',gh='00',bh='00';   //RGB value in hex
var clrdiv = document.getElementById('color');

//get RGB
function getRed(v){
    r = parseInt(v);
    document.getElementById('redval').innerHTML = r;
    rh = (r < 16) ? "0"+r.toString(16) : r.toString(16);
    paint();
}

function getGreen(v){
    g = parseInt(v);
    document.getElementById('greenval').innerHTML=g;
    gh = (g < 16) ? "0"+g.toString(16) : g.toString(16);
    paint();
}

function getBlue(v){
    b = parseInt(v);
    document.getElementById('blueval').innerHTML=b;
    bh = (b < 16) ? "0"+b.toString(16) : b.toString(16);
    paint();
}

//change color
function paint(){
    var c = (rh+gh+bh).toUpperCase();
    document.getElementById('color').style.backgroundColor='#'+c;
    document.getElementById('colorhex').innerHTML=c;
}

