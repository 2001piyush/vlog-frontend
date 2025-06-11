import React, { useEffect } from "react";

export default function SplineBackground() {
  useEffect(() => {
    // Dynamically load the Spline viewer script once
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.92/build/spline-viewer.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // Allows clicks to pass through
      }}
    >
      <spline-viewer
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/FqtzRm5Cq1Z-zE5x/scene.splinecode"
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      ></spline-viewer>
    </div>
  );
}