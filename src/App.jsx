import { useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { LUTPass } from "three-stdlib";
import Snowfall from "react-snowfall";

import Box from "./components/Box";

extend({ LUTPass });

const bits = [1, 100, 1000, 5000, 10000];

function App() {
  const [isActive, setIsActive] = useState(false);

  const onActive = () => {
    setIsActive(true);
    const audio = new Audio("/jaja.mp3");
    audio.play();
  };

  const snowImgs = bits.map((b) => {
    const snownFlake = document.createElement("img");
    snownFlake.src = `bits/${b}.png`;
    return snownFlake;
  });

  return (
    <main>
      <h1 style={{ textAlign: "center", display: isActive ? "none" : "block" }}>
        Presiona el frot
      </h1>
      <Canvas
        className={`${isActive && "container-gay"}`}
        style={{ height: "100vh" }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box onActive={onActive} position={[0, 0, 0]} />
      </Canvas>
      {isActive && (
        <Snowfall snowflakeCount={300} images={snowImgs} radius={[20, 30]} />
      )}
    </main>
  );
}

export default App;
