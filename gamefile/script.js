window.onload = function () {
    score = 0;
    cross = true;

    audio = new Audio('./gamefile/music.mp3');
    audiogo = new Audio('./gamefile/gameover.mp3');
    setTimeout(() => {
        audio.play();
    }, 1000);

    // for mobile
    button = document.getElementsByTagName("button");
    button[0].addEventListener("click", function goleft() {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    });

    button[1].addEventListener("click", function gojump() {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    });

    button[2].addEventListener("click", function goright() {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    });

    document.onkeydown = function (e) {
        console.log("Key code is: ", e.keyCode)
        if (e.keyCode == 38) {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700);
        }
        if (e.keyCode == 39) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }
        if (e.keyCode == 37) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        }
    }

    setInterval(() => {
        dino = document.querySelector('.dino');
        gameOver = document.querySelector('.gameOver');
        obstacle = document.querySelector('.obstacle');

        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
        // console.log(offsetX, offsetY)
        if (offsetX < 73 && offsetY < 52) {
            gameOver.style.visibility = "visible";
            obstacle.classList.remove('obstacleAni')
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
            window.setTimeout(function () {
                window.location.reload();
            }, 3000);
        }
        else if (offsetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration: ', newDur)
            }, 500);

        }

    }, 10);

    function updateScore(score) {
        scoreCont.innerHTML = "Your Score: " + score
    }
}
