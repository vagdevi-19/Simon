var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var clickedpattern=[];
var level=1;
var started=false;
$("#start").click(function(){
    level=1;
    started=false;
    gamepattern=[];
    started=true;
    $("#start").hide();
    setTimeout(function() { nextSequence(); },500) 
    $("#level-title").text("Level "+level);
});
function nextSequence(){
    clickedpattern=[];
    var randomcolor=buttoncolors[Math.floor(Math.random()*4)];
    gamepattern.push(randomcolor);
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
    $("#level-title").text("Level "+(level++));
}
$(".btn").click(function(){
    if(started){
        var choosencolor=$(this).attr("id");
        playSound(choosencolor);
        anima(choosencolor);
        clickedpattern.push(choosencolor);
        checkanswer(clickedpattern.length-1);
    }
});
function checkanswer(level){
    if(gamepattern[level]===clickedpattern[level]) {
        if(gamepattern.length===clickedpattern.length){
            setTimeout(function() {
                nextSequence();
            },1000)
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over - Press RESTART button to restart");
        setTimeout(function(){ $("body").removeClass("game-over")},300);
        $("#start").show().text("RESTART").css("background-color","purple");
    }
}
// function startOver(){
//     level=1;
//     gamepattern=[];
//     started=false;
// }
// $(document).keypress(function(){
//     if(!started){
        
//         nextSequence();
//         strarted=true;
//     }
// });
function anima(randomcolor) {
    $("#"+randomcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+randomcolor).removeClass("pressed");
    },100);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}