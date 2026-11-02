
// =====================================
// 1. PERSONALIZE YOUR BIRTHDAY WEBSITE
// =====================================
const FRIEND_NAME = "THE GODDESS:ASHMITA❤️";

// Change this to your friend's birthday.
// Format: YYYY-MM-DD
const BIRTHDAY_DATE = "2026-11-22";

// Change this to your secret password
const SECRET_PASSWORD = "11.22.2008";

document.getElementById("friendName").textContent =
    FRIEND_NAME.toUpperCase() + " 🖤";


// =====================================
// 2. FLOATING STARS
// =====================================

const stars = document.getElementById("stars");

for (let i = 0; i < 70; i++) {
    const star = document.createElement("span");

    star.textContent = "✦";
    star.style.position = "absolute";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.color = "#d8a4ff";
    star.style.fontSize = Math.random() * 12 + 5 + "px";
    star.style.opacity = Math.random() * 0.7 + 0.2;
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;

    stars.appendChild(star);
}

// =====================================
// 3. START CELEBRATION BUTTON
// =====================================

document.getElementById("startBtn").addEventListener("click", function () {
    document.querySelector(".countdown-section").scrollIntoView({
        behavior: "smooth"
    });

    celebrate();
});


// =====================================
// 4. BIRTHDAY COUNTDOWN
// =====================================

function updateCountdown() {

    const target = new Date(BIRTHDAY_DATE + "T00:00:00");
    const now = new Date();

    const difference = target.getTime() - now.getTime();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const message = document.getElementById("countdownMessage");

    if (Number.isNaN(target.getTime())) {
        message.textContent = "Please set a valid birthday date.";
        return;
    }

    if (difference < 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        message.textContent = "🎉 HAPPY BIRTHDAY! TODAY IS YOUR DAY DEVI! 🎉";
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const m = Math.floor((difference / (1000 * 60)) % 60);
    const s = Math.floor((difference / 1000) % 60);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");

    message.textContent = "The big day is getting closer! 💜";
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =====================================
// 5. MUSIC PLAYER
// =====================================

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async function () {

    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "⏸ Pause Beautiful Music";
        } catch (error) {
            alert("Please add a valid music.mp3 file inside the images folder.");
        }
    } else {
        music.pause();
        musicBtn.textContent = "▶ Play Beautiful Music";
    }

});


// =====================================
// 6. SURPRISE MESSAGE
// =====================================

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseBtn.addEventListener("click", function () {

    surpriseMessage.classList.toggle("hidden");

    if (!surpriseMessage.classList.contains("hidden")) {
        surpriseBtn.textContent = "💜 Hide Surprise";
        celebrate();
    } else {
        surpriseBtn.textContent = "🎁 Open Your Surprise";
    }

});


// =====================================
// 7. PASSWORD PROTECTED MESSAGE
// =====================================

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const passwordError = document.getElementById("passwordError");
const secretMessage = document.getElementById("secretMessage");

function unlockSecret() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        secretMessage.classList.remove("hidden");
        passwordError.textContent = "";
        passwordInput.value = "";
        unlockBtn.textContent = "🔓 Unlocked!";

        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        celebrate();

    } else {

        passwordError.textContent =
            "❌ Wrong password! Try again, DEVI.";

    }

}

unlockBtn.addEventListener("click", unlockSecret);

passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        unlockSecret();
    }
});


// =====================================
// 8. CONFETTI ANIMATION
// =====================================

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeCanvas() {

    const ratio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function celebrate() {

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    particles = [];

    const colors = [
        "#d946ef",
        "#a855f7",
        "#ff5db1",
        "#ffffff",
        "#c084fc",
        "#fbbf24"
    ];

    for (let i = 0; i < 180; i++) {

        particles.push({

            x: Math.random() * window.innerWidth,
            y: -Math.random() * window.innerHeight,

            size: Math.random() * 8 + 3,
            speed: Math.random() * 4 + 2,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ],

            rotation: Math.random() * 360,
            spin: Math.random() * 8 - 4

        });

    }

    animateConfetti();
}

function animateConfetti() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(function (p) {

        p.y += p.speed;
        p.x += Math.sin(p.y / 30);
        p.rotation += p.spin;

        ctx.save();

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);

        ctx.fillStyle = p.color;

        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 0.7
        );

        ctx.restore();

    });

    particles = particles.filter(
        p => p.y < window.innerHeight + 20
    );

    if (particles.length > 0) {

        animationId = requestAnimationFrame(animateConfetti);

    } else {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animationId = null;

    }

}
