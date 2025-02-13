import { nets } from "face-api.js";

const detectorUrl =
  "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights" as const;

export async function loadModels() {
  try {
    await Promise.all([
      nets.tinyFaceDetector.loadFromUri(detectorUrl),
      nets.faceLandmark68Net.loadFromUri(detectorUrl),
      nets.faceRecognitionNet.loadFromUri(detectorUrl),
    ]);
  } catch (error) {
    console.error("Error loading models:", error);
    alert("Failed to load face detection models");
  }
}
