const button = document.querySelector('button');
const size = 1343591 * 8;
const test_count = 1000;
let test_results = [];
const progress = document.querySelector('.progress');
const speedText = document.querySelector('.speed-text');

function loadImage() {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = './test.gif?' + parseInt(Math.random() * 10000);
    let startTime = Date.now();

    image.onload = function () {
      let endTime = Date.now();
      resolve(endTime - startTime);
    };

    image.onerror = function (err) {
      reject(err);
    };
  });
}

async function getloadSpeed() {
  let loadTime = await loadImage();

  if (loadTime < 1) loadTime = 1;

  let speed_bps = size / loadTime;
  let speed_kbps = speed_bps / 1024;

  return speed_kbps;
}

function getAvgSpeed() {
  let sum = test_results.reduce((a, b) => a + b, 0);

  return sum / test_results.length;
}

button.addEventListener('click', async function () {
  for (let i = 0; i < test_count; i++) {
    let speed = await getloadSpeed();
    test_results.push(speed);
    progress.style.width = ((i + 1) / test_count) * 100 + '%';
    speedText.innerText = getAvgSpeed().toFixed(2) + ' kbps';
  }

  console.log(getAvgSpeed());
});
