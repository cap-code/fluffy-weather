let getdata,forecastdata;
let icon=[];
let url,url1;
let t,c,h,w;
let loading=true;
let counter=1;
let input;

function setup() {
createCanvas(800,900);
textAlign(RIGHT);
let button=select('#button');
button.mousePressed(getweather);
input=select('#location');
fileload();
}
function getweather(){
	url='https://api.openweathermap.org/data/2.5/weather?q='+input.value()+'&appid=dc7499b1c6351ec8aa8665f47eda58e6&units=metric';
  url1='https://api.openweathermap.org/data/2.5/forecast?q='+input.value()+'&appid=dc7499b1c6351ec8aa8665f47eda58e6&units=metric'
	loadJSON(url,gotdata,'jsonp');
	loadJSON(url1,againdata,'jsonp');
 }
function fileload(){
	for(var i=1;i<=4;i++){
	icon[i-1]=loadImage('icon'+i+'.png');
	counter++;
}
if(counter>=4){
	loading=false;
}

}

function gotdata(data){
getdata=data;
}
function againdata(data1){
	forecastdata=data1;
}
function draw() {
	randomSeed(5);
	stroke(255);
	fill(255);
	if(loading){
		background;
		strokeWeight(2);
		stroke(255);
		noFill();
		rect(10,10,200,50);
    noStroke();
		fill(255,100);
		w=200/100 *(counter*10);
		rect(10,10,w,50);
	}else{
	background(200);
	image(icon[0],50,300,100,100);
	image(icon[1],250,300,100,100);
	image(icon[2],450,300,100,100);
	image(icon[3],650,300,100,100);
	if(getdata){
   t=getdata.main.temp;
	 h=getdata.main.humidity;
	 c=getdata.clouds.all;
	 w=getdata.wind.speed;
	 textSize(100);
	 text(getdata.weather[0].main,500,200);
	  textSize(50);
    text(t+'c',135,450);
		text(c,335,450);
		text(h,535,450);
		text(w,735,450);

		}
		if(forecastdata){
			var s=550;
			push();
			textAlign(LEFT);
			textSize(20);
			for(var j=0;j<5;j++){
			text(forecastdata.list[j].dt_txt,50,s+2);
			text(forecastdata.list[j].weather[0].main,50,s+20);
			text('temp:'+forecastdata.list[j].main.temp+'c',50,s+40);
			s+=65;
			//console.log('this is happening');
		}
			pop();

		}
	}
}
