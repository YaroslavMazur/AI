const fileInput = document.querySelector("#fileInput");
const vectorP = document.querySelector(".vectorP");
const normP = document.querySelector(".normP");
const normBtn = document.querySelector(".normBtn");
const vectorBtn = document.querySelector(".vectorBtn");


let vector = [];
let pixelColors;
let n;
const meshSize = 4; //сітка 2*2


fileInput.addEventListener("change", async () => {
  pixels = await getDataBMP();
});

async function getDataBMP() {

  const imageFile = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = async () => {
    const imageBuffer = reader.result;

    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      n = img.width;  

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      pixelColors = imageData.data;

      console.log(pixelColors);

      vectorP.textContent = "";
      normP.textContent = "";
    };

    // Завантажте зображення
    img.src = URL.createObjectURL(imageFile);
  };

  reader.readAsArrayBuffer(imageFile);
}

vectorBtn.addEventListener("click", () => {

  if (fileInput.files[0]) {
    generateVector(pixelColors);
  }
})

normBtn.addEventListener("click",()=>{
  let max = Math.max(...vector);
  //if(max) return;
  vector = vector.map((num)=> num / max);
  normP.textContent = `Нормований вектор[${vector}]`
})

function generateVector(pixels) {

  let colorBits = [];
  vector = [];
  for (let i = 0; i <= pixels.length - meshSize; i += meshSize) {
    colorBits.push(pixels[i] === 0 ? 1 : 0);
    
  }

  console.log("colorBits", colorBits, "Довжина", colorBits.length);

  for (let i = 0; i < n*n - n; i += n*2) {
    for (let j = 0; j < n; j += Math.sqrt(meshSize)) {

      let count = 0;

      count += colorBits[i+j];
      count += colorBits[i+j + 1];
      count += colorBits[i+j + 12];
      count += colorBits[i+j + 13];

      vector.push(count);
      count = 0;

    }
  }

  vectorP.textContent = `Вектор ознак [${vector}]\n Довжина: ${vector.length}`;

  console.log(vector);
}