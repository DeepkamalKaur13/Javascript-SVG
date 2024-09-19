document.addEventListener('DOMContentLoaded', () => {
  let svgContainer = document.getElementById("diceContainer");
  let sideEnter = document.getElementById("userValue");
  let removeBtn = document.getElementById("removeBtn");
  let addBtn = document.getElementById("addBtn");
  let diceCount = 0;

  function createDice(userValue) {
    // Create SVG element
    let dice = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    dice.setAttribute("width", "100");
    dice.setAttribute("height", "100");
    dice.setAttribute("viewBox", "0 0 100 100");
    
    // Create polygon element
    let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", polyPoints(userValue, 50, 50, 40));
    poly.setAttribute("stroke", "#000080");
    poly.setAttribute("fill", "#E31C79");
    poly.setAttribute("stroke-width", "2")

    // Append polygon to SVG
    dice.appendChild(poly);
    
    // Append SVG to container
    svgContainer.appendChild(dice);

    // Event listeners for the dice
    dice.addEventListener('click', () => {
      poly.setAttribute("fill", randomColor());
    });

    dice.addEventListener('dblclick', () => {
      svgContainer.removeChild(dice);
    });
    diceCount++;
  }

  function polyPoints(userValue, centerX, centerY, radius) {
    let points = '';
    for (let i = 0; i < userValue; i++) {
      const angle = (2 * Math.PI / userValue) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points += `${x},${y} `;
    }
    return points.trim();
  }

  function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  removeBtn.addEventListener('click', () => {
    if (svgContainer.firstChild) {
      svgContainer.removeChild(svgContainer.firstChild);
      diceCount--;
    }
  });

  addBtn.addEventListener('click', () => {
    var sideValue = parseInt(sideEnter.value);
    if (!isNaN(sideValue) && sideValue >= 3) {
      createDice(sideValue);
    } else {
      alert('Please enter a valid number of sides (3 or more).');
    }
  });

  sideEnter.addEventListener('change', () => {
    const sideValue = parseInt(sideEnter.value, 10);
    if (!isNaN(sideValue) && sideValue >= 3) {
      document.querySelectorAll('#diceContainer svg').forEach(dice => {
        const poly = dice.querySelector('polygon');
        if (poly) {
          poly.setAttribute('points', polyPoints(sideValue, 50, 50, 40));
        }
      });
    }
  });

  createDice(8); // Initial dice creation
});
