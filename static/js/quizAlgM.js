let n1;
let n2;
let opSelector;
let ansOpt;
let answer;
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.getElementsByTagName("button");
let start = document.getElementById("start-btn");
let fScore = document.getElementById("final-score");
let startBox = document.getElementById("start-game");
let gameBox = document.getElementById("in-game");
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let message = document.getElementById("message");
let operator = ['+', '-', '*', '/'];
let unknown = ['x', 'y', 'z', 'a', 'b', 'c', 'd'];
let equal = ['=']
let diffRange = 20;
let timeSet = 500;
let t;

function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block"
    startBox.style.display = "none";
    endBox.style.display = "none";
    timer.style.display = "block";
}

function whenFinished() {
    console.log("Finished.")
    gameBox.style.display = "none"
    startBox.style.display = "none";
    endBox.style.display = "flex";
    lastmessage();
}

function nextQuestion() {

    progress.style.width = "100%";
    timed();
    // timed();
    fScore.innerHTML = score.innerHTML;
    if (qNo.innerText == "10") {
        whenFinished();
    }

    do{
        n1 = Math.floor(Math.random() * diffRange);
        n2 = Math.floor(Math.random() * diffRange);
        opSelector = operator[Math.floor(Math.random() * 4)];
        unkSelector = unknown[Math.floor(Math.random() * 7)];


        //Might have to adjust this
        if (opSelector == "/") {
            for (let i = 0; i < 200; i++) {
                if (n1 % n2 == 0 && n1 != 0 && n2 != 0 && n2 != 1 && n1 != n2) {
                    break;
                }
                n1 = Math.floor(Math.random() * diffRange);
                n2 = Math.floor(Math.random() * diffRange);
            }
        }

        if (opSelector == "*") {
            for (let i = 0; i < 100; i++) {
                if (n1 * n2 <= 1000) {
                    break;
                }
                n1 = Math.floor(Math.random() * diffRange);
                n2 = Math.floor(Math.random() * diffRange);
            }
        }
    


        question.innerHTML = unkSelector + opSelector + n1 + "=" + n2;

        if(opSelector == "+"){
            evalOp = "-"
        }else if(opSelector == "-"){
            evalOp = "+"
        }else if(opSelector == "*"){
            evalOp = "/"
        }else if(opSelector == "/"){
            evalOp = "*"
        }

    }while(!Number.isInteger(eval(n1+evalOp+n2)))

    answer = eval(n2 + evalOp + n1);
    question.innerHTML = question.innerHTML + "\n Apakah " + unkSelector + "?";

    // console.log("answer: " + answer);
    getOptions();
    getQNo();

}

// function difficulty(n1, n2){
//     if(n1)
// }

function getOptions() {

    for (let i = 0; i < 4; i++ && i != ansOpt) {
        if (answer > 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.4);
        } else if (answer > 30 && answer < 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.6);
        } else {
            buttons[i].innerHTML = Math.floor(Math.random() * 100);
        }

        if (answer < 0) {
            buttons[i].innerHTML = "-" + buttons[i].innerHTML;
        }
    }
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;
}

function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
    // console.log("Q no: " + qNo.innerHTML);
}

function getScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width);
    // console.log(score.innerHTML);
}

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
    // console.log("wrong");
}

function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

function lastmessage() {
    clearInterval(t);
    if (fScore.innerText >= 800) {
        let emoji = "&#128525";
        message.innerHTML = "WOW !! UNBELIEVABLE !!" + emoji;
    } else if (fScore.innerText >= 500) {
        let emoji = "&#128531";
        message.innerHTML = "TOO CLOSE !!" + emoji;
    } else if (fScore.innerText >= 100) {
        let emoji = "&#128549";
        message.innerHTML = "Better luck next time " + emoji;
    } else {
        let emoji = "&#128577";
        message.innerHTML = "Bad Luck " + emoji;
    }
}

function timed() {
    t = setInterval(() => {
        progress.style.width = (parseInt(progress.style.width) - 1) + "%";
        console.log("called");
        if (parseInt(progress.style.width) == 0) {
            clearInterval(t);
            nextQuestion();
        }
    }, timeSet)
}

buttons[0].addEventListener('click', () => {
    if (buttons[0].innerText == answer) {
        doWhenCorrect(0);
    } else {
        doWhenIncorrect(0);
    }
    clearInterval(t);
    outro(0);
});
buttons[1].addEventListener('click', () => {
    if (buttons[1].innerText == answer) {
        doWhenCorrect(1);
    } else {
        doWhenIncorrect(1);
    }
    clearInterval(t);
    outro(1);
});
buttons[2].addEventListener('click', () => {
    if (buttons[2].innerText == answer) {
        doWhenCorrect(2);
    } else {
        doWhenIncorrect(2);;
    }
    clearInterval(t);
    outro(2);
});
buttons[3].addEventListener('click', () => {
    if (buttons[3].innerText == answer) {
        doWhenCorrect(3);
    } else {
        doWhenIncorrect(3);
    }
    clearInterval(t);
    outro(3);
});