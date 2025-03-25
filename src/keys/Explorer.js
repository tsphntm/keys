import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Explorer = (props) => {
  const { Metal, Plastic } = props;
  const { nodes, materials } = useGLTF("/explorer_keys-transformed.glb");

  const ref = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    ref.current.rotation.y = props.rotation[1] + Math.sin(time) * 0.3;
  });

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes["explorer-carabiner_1"].geometry}>
        <Plastic color={"#007054"} />
      </mesh>
      <mesh geometry={nodes["explorer-carabiner_2"].geometry}>
        <Metal />
      </mesh>
    </group>
  );
};

useGLTF.preload("/explorer_keys-transformed.glb");

export default Explorer;
