let p1_bullets=1;
const super_div = document.getElementById("super");
const aim= document.getElementById("aim");
const writeEvent = (text) => {
 const parent = document.querySelector('#action-message');
 const el = document.createElement('li');
 el.innerHTML = text;

 parent.appendChild(el);
};
const changeP1Bullets = (text) => {
 const bullets = document.querySelector('#bullets');
 console.log(text);
 bullets.innerHTML = text;
 p1_bullets=text;
 if(p1_bullets<=0){
  remove_aim();
}
else {
  add_aim();
}
if(p1_bullets>=4)
{
 add_bomb();
}
};
const changeP2Bullets = (text) => {
 const bullets = document.querySelector('#enemy_bullets');
 bullets.innerHTML ="Enemy bullets: "+ text;
};

const changeP1Score = (text) => {
console.log(text);
 const p1score = document.querySelector("#user-score");
 p1score.innerHTML = text;
}
const changeP2Score = (text) => {
 const p2score = document.querySelector("#computer-score");
 p2score.innerHTML = text;
}
const onFormSubmitted = (e) => {
 e.preventDefault();

 const input = document.querySelector('#chat');
 const text = input.value;
 input.value = '';
 
 sock.emit('message',text);
};

const addEventListeners = () => {
  const button = document.getElementById('reload');
  button.addEventListener('click',_listener1,true);
  const button2 = document.getElementById('shield');
  button2.addEventListener('click',_listener2,true);
  const button3 = document.getElementById('aim');
  button3.addEventListener('click',_listener3,true);
};
function add_aim()
{
 aim.addEventListener('click',_listener3,true);
}
function add_bomb()
{
 document.getElementById("super").classList.add('red-glow');
 super_div.addEventListener('click',_listener4,true);
}
var _listener1 = function(){
sock.emit('turn','reload');
}
var _listener2 = function()
{
sock.emit('turn','shield');
}
var _listener3 = function()
{
sock.emit('turn','aim');
}
var _listener4 = function()
{
sock.emit('turn','bomb');
}

function remove_aim()
{
aim.removeEventListener('click',_listener3,true);
}
function remove_bomb()
{
document.getElementById("super").classList.remove('red-glow');
super_div.removeEventListener('click',_listener4,true);
}
writeEvent('Welcome to Cowboy');

const sock = io();
sock.on('message',writeEvent);
sock.on('bullets',changeP1Bullets);
sock.on('bullets2',changeP2Bullets);
sock.on('score',changeP1Score);
sock.on('score2',changeP2Score);
sock.on('win',remove_bomb);
document.querySelector('#chat-form').addEventListener('submit',onFormSubmitted);
console.log(p1_bullets);
if(p1_bullets>0){
addEventListeners();
}

