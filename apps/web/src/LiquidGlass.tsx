import { useEffect } from "react";
// @ts-expect-error liquid-gl does not provide TypeScript declarations.
import liquidGL from "liquid-gl";

export default function LiquidGlass() {
  useEffect(() => {
    const glassEffect = liquidGL({
      target: ".achion-liquid-glass",
      snapshot: "body",
      engine: "auto",
      resolution: 2,
      refraction: 0.02,
      bevelDepth: 0.08,
      bevelWidth: 0.15,
      frost: 2,
      shadow: true,
      specular: true,
      tilt: true,
      tiltFactor: 4,
      interaction: "fluid",
      interactionStrength: 0.35,
      interactionRadius: 0.35,
      interactionViscosity: 0.65,
      reveal: "none",

      on: {
        init() {
          console.log("ACHION Liquid Glass READY");
        },
      },
    });

    return () => {
      glassEffect.destroy();
    };
  }, []);

  return (
    <div className="achion-liquid-glass">
      <div className="liquid-glass-content">
        <h2>ACHION</h2>
        <p>Liquid Glass Test</p>
      </div>
    </div>
  );
}
