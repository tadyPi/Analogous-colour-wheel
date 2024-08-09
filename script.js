const canvas = document.getElementById("color-wheel");
const context = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 15; // modified radius to be slightly smaller

// draw the outer circle with a slightly larger radius and a different color to create the border effect
context.beginPath();
context.arc(centerX, centerY, radius + 0, 0, 0 * Math.PI);
context.strokeStyle = "#1a1a1a";
context.lineWidth = 1;
context.stroke();

// add event listener to canvas element
canvas.addEventListener("click", function (event) {
  // get x and y coordinates of click
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // calculate angle of selected color
  const angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
  const selectedColor = `hsl(${angle}, 100%, 50%)`;

  // calculate complementary colors
  const complementaryAngle1 = (angle - 35 + 360) % 360; // Subtract 30 degrees and add 360 to ensure a positive result
  const complementaryColor1 = `hsl(${complementaryAngle1}, 100%, 50%)`;

  const complementaryAngle2 = (angle + 35) % 360; // Add 30 degrees
  const complementaryColor2 = `hsl(${complementaryAngle2}, 100%, 50%)`;

  // update color boxes with selected and complementary colors
  const currentColorBox = document.getElementById("current-color");
  const complementaryColorBox1 = document.getElementById(
    "complementary-color-1"
  );
  const complementaryColorBox2 = document.getElementById(
    "complementary-color-2"
  );
  if (currentColorBox && complementaryColorBox1 && complementaryColorBox2) {
    currentColorBox.style.backgroundColor = selectedColor;
    complementaryColorBox1.style.backgroundColor = complementaryColor1;
    complementaryColorBox2.style.backgroundColor = complementaryColor2;
  }

  // update h1 gradient with selected and complementary colors
  const h1Element = document.querySelector(".mainH1");
  h1Element.style.background = `linear-gradient(to right, ${selectedColor}, ${complementaryColor1}, ${complementaryColor2})`;
  h1Element.style.webkitBackgroundClip = "text";
  h1Element.style.webkitTextFillColor = "transparent";
});

// draw the color wheel
for (let angle = 0; angle < 360; angle += 1) {
  const startAngle = ((angle - 2) * Math.PI) / 180;
  const endAngle = (angle * Math.PI) / 180;
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.closePath();
  context.fillStyle = `hsl(${angle}, 100%, 50%)`;
  context.fill();
}

// New code for draggable functionality...

// Get the app container
// New code for draggable functionality...

const appContainer = document.querySelector(".app-container");

// appContainer needs to have a position set to absolute in order for the draggable functionality to work
appContainer.style.position = "absolute";

let mouseDown = false;
let startX, startY, initialLeft, initialTop;

appContainer.addEventListener("mousedown", (e) => {
  mouseDown = true;
  startX = e.clientX;
  startY = e.clientY;
  initialLeft = appContainer.offsetLeft;
  initialTop = appContainer.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!mouseDown) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  appContainer.style.left = initialLeft + dx + "px";
  appContainer.style.top = initialTop + dy + "px";
});

document.addEventListener("mouseup", () => {
  mouseDown = false;
});
