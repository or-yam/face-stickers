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
        width: displaySize.width,
        height: displaySize.height,
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
