import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useRef, useState, useEffect } from "react";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const TARGET_ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT; // Must maintain 4:3 aspect ratio - add check later

type Corner = "move" | "nw" | "ne" | "sw" | "se";
type Corners = {
  x: number;
  y: number;
  type: Corner;
};

interface ImageCropperProps {
  imageSrc: string | null;
  onCropComplete: (croppedImageUrl: string) => void;
  handleCancelCrop: () => void;
}

const ImageCropper = ({ imageSrc, onCropComplete, handleCancelCrop }: ImageCropperProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cropStart, setCropStart] = useState({ x: 100, y: 100 });
  const [cropSize, setCropSize] = useState({ width: 200, height: 150 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageDims, setImageDims] = useState({ width: 0, height: 0 });
  const [activeHandle, setActiveHandle] = useState<Corner>("move");
  const [hoverHandle, setHoverHandle] = useState<Corner | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const img = new Image();

    img.onload = () => {
      imgRef.current = img;

      // Scale image to fit canvas preserving aspect ratio
      const aspect = img.width / img.height;
      let drawWidth = CANVAS_WIDTH;
      let drawHeight = drawWidth / aspect;
      if (drawHeight > CANVAS_HEIGHT) {
        drawHeight = CANVAS_HEIGHT;
        drawWidth = drawHeight * aspect;
      }

      setImageDims({ width: drawWidth, height: drawHeight });
      drawImageWithCropBox(drawWidth, drawHeight);
    };

    img.src = imageSrc;
    return () => {
      img.onload = null;
      img.src = "";
    };
  }, [imageSrc]);

  const drawImageWithCropBox = (
    drawWidth = imageDims.width,
    drawHeight = imageDims.height
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !imgRef.current) return;

    const imageX = (CANVAS_WIDTH - drawWidth) / 2;
    const imageY = (CANVAS_HEIGHT - drawHeight) / 2;

    // Clear canvas and draw image
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
      imgRef.current,
      0,
      0,
      imgRef.current.width,
      imgRef.current.height,
      imageX,
      imageY,
      drawWidth,
      drawHeight
    );

    // Draw semi-transparent overlay everywhere except the crop area
    ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.rect(cropStart.x, cropStart.y, cropSize.width, cropSize.height);
    ctx.closePath();
    ctx.clip("evenodd");
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();

    // Draw crop box border
    ctx.strokeStyle = theme.palette.primary.main;
    ctx.lineWidth = 2;
    ctx.strokeRect(cropStart.x, cropStart.y, cropSize.width, cropSize.height);

    // Draw resize handles
    const handleSize = 8;
    const corners = [
      { x: cropStart.x, y: cropStart.y, type: "nw" },
      { x: cropStart.x + cropSize.width, y: cropStart.y, type: "ne" },
      { x: cropStart.x, y: cropStart.y + cropSize.height, type: "sw" },
      {
        x: cropStart.x + cropSize.width,
        y: cropStart.y + cropSize.height,
        type: "se",
      },
    ];

    corners.forEach((corner) => {
      ctx.fillStyle = "white";
      ctx.strokeStyle = theme.palette.primary.main;
      ctx.lineWidth = 2;
      ctx.fillRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize
      );
      ctx.strokeRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize
      );
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const handleSize = 10;

    // Check if clicking on a resize handle
    const corners: Corners[] = [
      { x: cropStart.x, y: cropStart.y, type: "nw" },
      { x: cropStart.x + cropSize.width, y: cropStart.y, type: "ne" },
      { x: cropStart.x, y: cropStart.y + cropSize.height, type: "sw" },
      {
        x: cropStart.x + cropSize.width,
        y: cropStart.y + cropSize.height,
        type: "se",
      },
    ];

    for (const corner of corners) {
      if (
        Math.abs(offsetX - corner.x) < handleSize &&
        Math.abs(offsetY - corner.y) < handleSize
      ) {
        setActiveHandle(corner.type);
        setIsDragging(true);
        return;
      }
    }

    // Check if clicking inside the crop box (for moving)
    if (
      offsetX >= cropStart.x &&
      offsetX <= cropStart.x + cropSize.width &&
      offsetY >= cropStart.y &&
      offsetY <= cropStart.y + cropSize.height
    ) {
      setActiveHandle("move");
      setIsDragging(true);
      setOffset({ x: offsetX - cropStart.x, y: offsetY - cropStart.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const handleSize = 10;

    // Check if hovering over a resize handle - only when not dragging
    if (!isDragging) {
      const corners: Corners[] = [
        { x: cropStart.x, y: cropStart.y, type: "nw" },
        { x: cropStart.x + cropSize.width, y: cropStart.y, type: "ne" },
        { x: cropStart.x, y: cropStart.y + cropSize.height, type: "sw" },
        {
          x: cropStart.x + cropSize.width,
          y: cropStart.y + cropSize.height,
          type: "se",
        },
      ];

      let handleFound = false;
      for (const corner of corners) {
        if (
          Math.abs(offsetX - corner.x) < handleSize &&
          Math.abs(offsetY - corner.y) < handleSize
        ) {
          setHoverHandle(corner.type);
          handleFound = true;
          break;
        }
      }

      if (!handleFound) {
        // Check if inside crop box for move cursor
        if (
          offsetX >= cropStart.x &&
          offsetX <= cropStart.x + cropSize.width &&
          offsetY >= cropStart.y &&
          offsetY <= cropStart.y + cropSize.height
        ) {
          setHoverHandle("move");
        } else {
          setHoverHandle(null);
        }
      }
    }
    if (!isDragging) return;

    const imageX = (CANVAS_WIDTH - imageDims.width) / 2;
    const imageY = (CANVAS_HEIGHT - imageDims.height) / 2;

    if (activeHandle === "move") {
      // Moving the entire crop box
      const minX = imageX;
      const minY = imageY;
      const maxX = imageX + imageDims.width - cropSize.width;
      const maxY = imageY + imageDims.height - cropSize.height;

      const newX = Math.max(minX, Math.min(maxX, offsetX - offset.x));
      const newY = Math.max(minY, Math.min(maxY, offsetY - offset.y));

      setCropStart({ x: newX, y: newY });
    } else {
      // Resizing from a corner while maintaining aspect ratio
      const newSize = { ...cropSize };
      const newStart = { ...cropStart };

      // Calculate new dimensions based on mouse position
      if (activeHandle.includes("n")) {
        const newHeight = cropStart.y + cropSize.height - offsetY;
        newSize.width = newHeight * TARGET_ASPECT_RATIO;
        newSize.height = newHeight;
        newStart.y = offsetY;
        newStart.x = cropStart.x + cropSize.width - newSize.width;
      } else if (activeHandle.includes("s")) {
        const newHeight = offsetY - cropStart.y;
        newSize.width = newHeight * TARGET_ASPECT_RATIO;
        newSize.height = newHeight;
      }

      if (activeHandle.includes("e")) {
        const newWidth = offsetX - cropStart.x;
        newSize.height = newWidth / TARGET_ASPECT_RATIO;
        newSize.width = newWidth;
      } else if (activeHandle.includes("w")) {
        const newWidth = cropStart.x + cropSize.width - offsetX;
        newSize.height = newWidth / TARGET_ASPECT_RATIO;
        newSize.width = newWidth;
        newStart.x = offsetX;
      }

      // Apply constraints to keep crop box within image bounds
      if (newStart.x < imageX) {
        newStart.x = imageX;
        newSize.width = cropStart.x + cropSize.width - imageX;
        newSize.height = newSize.width / TARGET_ASPECT_RATIO;
      }

      if (newStart.y < imageY) {
        newStart.y = imageY;
        newSize.height = cropStart.y + cropSize.height - imageY;
        newSize.width = newSize.height * TARGET_ASPECT_RATIO;
      }

      if (newStart.x + newSize.width > imageX + imageDims.width) {
        newSize.width = imageX + imageDims.width - newStart.x;
        newSize.height = newSize.width / TARGET_ASPECT_RATIO;
      }

      if (newStart.y + newSize.height > imageY + imageDims.height) {
        newSize.height = imageY + imageDims.height - newStart.y;
        newSize.width = newSize.height * TARGET_ASPECT_RATIO;
      }

      setCropSize(newSize);
      setCropStart(newStart);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle("move");
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setActiveHandle("move");
      setHoverHandle(null);
    }
  };

  useEffect(() => {
    if (!imageSrc) return;

    let animationId: number;
    const animate = () => {
      drawImageWithCropBox();
      animationId = requestAnimationFrame(animate);
    };

    if (isDragging) {
      animate();
    } else {
      drawImageWithCropBox();
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging, cropStart, cropSize, imageSrc]);

  const getCursorStyle = () => {
    if (isDragging) {
      return activeHandle === "move" ? "grabbing" : `${activeHandle}-resize`;
    }

    if (hoverHandle) {
      return hoverHandle === "move" ? "move" : `${hoverHandle}-resize`;
    }

    return "default";
  };

  const handleCrop = () => {
    if (!imgRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = cropSize.width;
    canvas.height = cropSize.height;
    const ctx = canvas.getContext("2d");

    const scaleX = imgRef.current.width / imageDims.width;
    const scaleY = imgRef.current.height / imageDims.height;
    const offsetX = (CANVAS_WIDTH - imageDims.width) / 2;
    const offsetY = (CANVAS_HEIGHT - imageDims.height) / 2;

    const srcX = (cropStart.x - offsetX) * scaleX;
    const srcY = (cropStart.y - offsetY) * scaleY;
    const srcW = cropSize.width * scaleX;
    const srcH = cropSize.height * scaleY;

    ctx?.drawImage(
      imgRef.current,
      srcX,
      srcY,
      srcW,
      srcH,
      0,
      0,
      cropSize.width,
      cropSize.height
    );

    const croppedDataUrl = canvas.toDataURL();
    const img = document.createElement("img");
    img.src = croppedDataUrl;
    onCropComplete(croppedDataUrl);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: "1px solid #ccc",
          marginTop: "1rem",
          cursor: getCursorStyle(),
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
      <div className="flex gap-4 mt-2 justify-end">
        <Button
          variant="grey"
          onClick={handleCancelCrop}
          className="self-start"
        >
          Cancel
        </Button>
        <Button variant="grey" onClick={handleCrop}>
          Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
