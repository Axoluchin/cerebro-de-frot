import { MeshProps, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState } from "react";

interface BoxProps extends MeshProps {
  onActive: VoidFunction;
}

const Box = ({ onActive, ...props }: BoxProps) => {
  const texture = useTexture("/Saul.jpeg");
  const textureFrot = useTexture("/frot.jpg");
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (active) {
      delta += 0.01;
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 4 : 2}
      onClick={() => {
        setActive(true);
        onActive();
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={active ? texture : textureFrot}
        color={active ? "yellow" : undefined}
      />
    </mesh>
  );
};

export default Box;
