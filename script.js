const correctPassword = "0106"; // change birthday
const text = "Happy Birthday ❤️ You Make My World Beautiful!";
let i = 0;

function checkPassword() {
    const userInput = document.getElementById("password").value;

    if (userInput === correctPassword) {
        startExperience();
    } else {
        document.getElementById("error").innerText = "Wrong Password 💔";
    }
}

function startExperience() {
    document.querySelector(".intro").style.display = "none";
    document.querySelector(".main").classList.remove("hidden");

    AOS.init();

    startMusic();
    typeEffect();
    launchConfetti();
    createHearts();
}

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
    }
}

/* COUNTDOWN */
const birthdayDate = new Date("June 1, 2026 00:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("countdown").innerHTML =
            `⏳ ${days}d ${hours}h ${minutes}m left`;
    }
}, 1000);

/* MUSIC FADE IN */
function startMusic() {
    const music = document.getElementById("music");
    music.volume = 0;
    music.play();

    let fade = setInterval(() => {
        if (music.volume < 1) {
            music.volume += 0.05;
        } else {
            clearInterval(fade);
        }
    }, 200);
}

/* CONFETTI */
function launchConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}

/* FLOATING HEARTS */
function createHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

/* CURSOR GLOW */
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* FEEDBACK */
function saveMessage() {
    const message = document.getElementById("userMessage").value;
    if (message.trim() === "") return;

    const p = document.createElement("p");
    p.innerText = message;

    document.getElementById("messages").appendChild(p);
    document.getElementById("userMessage").value = "";
}