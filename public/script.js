const correctPassword = "0106";
let currentIndex = 0;
const text = "Happy Birthday 💖 You Are My Forever.";
let i = 0;

/* SLIDER */
function updateSlider() {
    const track = document.getElementById("sliderTrack");
    const slideWidth = document.querySelector(".slide").offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextPhoto() {
    const slides = document.querySelectorAll(".slide");
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevPhoto() {
    const slides = document.querySelectorAll(".slide");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

/* PASSWORD */
function checkPassword() {
    const input = document.getElementById("passwordInput").value;

    if (input === correctPassword) {
        document.querySelector(".intro").style.display = "none";
        document.querySelector(".main").classList.remove("hidden");
        startMusic();
        typeEffect();
        confetti({
            particleCount: 150,
            spread: 80
        });
    } else {
        document.getElementById("errorMsg").innerText = "Wrong code 💔 Try again.";
    }
}

/* TYPEWRITER */
function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
    }
}

/* NAVIGATION */
function goToLetter() {
    document.querySelector(".main").classList.add("hidden");
    document.getElementById("letterPage").classList.remove("hidden");
}

function showFeedback() {
    document.getElementById("feedbackSection").classList.remove("hidden");
}

/* SAVE MESSAGE */
async function saveMessage() {

    const message = document.getElementById("userMessage").value;

    if (message.trim() === "") {
        alert("Please write something first ❤️");
        return;
    }

    const response = await fetch("/save-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    });

    const data = await response.json();

    if (data.success) {
        document.getElementById("userMessage").value = "";
        alert("Message sent 💖");
    } else {
        alert("Something went wrong.");
    }
}

/* MUSIC */
function toggleMusic() {
    const music = document.getElementById("music");

    if (music.paused)
        music.play();
    else
        music.pause();
}

function startMusic() {

    const music = document.getElementById("music");

    music.volume = 0;
    music.play();

    let fade = setInterval(() => {

        if (music.volume < 0.8) {
            music.volume += 0.02;
        } else {
            clearInterval(fade);
        }

    }, 200);

}

/* ===========================
   FULL SCREEN IMAGE VIEWER
=========================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".real-img").forEach(img => {

    img.addEventListener("click", function (e) {

        e.stopPropagation();

        modalImg.src = this.src;
        modal.style.display = "flex";

    });

});

modal.addEventListener("click", function () {

    modal.style.display = "none";

});

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        modal.style.display = "none";
    }

});

/* FLOATING HEARTS */

const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 8 + Math.random() * 5 + "s";
    heart.style.transform = `scale(${0.5 + Math.random()}) rotate(45deg)`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);

}

setInterval(createHeart, 800);

/* SCROLL REVEAL */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("active");
        }

    });

});

/* STORY ANIMATION */

const storyLines = document.querySelectorAll(".story-line");

window.addEventListener("scroll", () => {

    storyLines.forEach(line => {

        const position = line.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            line.classList.add("show");
        }

    });

});