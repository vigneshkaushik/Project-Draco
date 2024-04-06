import React, { useRef, useEffect, useState, useContext } from "react";
import { StateContext } from "../App";

const SketchCanvas = () => {
  const { drawingData, setDrawingData } = useContext(StateContext);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const containerStyle = getComputedStyle(container);

    const width = parseInt(containerStyle.width);
    const height = parseInt(containerStyle.height);

    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    contextRef.current = context;

    // Redraw existing paths stored in drawingData on component mount
    redrawCanvas();
  }, []);

  const redrawCanvas = () => {
    drawingData.forEach((path) => {
      path.forEach((point, index) => {
        if (index === 0) {
          contextRef.current.beginPath();
          contextRef.current.moveTo(point.x, point.y);
        } else {
          contextRef.current.lineTo(point.x, point.y);
          contextRef.current.stroke();
        }
      });
      contextRef.current.closePath();
    });
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setDrawingData((prev) => [...prev, [{ x: offsetX, y: offsetY }]]); // Start a new path
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // Append new point to the current path
    setDrawingData((prev) => {
      const paths = [...prev];
      const currentPath = paths[paths.length - 1];
      currentPath.push({ x: offsetX, y: offsetY });
      return paths;
    });
  };

  return (
    <>
      <h3>Sketch</h3>
      <div
        className="sketch-canvas-container"
        style={{ width: "100%", height: "500px", border: "1px solid black" }}
      >
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </>
  );
};

export default SketchCanvas;
