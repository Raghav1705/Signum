const webcamElement = document.getElementById('webcam');

let net;

async function app() {
  console.log('Loading mobilenet..');

  // Loading model
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Creating object from Tensorflow.js data API to capture image from webcam as Tensor
console.log(webcamElement);
  const webcam = await tf.data.webcam(webcamElement);

  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
    // Disposing  tensor to release memory
    img.dispose();

    // Waiting for next animation frame
    await tf.nextFrame();
  }
}

app();
