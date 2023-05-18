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


// Defining the route for handling image uploads
app.post('/upload', upload.single('image'), async (req, res) => {

    try {

        const modelPath = path.resolve(__dirname, './model/model.json');
        const model = await tf.loadLayersModel('file://' + modelPath);

        console.log(modelPath, " is correct");


        // Converting the image to a TensorFlow.js tensor
        const input = tf.browser.fromPixels(img);
        const expandedInput = input.expandDims();

        const predictions = model.predict(expandedInput);

        // Converting the predictions to an array
        const predictionsArray = Array.from(await predictions.data());

        const imageUrl = predictionsArray[0];

        // Fetch the image using axios
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Save the image to a file
        const outputPath = path.resolve(__dirname, 'output', 'result.jpg');
        fs.writeFileSync(outputPath, imageBuffer);

        console.log('Image saved to:', outputPath);

        // Return the predictions as the response
        res.status(200).json({ predictions: `Check output folder for result` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {

        // will add a function to delete the output/upload files after the result
        console.log("Work Done");
    }
});


app.listen(port || 5000, () => {
    console.log(`Server listening on port ${port}`);
});