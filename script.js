var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.onclick = animate;

mapImage = new Image();
mapImage.onload = drawMap;
mapImage.src = 'img/spanish_main3.jpg';

posImage = new Image();
posImage.src = 'img/mouse.png';

positionX = canvas.width / 2 - posImage.width;
positionY = canvas.height / 2 - posImage.height + 40;
posXDestination = 0;
posYDestination = 0;

prevPositions = new Array();

shipDirection = 'still';
running = false;

frame = 0;

function drawMap() {
    context.drawImage(mapImage, 0, 0);

    setTimeout(drawPosition, 250);
}

function drawPosition() {
    context.drawImage(posImage, 0, 0, 12, 19, positionX, positionY, 12, 19);
}

function animate(e) {
    if (running == false) {
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
        posXDestination = mouseX;
        posYDestination = mouseY;

        prevPositions = new Array();

        movePosition();
    } else {
        posXDestination = positionX;
        posYDestination = positionY;
    }
}

function movePosition() {
    running = true;
    frame++;

    var originalPosX = positionX;
    var originalPosY = positionY;
    var wait = 20;

    //Draw background first so we can get pixel color under mouse
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(mapImage, 0, 0);

    var changePosX = 0;
    var changePosY = 0;

    var futureX = positionX < posXDestination ? positionX + 1 : positionX - 1;
    var futureY = positionY < posYDestination ? positionY + 1 : positionY - 1;
    //var nextPixels = getSurrounding(futureX, futureY);
    var pixels = getSurrounding(positionX, positionY);

    if (positionY > posYDestination && positionX == posXDestination) {
        //UP
        if (
            pixels['up']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried UP, going RIGHT UP instead');
        } else if (
            pixels['up']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried UP, going LEFT UP instead');
        } else if (
            pixels['up']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried UP, going RIGHT instead');
        } else if (
            pixels['up']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried UP, going LEFT instead');
        } else if (
            pixels['up']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried UP, going RIGHT DOWN instead');
        } else if (
            pixels['up']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried UP, going LEFT DOWN instead');
        } else if (prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined) {
            changePosY = -1;
            changePosX = 0;
            console.log('Free to go UP');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'UP';
    } else if (positionY > posYDestination && positionX < posXDestination) {
        //RIGHT UP
        if (
            pixels['right_up']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried RIGHT UP, going RIGHT instead');
        } else if (
            pixels['right_up']['land'] == true &&
            pixels['up']['land'] == false &&
            prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined
        ) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried RIGHT UP, going UP instead');
        } else if (
            pixels['right_up']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried RIGHT UP, going RIGHT DOWN instead');
        } else if (
            pixels['right_up']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried RIGHT UP, going DOWN instead');
        } else if (
            pixels['right_up']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried RIGHT UP, going LEFT UP instead');
        } else if (
            pixels['right_up']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried RIGHT UP, going LEFT instead');
        } else if (prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined) {
            changePosY = -1;
            changePosX = 1;
            console.log('Free to go RIGHT UP');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'RIGHT UP';
    } else if (positionY == posYDestination && positionX < posXDestination) {
        //RIGHT
        if (
            pixels['right']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried RIGHT, going RIGHT UP instead');
        } else if (
            pixels['right']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried RIGHT, going RIGHT DOWN instead');
        } else if (
            pixels['right']['land'] == true &&
            pixels['up']['land'] == false &&
            prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined
        ) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried RIGHT, going UP instead');
        } else if (
            pixels['right']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried RIGHT, going DOWN instead');
        } else if (
            pixels['right']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried RIGHT, going LEFT UP instead');
        } else if (
            pixels['right']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried RIGHT, going LEFT DOWN instead');
        } else if (prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined) {
            changePosX = 1;
            changePosY = 0;
            console.log('Free to go RIGHT');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'RIGHT';
    } else if (positionY < posYDestination && positionX < posXDestination) {
        //RIGHT DOWN
        if (
            pixels['right_down']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried RIGHT DOWN, going RIGHT instead');
        } else if (
            pixels['right_down']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried RIGHT DOWN, going DOWN instead');
        } else if (
            pixels['right_down']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried RIGHT DOWN, going RIGHT UP instead');
        } else if (
            pixels['right_down']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried RIGHT DOWN, going LEFT DOWN instead');
        } else if (
            pixels['right_down']['land'] == true &&
            pixels['up']['land'] == false &&
            prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined
        ) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried RIGHT DOWN, going UP instead');
        } else if (
            pixels['right_down']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried RIGHT DOWN, going LEFT instead');
        } else if (prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined) {
            changePosX = 1;
            changePosY = 1;
            console.log('Free to go RIGHT DOWN');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'RIGHT DOWN';
    } else if (positionY < posYDestination && positionX == posXDestination) {
        //DOWN
        if (
            pixels['down']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried DOWN, going RIGHT DOWN instead');
        } else if (
            pixels['down']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried DOWN, going LEFT DOWN instead');
        } else if (
            pixels['down']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried DOWN, going RIGHT instead');
        } else if (
            pixels['down']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried DOWN, going LEFT instead');
        } else if (
            pixels['down']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried DOWN, going RIGHT UP instead');
        } else if (
            pixels['down']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried DOWN, going LEFT UP instead');
        } else if (prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined) {
            changePosY = 1;
            changePosX = 0;
            console.log('Free to go DOWN');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'DOWN';
    } else if (positionY < posYDestination && positionX > posXDestination) {
        //LEFT DOWN
        if (
            pixels['left_down']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried LEFT DOWN, going DOWN instead');
        } else if (
            pixels['left_down']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried LEFT DOWN, going LEFT instead');
        } else if (
            pixels['left_down']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried LEFT DOWN, going LEFT UP instead');
        } else if (
            pixels['left_down']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried LEFT DOWN, going RIGHT DOWN instead');
        } else if (
            pixels['left_down']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried LEFT DOWN, going RIGHT instead');
        } else if (
            pixels['left_down']['land'] == true &&
            pixels['up']['land'] == false &&
            prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined
        ) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried LEFT DOWN, going UP instead');
        } else if (prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined) {
            changePosX = -1;
            changePosY = 1;
            console.log('Free to go LEFT DOWN');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'LEFT DOWN';
    } else if (positionY == posYDestination && positionX > posXDestination) {
        //LEFT
        if (
            pixels['left']['land'] == true &&
            pixels['left_up']['land'] == false &&
            prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = -1;
            console.log('Tried LEFT, going LEFT UP instead');
        } else if (
            pixels['left']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried LEFT, going LEFT DOWN instead');
        } else if (pixels['left']['land'] == true && pixels['up']['land'] == false && prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried LEFT, going UP instead');
        } else if (
            pixels['left']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried LEFT, going DOWN instead');
        } else if (
            pixels['left']['land'] == true &&
            pixels['right_down']['land'] == false &&
            prevPositions[pixels['right_down']['x'] + ':' + pixels['right_down']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 1;
            console.log('Tried LEFT, going RIGHT DOWN instead');
        } else if (
            pixels['left']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried LEFT, going RIGHT UP instead');
        } else if (prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined) {
            changePosX = -1;
            changePosY = 0;
            console.log('Free to go LEFT');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'LEFT';
    } else if (positionY > posYDestination && positionX > posXDestination) {
        //LEFT UP
        if (
            pixels['left_up']['land'] == true &&
            pixels['left']['land'] == false &&
            prevPositions[pixels['left']['x'] + ':' + pixels['left']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 0;
            console.log('Tried LEFT UP, going LEFT instead');
        } else if (
            pixels['left_up']['land'] == true &&
            pixels['up']['land'] == false &&
            prevPositions[pixels['up']['x'] + ':' + pixels['up']['y']] == undefined
        ) {
            changePosY = -1;
            changePosX = 0;
            console.log('Tried LEFT UP, going UP instead');
        } else if (
            pixels['left_up']['land'] == true &&
            pixels['left_down']['land'] == false &&
            prevPositions[pixels['left_down']['x'] + ':' + pixels['left_down']['y']] == undefined
        ) {
            changePosX = -1;
            changePosY = 1;
            console.log('Tried LEFT UP, going LEFT DOWN instead');
        } else if (
            pixels['left_up']['land'] == true &&
            pixels['right_up']['land'] == false &&
            prevPositions[pixels['right_up']['x'] + ':' + pixels['right_up']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = -1;
            console.log('Tried LEFT UP, going RIGHT UP instead');
        } else if (
            pixels['left_up']['land'] == true &&
            pixels['down']['land'] == false &&
            prevPositions[pixels['down']['x'] + ':' + pixels['down']['y']] == undefined
        ) {
            changePosY = 1;
            changePosX = 0;
            console.log('Tried LEFT UP, going DOWN instead');
        } else if (
            pixels['left_up']['land'] == true &&
            pixels['right']['land'] == false &&
            prevPositions[pixels['right']['x'] + ':' + pixels['right']['y']] == undefined
        ) {
            changePosX = 1;
            changePosY = 0;
            console.log('Tried LEFT UP, going RIGHT instead');
        } else if (prevPositions[pixels['left_up']['x'] + ':' + pixels['left_up']['y']] == undefined) {
            changePosX = -1;
            changePosY = -1;
            console.log('Free to go LEFT UP');
        } else {
            posXDestination = positionX;
            posYDestination = positionY;
            console.log('Land on all sides! Giving up...');
        }

        shipDirection = 'LEFT UP';
    }

    if (changePosX != undefined && changePosX != 0) {
        positionX += changePosX;
    }

    if (changePosY != undefined && changePosY != 0) {
        positionY += changePosY;
    }

    prevPositions[positionX + ':' + positionY] = true;
    console.log('Old position: ' + originalPosX + ':' + originalPosY + '. New position: ' + positionX + ':' + positionY);

    var box = document.getElementById('box');
    box.innerHTML = shipDirection;

    shipPic = originalPosX < positionX ? 0 : 32;

    //context.drawImage(posImage, 0, shipPic, 32, 32, positionX, positionY, 32, 32);
    context.drawImage(posImage, 0, 0, 12, 19, positionX, positionY, 12, 19);

    if (positionX != posXDestination || positionY != posYDestination) {
        //Not there yet, move position

        setTimeout(movePosition, wait);
    } else {
        running = false;
    }
}

function getSurrounding(x, y) {
    var pixels = {
        up: Array(),
        right_up: Array(),
        right: Array(),
        right_down: Array(),
        down: Array(),
        left_down: Array(),
        left: Array(),
        left_up: Array()
    };

    //Top
    pixels['up']['x'] = x;
    pixels['up']['y'] = y - 1;
    //Top right
    pixels['right_up']['x'] = x + 1;
    pixels['right_up']['y'] = y - 1;
    //Right
    pixels['right']['x'] = x + 1;
    pixels['right']['y'] = y;
    //Bottom right
    pixels['right_down']['x'] = x + 1;
    pixels['right_down']['y'] = y + 1;
    //Bottom
    pixels['down']['x'] = x;
    pixels['down']['y'] = y - 1;
    //Bottom left
    pixels['left_down']['x'] = x - 1;
    pixels['left_down']['y'] = y + 1;
    //Left
    pixels['left']['x'] = x - 1;
    pixels['left']['y'] = y;
    //Top left
    pixels['left_up']['x'] = x - 1;
    pixels['left_up']['y'] = y - 1;

    for (var direction in pixels) {
        var colors = context.getImageData(pixels[direction]['x'], pixels[direction]['y'], 1, 1);
        var r = colors.data[0];
        var g = colors.data[1];
        var b = colors.data[2];

        thisPos = document.getElementById(direction);
        thisPos.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        thisPos.style.color = 'rgb(' + (255 - r) + ', ' + (255 - g) + ', ' + (255 - b) + ')';
        thisPos.innerHTML = r + ', ' + g + ', ' + b;

        limitR = limitG = limitB = 10;

        pixels[direction]['land'] = r < limitR && g < limitG && b < limitB ? true : false;

        if (r < limitR && g < limitG && b < limitB) {
            console.log('LAND on ' + direction + '(' + r + ', ' + g + ', ' + b + ')');
        }
    }

    return pixels;
}

console.logCopy = console.log.bind(console);

console.log = function(data) {
    var currentDate = '[' + frame + '][' + new Date().toUTCString() + '] ';
    this.logCopy(currentDate, data);
};
