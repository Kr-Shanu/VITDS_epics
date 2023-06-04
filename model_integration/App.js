const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
let img = './uploads/k1.jpg'
const path = require('path');
// multer to hanlde upload
const upload = multer({ dest: 'uploads/' });


const app = express();
const port = 3000;

async function loadModel() {

    const modelPath = path.resolve(__dirname, './model/model.json');
    const model = tf.loadGraphModel('file://' + modelPath);


    const weightFilePaths = (__dirname,
        ['./model/group1-shard1of3.bin',
            './model/group1-shard2of3.bin',
            './model/group1-shard1of3.bin']);

    for (const filePath of weightFilePaths) {
        const buffer = fs.readFileSync(filePath);
        const weights = new Uint8Array(buffer);
        const variableName = filePath.split('/').pop().split('.').shift();
        await tf.io.loadWeights(tf.io.browserFiles([{
            name: variableName,
            array: weights
        }]), model);
    }

    return model;
}


app.post('/inference', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        // Load the model architecture and weights as shown in the previous code snippet
        const model = await loadModel();

        // Load and preprocess the input image
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');

        const image = await loadImage(imagePath);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const inputTensor = tf.browser.fromPixels(imageData).expandDims();

        // Run inference
        const outputTensor = model.predict(inputTensor);

        // Postprocess the output tensor if needed
        const outputData = outputTensor.arraySync();

        // Convert output tensor to an output image
        const outputImage = tf.browser.toPixels(outputTensor.squeeze());
        const outputCanvas = createCanvas(outputImage.width, outputImage.height);
        const outputCtx = outputCanvas.getContext('2d');
        const outputImageData = outputCtx.createImageData(outputImage.width, outputImage.height);
        outputImageData.data.set(outputImage.data);
        outputCtx.putImageData(outputImageData, 0, 0);

        // Save the output image to the output folder
        const outputPath = 'path/to/your/output/folder/output.jpg';
        const outputBuffer = outputCanvas.toBuffer('image/jpeg');
        fs.writeFileSync(outputPath, outputBuffer);

        console.log('Output image saved successfully.');

        // Send the output image as a response
        res.sendFile(outputPath);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during inference.');
    }
});

app.listen(port || 5000, () => {
    console.log(`Server listening on port ${port}`);
});