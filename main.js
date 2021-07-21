var song="";
function preload() {
    song=loadSound("music.mp3");
}
var scoreRwrist=0;
var scoreLwrist=0;
rightwristX=0;
leftwristX=0;
rightwristY=0;
leftwristY=0;
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded() {
    console.log("posenet is initialized");

}
function gotPoses(results) {
    if(results.length>0){
    console.log(results);
    scoreRwrist=results[0].pose.keypoints[10].score;
    scoreLwrist=results[0].pose.keypoints[9].score;
console.log("score right wrist"+scoreRwrist+"score left wrist"+scoreLwrist);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("right wrist x"+rightwristX+"right wrist y"+rightwristY);
leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log("left wrist x"+leftwristX+"left wrist y"+leftwristY);
    }
}
function draw() {
image(video,0,0,600,500);
fill("#EF476F");
stroke("#EF476F");
if (scoreRwrist>0.2) {
    circle(rightwristX,rightwristY,20);
    if (rightwristY>0&&rightwristY<=100) {
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristY>100 &&rightwristY<=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(rightwristY>200 &&rightwristY<=300){
document.getElementById("speed").innerHTML="speed = 1.5x";
song.rate(1.5);
    }
    else if (rightwristY>300 && rightwristY<=400) {
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }
    else{
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
}
if(scoreLwrist>0.2){
    circle(leftwristX,leftwristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);
}
}
function play() {
song.play();
song.setVolume(1);
song.rate(1);   
}
