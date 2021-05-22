var hero = document.getElementById("hero");
var virus = document.getElementById("virus");
var virus2 = document.getElementById("virus2");
var gameover = document.getElementById("gameOver");
var oxygen = document.getElementById("oxygen");
var boy = document.getElementById("boy");

audiobg = new Audio("backgroundMusic.mp3");
audioVHit = new Audio("virusHit.wav");
audioOHit = new Audio("oxygenHit.wav");
audioSMHit = new Audio("sanitizerMask.wav");
audiogo = new Audio("gameOver.wav");
audioJump = new Audio("jumpTemp.mp3");
audioTilt = new Audio("tilt.wav");
setTimeout(() => {
    audiobg.volume = 0.05;
    audiobg.play();

}, 10);
random = 0;
val = 0;
counter = 0;
count = 0;
cross = true;
temp = 0;
var boy = document.getElementById("boy");
window.addEventListener("keydown", checkKeyPress, false);
boy.style.visibility = "hidden";

function checkKeyPress(key) {
    if (key.keyCode == "40") {
        boy.style.visibility = "visible";
        rotateboy();
        hero.style.visibility = "hidden";
    }
}

function rotateboy() {
    if (boy.classList == "rotateboy") { return }
    boy.classList.add("rotateboy");
    temp = 1;
    var x = setTimeout(function() {
        audioTilt.volume = 0.5;
        audioTilt.play();
        boy.classList.remove("rotateboy");
        hero.style.visibility = "visible";
        boy.style.visibility = "hidden";
        clearTimeout(x);
        temp = 0;
    }, 700);
}
var display = document.getElementById('display').getContext('2d');
drawhealthbar(display, 10, 10, 150, 30, 100, 100);
var barvalue = 100;
random = 0;

function jump() {
    if (hero.classList == "jump") { return }
    hero.classList.add("jump");

    setTimeout(function() {
        audioJump.volume = 0.4;
        audioJump.play();
        hero.classList.remove("jump");

    }, 200);
}

health = 100;
setInterval(function randomFunc() {
    if (random % 4 == 0) {
        mask.style.visibility = "hidden";
        oxygen.style.visibility = "hidden";
        coins.style.visibility = "visible";
    } else if (random % 4 == 1) {
        mask.style.visibility = "visible";
        oxygen.style.visibility = "hidden";
        coins.style.visibility = "hidden";
    } else {
        mask.style.visibility = "hidden";
        coins.style.visibility = "hidden";
        oxygen.style.visibility = "visible";
    }
    random++;
}, 3000);
setTimeout(() => {
    anidur = parseFloat(window.getComputedStyle(virus).getPropertyValue('animation-duration'));
    newdur = anidur - 0.001;
    virus.style.animationDuration = newdur + 's';
}, 500);

var checkDead = setInterval(interval, 60);

function interval() {
    let heroTop = parseInt(window.getComputedStyle(hero).getPropertyValue("top"));
    let oxyleft = parseInt(window.getComputedStyle(oxygen).getPropertyValue("left"));
    let virusLeft = parseInt(window.getComputedStyle(virus).getPropertyValue("left"));
    let virus2Left = parseInt(window.getComputedStyle(virus2).getPropertyValue("left"));
    if ((virusLeft > 40 && virusLeft < 140 && heroTop > 220 && barvalue != 0) || (virus2Left > 40 && virus2Left < 140 && heroTop > 220 && barvalue > 0)) {
        counter++;
        audioVHit.volume = 0.2;
        audioVHit.play();
        document.getElementById("scoreCont").innerHTML = "Your Score :" +
            Math.floor(counter / 100);
        barvalue = barvalue - 3;
        drawhealthbar(display, 10, 10, 150, 30, barvalue, 100);
    } else if (barvalue > 0) {
        counter++;
        document.getElementById("scoreCont").innerHTML = "Your Score :" +
            Math.floor(counter / 100);
        setInterval(function() {
            let by = parseInt(window.getComputedStyle(hero).getPropertyValue("top"));
            let cy = parseInt(window.getComputedStyle(coins).getPropertyValue("top"));
            let bx = parseInt(window.getComputedStyle(hero).getPropertyValue("left"));
            let cx = parseInt(window.getComputedStyle(coins).getPropertyValue("left"));
            let mx = parseInt(window.getComputedStyle(mask).getPropertyValue("left"));
            let my = parseInt(window.getComputedStyle(mask).getPropertyValue("top"));

            offsety = Math.abs(by - cy);
            offsetx = Math.abs(bx - cx);
            offsetb = Math.abs(by - my);
            offseta = Math.abs(bx - mx);
            if ((offsetx <= 50 && offsety <= 70 && cross && coins.style.visibility == "visible") || (offseta <= 50 && offsetb <= 70 && cross) && (mask.style.visibility == "visible")) {
                count++;
                coins.style.visibility = "hidden";
                mask.style.visibility = "hidden";
                audioSMHit.volume = 0.5;
                audioSMHit.play();
                counter += 50;

                document.getElementById("scoreCont").innerHTML = "Your Score :" + Math.floor(counter / 100);
                updatecoins(count);
                cross = false;
                setTimeout(() => {
                    cross = true;
                }, 1000);
            }
        }, 100);
    }
    if (Math.abs(oxyleft - heroTop) < 40 && heroTop <= 170 && oxygen.style.visibility == "visible") {
        oxygen.style.visibility = "hidden";
        audioOHit.volume = 0.5;
        audioOHit.play();
        barvalue = barvalue + 4;
        drawhealthbar(display, 10, 10, 150, 30, barvalue, 100);
        counter += 100;
        document.getElementById("scoreCont").innerHTML = "Your Score :" + Math.floor(counter / 100);

    }

}

function updatecoins(count) {
    totalcoins.innerHTML = "Pawns collected:" + count
}

function drawhealthbar(canvas, x, y, width, height, health, max_health) {
    if (health >= max_health) {
        health = max_health;
    }
    if (health <= 0) {

        health = 0;

    }
    canvas.fillStyle = '#000000';
    canvas.fillRect(x, y, width, height);
    var colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100;
    var colorString = colorNumber.toString(16);

    if (colorNumber >= 0x100000) {
        canvas.fillStyle = '#' + colorString;
    } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
        canvas.fillStyle = '#0' + colorString;
    } else if (colorNumber << 0x10000) {
        canvas.fillStyle = '#00' + colorString;
    }
    canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2);


    if (health <= 0) {
        virus.style.visibility = "hidden";
        virus2.style.visibility = "hidden";
        hero.style.visibility = "hidden";
        mask.style.visibility = "hidden";
        coins.style.visibility = "hidden";
        oxygen.style.visibility = "hidden";
        audiobg.pause();
        audiogo.volume = 0.5;
        audiogo.play();

        document.getElementById("score").innerHTML = "Your Score :" + (Math.floor(counter / 100) );
        gameover.style.visibility = "visible";
        bg.style.animation = "none";
        

    }
}
