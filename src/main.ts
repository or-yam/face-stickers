import { loadAuraStickers, loadHairStickers } from "./image";
import { setupCamera } from "./camera";
import { loadModels } from "./faceRecognition";
import {
  detectAllFaces,
  resizeResults,
  TinyFaceDetectorOptions,
} from "face-api.js";
import { drawAura, drawBox, drawHair } from "./draw";

const displaySize = { width: 640, height: 480 };

const hairStickers = loadHairStickers();
const auraStickers = loadAuraStickers();

const hairSelect = document.getElementById("hairSelect") as HTMLSelectElement;
const auraSelect = document.getElementById("auraSelect") as HTMLSelectElement;
const video = document.getElementById("videoInput") as HTMLVideoElement;
const canvas = document.getElementById("outputCanvas") as HTMLCanvasElement;
canvas.width = displaySize.width;
canvas.height = displaySize.height;

let hairImage = hairStickers[0].imageElement;
let auraImage = auraStickers[0].imageElement;

hairStickers.forEach((sticker) => {
  const option = document.createElement("option");
  option.value = sticker.name;
  option.text = sticker.name;
  option.selected = sticker.name === "off";
  hairSelect.appendChild(option);
});

auraStickers.forEach((sticker) => {
  const option = document.createElement("option");
  option.value = sticker.name;
  option.text = sticker.name;
  option.selected = sticker.name === "off";
  auraSelect.appendChild(option);
});

hairSelect.addEventListener("change", (event) => {
  const selectedHairName = (event.target as HTMLSelectElement).value;
  const selectedHairImage = hairStickers.find(
    (sticker) => sticker.name === selectedHairName,
  )?.imageElement;
  if (selectedHairImage !== undefined) {
    hairImage = selectedHairImage;
  }
});

auraSelect.addEventListener("change", (event) => {
  const selectedAuraName = (event.target as HTMLSelectElement).value;
  const selectedAuraImage = auraStickers.find(
    (sticker) => sticker.name === selectedAuraName,
  )?.imageElement;
  if (selectedAuraImage !== undefined) {
    auraImage = selectedAuraImage;
  }
});

async function detectFaces() {
  const detections = await detectAllFaces(video, new TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptors();

  canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

  const resizedDetections = resizeResults(detections, displaySize);

  resizedDetections.forEach((detection) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!hairImage && !auraImage) return;
    const landmarks = detection.landmarks;
    const box = detection.detection.box;

    drawBox({ ctx, box });
    if (hairImage) drawHair({ box, ctx, image: hairImage, landmarks });
    if (auraImage) drawAura({ box, ctx, image: auraImage, landmarks });
  });

  setTimeout(() => requestAnimationFrame(detectFaces), 100);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadModels();
  await setupCamera({ displaySize, videoRef: video });

  detectFaces();
});
