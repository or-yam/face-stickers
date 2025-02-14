export async function setupCamera({
  displaySize,
  videoRef,
}: {
  displaySize: { width: number; height: number };
  videoRef: HTMLVideoElement;
}) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        // width: displaySize.width,
        // height: displaySize.height,
        width: { max: displaySize.width, ideal: 1280 },
        height: { max: displaySize.height, ideal: 720 },
        facingMode: "user",
      },
    });
    videoRef.srcObject = stream;

    return new Promise<void>((resolve) => {
      videoRef.onloadedmetadata = () => {
        videoRef.play();
        resolve();
      };
    });
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Could not access camera. Please check permissions.");
  }
}
