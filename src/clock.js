const getClock = () => {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let radius = canvas.height / 2;
  context.translate(radius, radius);
  radius = radius * 0.9;
  setInterval(() => drawClock(context, radius), 1000);
};
const drawClock = (context, radius) => {
  drawFace(context, radius);
  drawNumbers(context, radius);
  drawTime(context, radius);
};

const drawFace = (context, radius) => {
  let grad;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = "white";
  context.fill();
  grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  context.strokeStyle = grad;
  context.lineWidth = radius * 0.1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  context.fillStyle = "#333";
  context.fill();
};

const drawNumbers = (context, radius) => {
  context.font = radius * 0.15 + "px arial";
  context.textBaseline = "middle";
  context.textAlign = "center";
  for (let count = 1; count < 13; count++) {
    const angle = (count * Math.PI) / 6;
    context.rotate(angle);
    context.translate(0, -radius * 0.85);
    context.rotate(-angle);
    context.fillText(count.toString(), 0, 0);
    context.rotate(angle);
    context.translate(0, radius * 0.85);
    context.rotate(-angle);
  }
};

const drawTime = (context, radius) => {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(context, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(context, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second * Math.PI) / 30;
  drawHand(context, second, radius * 0.9, radius * 0.02);
};

const drawHand = (context, pos, length, width) => {
  context.beginPath();
  context.lineWidth = width;
  context.lineCap = "round";
  context.moveTo(0, 0);
  context.rotate(pos);
  context.lineTo(0, -length);
  context.stroke();
  context.rotate(-pos);
};

window.onload = getClock;
