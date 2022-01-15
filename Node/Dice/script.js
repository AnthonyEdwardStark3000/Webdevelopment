// alert("Dice");
var player1=Math.floor(Math.random()*6)+1;
// var player2=Math.floor(Math.random()*6)+1;
var diceImage="dice"+player1+".png";
console.log(diceImage);
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src",diceImage);



var player2=Math.floor(Math.random()*6)+1;
var diceImage2="dice"+player2+".png";
console.log(diceImage2);
var image2=document.querySelectorAll("img")[1];
image2.setAttribute("src",diceImage2);

player1>player2?document.querySelector("h1").innerHTML="player1 wins":document.querySelector("h1").innerHTML="player2 wins";
