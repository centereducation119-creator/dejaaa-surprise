
const holdButton = document.getElementById("holdButton");
const cover = document.getElementById("cover");
const letter = document.getElementById("letter");
const timer = document.getElementById("timer");

let holdTimer = null;
let countdownTimer = null;
let isOpened = false;

let seconds = 3;

// START HOLDING
function startHolding(event) {

    if (isOpened) return;

    event.preventDefault();

    if (holdTimer) return;

    holdButton.setPointerCapture(event.pointerId);

    seconds = 3;

    holdButton.classList.add("holding");

    timer.innerText = "Keep holding... 3";

    countdownTimer = setInterval(function() {

        seconds--;

        if (seconds > 0) {
            timer.innerText = "Keep holding... " + seconds;
        }

    }, 1000);

    holdTimer = setTimeout(function() {

        openCard();

    }, 3000);
}


// STOP HOLDING
function stopHolding() {

    if (isOpened) return;

    clearTimeout(holdTimer);
    clearInterval(countdownTimer);

    holdTimer = null;
    countdownTimer = null;

    holdButton.classList.remove("holding");

    timer.innerText = "Hold for 3 seconds";
}


// OPEN LOVE LETTER
function openCard() {

    if (isOpened) return;

    isOpened = true;

    clearTimeout(holdTimer);
    clearInterval(countdownTimer);

    cover.style.display = "none";

    letter.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    timer.innerText = "Surprise Unlocked ❤️";
}


// BUTTON EVENTS
holdButton.addEventListener("pointerdown", startHolding);

holdButton.addEventListener("pointerup", stopHolding);

holdButton.addEventListener("pointercancel", stopHolding);

holdButton.addEventListener("lostpointercapture", stopHolding);

holdButton.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});


// FLOATING HEARTS
function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💕";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (15 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 600);
