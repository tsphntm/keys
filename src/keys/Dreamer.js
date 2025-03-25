import React, { useLayoutEffect } from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Dreamer = (props) => {
  const { Metal, plasticTexture } = props;
  const { nodes, materials } = useGLTF("/dreamer_key.glb");

  useLayoutEffect(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    applyProps(materials["baked-material"], {
      roughness: 0.3,
      roughnessMap: null,
      normalMap: plasticTexture,
      clearcoat: true,
    });
  }, [nodes, materials, plasticTexture]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["dreamer-keyring"].geometry}
        // material={materials["RM-metal-mid-chrome"]}
        rotation={[0, -0.008, 0]}
        receiveShadow
        castShadow
      >
        <Metal />
        <mesh
          geometry={nodes["dreamer-key"].geometry}
          // material={materials["RM-metal-mid-chrome"]}
          position={[-0.027, -0.081, -0.005]}
          rotation={[0, -0.008, 0]}
          castShadow
          receiveShadow
        >
          <Metal />
        </mesh>
        <mesh
          geometry={nodes["dreamer-keyring-book"].geometry}
          material={materials["baked-material"]}
          position={[0.023, -0.079, 0.007]}
          rotation={[0, -0.008, 0]}
          castShadow
          receiveShadow
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("/dreamer_keys.glb");

export default Dreamer;
