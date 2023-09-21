const canvas = document.getElementById('color-wheel');
const context = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 15; // modified radius to be slightly smaller

// draw the outer circle with a slightly larger radius and a different color to create the border effect
context.beginPath();
context.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
context.strokeStyle = '#fcfdfd';
context.lineWidth = 1;
context.stroke();

// add event listener to canvas element
canvas.addEventListener('click', function(event) {
    // get x and y coordinates of click
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // calculate angle of selected color
    const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
    const selectedColor = `hsl(${angle}, 100%, 50%)`;

    // calculate complementary color
    const complementaryAngle = (angle + 180) % 360;
    const complementaryColor = `hsl(${complementaryAngle}, 100%, 50%)`;

    // update color boxes with selected and complementary colors
    const currentColorBox = document.getElementById('current-color');
    const complementaryColorBox = document.getElementById('complementary-color');
    if (currentColorBox && complementaryColorBox) {
        currentColorBox.style.backgroundColor = selectedColor;
        complementaryColorBox.style.backgroundColor = complementaryColor;
    }
});

for (let angle = 0; angle < 360; angle += 1) {
        const startAngle = (angle - 2) * Math.PI / 180;
        const endAngle = angle * Math.PI / 180;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();
        context.fillStyle = `hsl(${angle}, 100%, 50%)`;
        context.fill();
}

