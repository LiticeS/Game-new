let game = document.querySelector('.game'),
	res = document.querySelector('.res'),
	btnGame = document.querySelector('.new-game'),
	count = 0,
    row = 20,
    column = 20,
    sizeOfCells = 20,
    colorOne = "DeepSkyBlue",
    colorTwo = "Red",
	blue = `<svg class="rect" width=${sizeOfCells}px height=${sizeOfCells}px>
        <rect width=${sizeOfCells}px height=${sizeOfCells}px fill=${colorOne} stroke="black" stroke-width="2" />
        </svg>`,
    restartPage = true;

//Задает размер игрового поля
game.style.width = `${column*sizeOfCells}px`;
game.style.height = `${row*sizeOfCells}px`;
//game.setAttribute('width', `${column*sizeOfCells}px`);
//game.setAttribute('height', `${row*sizeOfCells}px`);

//Создает column*row елементов div с классом ('Row:'+ x + 'Column:'+ y) и классом,
//обозначающим цвет прямоугольника внутри 
//в каждый div добавляется svg - синий прямоугольник 
for (var x=0; x<row; x++){
    for (var y=0; y<column; y++){
        var new_element = document.createElement('div');
        new_element.classList.add("field", colorOne);
        new_element.setAttribute('id', 'Row:'+ x + 'Column:'+ y);
        new_element.innerHTML = blue;
        new_element.style.width = `${sizeOfCells}px`;
        new_element.style.height = `${sizeOfCells}px`;
        document.getElementById('mainField').appendChild(new_element);
    }
}

// Выкрашивает 5% от созданных прямоугольников в красный
function newGame(){
    for (var i = 0; i<(Math.round(row*column*0.05)); i++)
        {var element = document.getElementById('Row:'+ Math.round(Math.random() * (row-1)) + 'Column:'+ Math.round(Math.random() * (column-1)));
        classChange(element, colorTwo, colorOne);
    } 
}

// Меняет цвет прямоугольника и класс, обозначающий цвет (удаляя предыдущий)
function classChange(el, x, y){
    el.children[0].children[0].setAttribute('fill', x);        
    el.classList.remove(y);
    el.classList.add(x);}

// Меняет цвет прямоугольника на противоположный
function chooseColor(el){
    if (el.classList.contains(colorOne)) {
        classChange(el, colorTwo, colorOne);}
    else if (el.classList.contains(colorTwo)){
        classChange(el, colorOne, colorTwo);}
}


function gameItself(target) {
    var parent_target = target.parentElement.parentElement;
    //parent_target_position = parent_target.getAttribute("id").match(/\d+/g);
    //console.log(parent_target_position);
    //console.log(target.parentElement.parentElement);
    //console.log(target);
    chooseColor(parent_target);
    changeColorAround(parent_target, 1);
    //changeColorAround(parent_target, 2);
    count++;
    console.log(count);
}

// Меняет цвета ячеек вокруг нажатой
function changeColorAround(el, d) {
    var position = el.getAttribute("id").match(/\d+/g),
    row_position = parseInt(position[0], 10),
    column_position = parseInt(position[1], 10);

    if (row_position+d < row)
        {chooseColor(document.getElementById('Row:'+ (row_position+d) + 'Column:'+ column_position));}
    if (row_position-d >= 0) 
        {chooseColor(document.getElementById('Row:'+ (row_position-d) + 'Column:'+ column_position));}
    if (column_position+d < column) 
        {chooseColor(document.getElementById('Row:'+ row_position + 'Column:'+ (column_position+d)));}
    if (column_position-d >= 0) 
        {chooseColor(document.getElementById('Row:'+ row_position + 'Column:'+ (column_position-d)));}
}

// При нажатии на клетку проверяет все клетки на наличие класса colorTwo
// если colorTwo отсутствует (и кнопка нажата >=1 раза) - Победа
function win() {
    if (!restartPage) {
        var red_cells = 0;
        for (var x=0; x<row; x++){
            for (var y=0; y<column; y++){
                if (document.getElementById('Row:'+ x + 'Column:'+ y).classList.contains(colorTwo)) {red_cells++;}
            }
        }
        if (red_cells === 0) 
            {res.innerText = "Победа!!!";
            game.removeEventListener("click", init);
        }
    }
}

// По нажатию кнопки перекрашивает все клетки в colorOne, 
//добавляет 5% colorTwo
function restartGame(){
    res.innerText = "";
    restartPage = false;
    count = 0;
    for (var x=0; x<row; x++){
        for (var y=0; y<column; y++){
            var restartCell = document.getElementById('Row:'+ x + 'Column:'+ y);
            classChange(restartCell, colorOne, colorTwo);}}
	game.addEventListener('click', init);
    newGame();
}

// первая функция, запускаемая при нажатии на клетку
function init(e) {
    gameItself(e.target);
    win();
}

btnGame.addEventListener('click', restartGame);
document.querySelector(".game").addEventListener('click', init);
