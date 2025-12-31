// 🎇 FIREWORKS
const canvas = document.getElementById("fireworks") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

class Firework {
  x = random(0, canvas.width);
  y = canvas.height;
  targetY = random(0, canvas.height / 2);
  speed = random(3, 6);

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.explode();
      this.y = canvas.height;
      this.x = random(0, canvas.width);
      this.targetY = random(0, canvas.height / 2);
    }
  }

  explode() {
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
      ctx.beginPath();
      ctx.arc(this.x + random(-50, 50), this.y + random(-50, 50), 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const fireworks = Array.from({ length: 6 }, () => new Firework());

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach(f => f.update());
  requestAnimationFrame(animate);
}
animate();

// ⏱️ COUNTDOWN
const countdown = document.getElementById("countdown")!;
const newYear = new Date("Jan 1, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = newYear - now;

  if (diff <= 0) {
    countdown.innerHTML = "🎉 It's 2026! 🎉";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}, 1000);

// 🧑 NAME WISH
const btn = document.getElementById("wishBtn")!;
const input = document.getElementById("nameInput") as HTMLInputElement;
const wish = document.getElementById("wishText")!;

btn.addEventListener("click", () => {
  const name = input.value || "Friend";
  wish.innerHTML = `🥳 Happy New Year 2026, ${name}! 🎆`;
});
