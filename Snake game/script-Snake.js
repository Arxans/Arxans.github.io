var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
 // Создание нового объекта изображения Яблочка
var img = new Image(); 
img.src = 'Apple.png';
 // Создание нового объекта изображения Головы Змейки
var headUp = new Image(); 
headUp.src = 'headUp.png'; 


var keyUp = document.getElementById('keyUp');
var keyLeft = document.getElementById('keyLeft');
var keyRight = document.getElementById('keyRight');
var keyDown = document.getElementById('keyDown');

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName("close")[0];

through_walls.checked = true;

var snake = [{x:Math.floor(Math.random() * 16),		//Random [0..15]
	      y:Math.floor(Math.random() * 13)}];
addTreeElToSnake();
var fruit = {};
var	score = 0;
var dirrect = '';
var timer = 300;
var startDirrect = true;
var blockKey = false;

createFruit();
game();



function game() {
	ctx.clearRect(0, 0, 632, 632);
	snakeCollision(); 
	drawFruit();
	drawSnake();
	restartCollision();
	drawScore();
	setTimeout('game()', timer);
}

// Добавление 2ух клеток к хвосту
function addTreeElToSnake() {
	var x = snake[0].x;
	var y = snake[0].y;
	for (var i = 0; i < 2; i++){
		y += 1;
		var obj = {};
		obj.x = x;
		obj.y = y; 
		snake.push(obj);
	}
}

//Перезапуск игры
function restartGame(){
	dirrect='';
	timer = 300;
	startDirrect = true;
	snake = [{x:10, y:10}];
	addTreeElToSnake();
	createFruit();
	score=0;
}

//Если змейка встречает свой хвост
function restartCollision() {
	var x = snake[0].x;
	var y = snake[0].y;
	for (var i = 1; i < snake.length; i++)
		if (x == snake[i].x && y == snake[i].y) {
			openModal();
			setTimeout('restartGame()', 2000);
		}
}

//Столкновение змейки с фруктом
function snakeCollision() {
	var x = snake[0].x;
	var y = snake[0].y;
	if (dirrect == 'left') x -= 1; 
	else if (dirrect == 'right') x += 1;
		 else if (dirrect == 'up') y -= 1;
		 	  else if (dirrect == 'down') y += 1;
	if (fruit.x == x && fruit.y == y) {
		var obj = {};
		obj.x = x;
		obj.y = y;
		snake.unshift(obj);
		createFruit();
		score += 10; timer = timer - timer/10;
		return;
	}
	stepSnake();
}

//Обновление счета
function drawScore() {
	var board = document.getElementById('score');
	board.innerHTML = 'Счет: ' + score ;
}

//Передвижение змейки
function stepSnake() {
	var x = 0;
	var y = 0;
	var obj = {};
	obj.x = snake[0].x; 
	obj.y = snake[0].y;
	if (dirrect == 'left') x -= 1; 
	else if (dirrect == 'right') x += 1;
		 else if (dirrect == 'up') y -= 1;
		 	  else if (dirrect == 'down') y += 1;
	obj.x = wallCollision(obj.x + x);
	obj.y = wallCollision(obj.y + y);
	if (dirrect){
		snake.pop();
		snake.unshift(obj);
	}
}

//Функция проверяет на столкновение со стеной
function wallCollision(val) {
	if(through_walls.checked){
		if(val<0) val=15;
		if(val>15) val=0;
	}
	else{
		if(val<0 || val>15){
			openModal();
			if(modal.style.display == "block") 
				dirrect = '';
			restartGame();
		}
	}
	return val;
}

//Направление движения змейки при нажатии на клавиатуру
document.onkeydown = function(event) {
	if (event.keyCode == 37 && dirrect != 'right' && !blockKey) {
		dirrect = 'left';
		startDirrect = false;
	}
	if (event.keyCode == 38 && dirrect != 'down' && !blockKey) {
			dirrect = 'up';
			startDirrect = false;
	}
	if (event.keyCode == 39 && dirrect != 'left' && !blockKey) {
		dirrect = 'right';
		startDirrect = false;
	}
	if (event.keyCode == 40 && dirrect != 'up' && !startDirrect && !blockKey) dirrect = 'down';
}

//Отрисовка фрукта
function drawFruit() {
	var x = fruit.x * 40 + 2;
	var y = fruit.y * 40 + 2;
	ctx.drawImage(img, x-5, y-5, 35, 35);
}

//Создание фрукта
function createFruit() {
	var x = Math.floor(Math.random() * 16);		//Random [0..20]
	var y = Math.floor(Math.random() * 16);
	for (var i = 0; i < snake.length; i++) {
		if (x == snake[i].x && y == snake[i].y) {
			createFruit();
			return;
		}
	}
	fruit.x = x;
	fruit.y = y;
}

//Отрисовка змейки
function drawSnake() {
	ctx.fillStyle = 'maroon';
	var x = snake[0].x * 40 + 2;
	var y = snake[0].y * 40 + 2;
	ctx.drawImage(headUp, x-5, y-5, 40, 40);
	for(var i = 1; i < snake.length; i++) {
		 x = snake[i].x * 40 + 2;
		 y = snake[i].y * 40 + 2;
		ctx.fillRect(x-3, y-4, 35, 35);
	}
}

//Направление движения змейки при нажатии HTML кнопок
keyUp.onclick = function() {
	if (dirrect != "down") dirrect = 'up';
}
keyLeft.onclick = function() {
	if (dirrect != "right") dirrect = 'left';
}
keyRight.onclick = function() {
	if (dirrect != "left") dirrect = 'right';
}
keyDown.onclick = function() {
	if (dirrect != "up") dirrect = 'down';
}

// Окно Game Over
function openModal() {
	modal.style.display = "block";
	result.innerHTML = "Your score "+score+"!";
	blockKey = true;
}
span.onclick = function closeModal() {
	modal.style.display = "none";
	blockKey = false;
}
window.onclick = function (event) {
	if (event.target == modal){
		modal.style.display = "none";
	}
}
