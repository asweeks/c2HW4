// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/IgVAL7HJ/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

var types;
var hs = 0;
var ar = 0;
var sh = 0;
var ph = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
  //I created vector Icons to represent my 3 objects
  img = loadImage('phone.png');
  img1 = loadImage('airpods.png');
  img2 = loadImage('sharpener.png');
}

function setup() {
  createCanvas(320, 300);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(227, 21, 77);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(24);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);

  image(img, 40, 250, 22, 40);
  image(img1, width / 2 - 30, 250, 22, 40);
  image(img2, width - 100, 250, 24, 40);

  text(": " + (ar), width / 2, 280);

  text(": " + (sh), width - 70, 280);

  text(": " + (ph), 70, 280);

  if (label == "Airpods" && hs != 1) {
    ar++;
    hs = 1;
  }

  if (label == "Sharpener" && hs != 2) {
    sh++;
    hs = 2;
  }

  if (label == "Phone" && hs != 3) {
    ph++;
    hs = 3;
  }

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}



// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
