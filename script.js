
const prizes = ["Деф навсегда", "Скидка 25%", "Обучение осинту", "Ничего"];
const spinButton = document.getElementById("spinButton");
const wheel = document.getElementById("wheel");
const resultText = document.getElementById("resultText");
const timerText = document.getElementById("timerText");

function playSound() {
  const sound = document.getElementById("clickSound");
  sound && sound.play();
}

function navigateTo(id) {
  document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  playSound();
}

function updateTimer() {
  const lastSpin = localStorage.getItem("lastSpin");
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (!lastSpin || now - parseInt(lastSpin) >= oneWeek) {
    timerText.textContent = "Можно крутить!";
    spinButton.disabled = false;
  } else {
    const diff = oneWeek - (now - parseInt(lastSpin));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    timerText.textContent = `${hours}ч ${minutes}м ${seconds}с`;
    spinButton.disabled = true;
  }
}

function spin() {
  const spinAngle = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${spinAngle}deg)`;
  const sector = Math.floor((spinAngle % 360) / (360 / prizes.length));
  setTimeout(() => {
    resultText.textContent = "Вы выиграли: " + prizes[sector];
    localStorage.setItem("lastSpin", Date.now());
    updateTimer();
  }, 4500);
}

setInterval(updateTimer, 1000);
