

// button click
var a=document.querySelectorAll(".drum").length;



for(var i=0;i<a;i++)
document.querySelectorAll(".drum")[i].addEventListener(
  "click",function(){
    // console.log(this.innerHTML);
    // this.style.color = "Orchid";
    var a= this.innerHTML;
    console.log(a);
makeSound(a);
buttonAnimation(a);
  })
    function makeSound(key){
    switch (key) {
      case "w":
      case "W":
      var audio = new Audio("./Sounds/sounds_crash.mp3");
      audio.play();
        break;
      case "a":
      case "A":
      var audio = new Audio("./Sounds/sounds_kick-bass.mp3");
      audio.play();
      break;
      case "s":
      case "S":
      var audio = new Audio("./Sounds/sounds_snare.mp3");
      audio.play();
        break;
      case "d":
      case "D":
      var audio = new Audio("./Sounds/sounds_tom-1.mp3");
      audio.play();
      break;
      case "j":
      case "J":
      var audio = new Audio("./Sounds/sounds_tom-2.mp3");
      audio.play();
        break;
        case "k":
        case "K":
        var audio = new Audio("./Sounds/sounds_tom-3.mp3");
        audio.play();
        break;
        case "l":
        case "L":
        var audio = new Audio("./Sounds/sounds_tom-4.mp3");
        audio.play();
        break;
      default:
}

function buttonAnimation(currentKey){
  var activeButton=document.querySelector("."+currentKey);
  activeButton.classList.add("pressed");
}
    }

    // var audio = new Audio("./Sounds/sounds_crash.mp3");
    // audio.play();

  // key press
  document.addEventListener("keypress",function(event){
    // buttonAnimation(event.key);
    console.log(event.key);
  makeSound(event.key)});
