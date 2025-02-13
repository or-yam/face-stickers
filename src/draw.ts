import { Box, FaceLandmarks68 } from "face-api.js";

type DrawProps = {
  landmarks: FaceLandmarks68;
  box: Box;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
};

export const drawBox = ({
  ctx,
  box,
}: Omit<DrawProps, "image" | "landmarks">) => {
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.width, box.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "lime";
  ctx.stroke();
};

export const drawHair = ({ box, ctx, image, landmarks }: DrawProps) => {
  const foreheadPoints = landmarks.getNose().slice(0, 1);
  const foreheadCenter = {
    x: foreheadPoints.reduce((sum, p) => sum + p.x, 0) / foreheadPoints.length,
    y:
      foreheadPoints.reduce((sum, p) => sum + p.y, 0) / foreheadPoints.length -
      25,
  };

  const hairWidth = box.width * 1.5;
  const hairHeight = hairWidth * (image.height / image.width);

  ctx.drawImage(
    image,
    foreheadCenter.x - hairWidth / 2,
    foreheadCenter.y - hairHeight,
    hairWidth,
    hairHeight,
  );
};

export const drawAura = ({ landmarks, box, ctx, image }: DrawProps) => {
  const auraPoints = landmarks.getNose();
  const auraCenter = {
    x: auraPoints.reduce((sum, p) => sum + p.x, 0) / auraPoints.length,
    y: auraPoints.reduce((sum, p) => sum + p.y, 0) / auraPoints.length + 200,
  };

  const auraWidth = box.width * 5;
  const auraHeight = image.height;

  ctx.drawImage(
    image,
    auraCenter.x - auraWidth / 2,
    auraCenter.y - auraHeight,
    auraWidth,
    auraHeight,
  );
};
