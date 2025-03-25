import { useLayoutEffect } from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Enthusiast = (props) => {
  const { Metal, plasticTexture } = props;
  const { nodes, materials } = useGLTF("/enthusiast_key.glb");

  useLayoutEffect(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    applyProps(materials["red-plastic-GLOSS"], {
      // color: "#D01506",
      roughness: 0.6,
      roughnessMap: null,
      normalMap: plasticTexture,
      // normalScale: [4, 4],
      emissive: "#D01506",
      emissiveIntensity: 0.2,
      // map: plasticTexture,
    });
    applyProps(materials["yellow-plastic-GLOSS"], {
      color: "#F2B807",
      roughness: 0.1,
      roughnessMap: null,
      clearcoat: true,
      clearcoatRoughness: 0.1,
      normalMap: plasticTexture,
      // normalScale: [4, 4],
      emissive: "#F2B807",
      emissiveIntensity: 0.5,
    });
  }, [nodes, materials, plasticTexture]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["enthusiast-keyring"].geometry}
        // material={materials["RM-metal-mid-chrome"]}
        castShadow
        receiveShadow
      >
        <Metal />
      </mesh>
      <mesh
        geometry={nodes["enthusiast-keys"].geometry}
        material={materials["RM-metal-mid-chrome"]}
        castShadow
        receiveShadow
        scale={0.613}
      >
        <Metal />
      </mesh>
      <group position={[0.018, -0.093, 0.007]}>
        <mesh
          geometry={nodes["enthusiast-keyring-pawprint_1"].geometry}
          material={materials["red-plastic-GLOSS"]}
          castShadow
          receiveShadow
        >
          {/* <Plastic
            color={"#D01506"}
            roughness={0.8}
            clearcoat={false}
            clearcoatRoughness={0.3}
            envMapIntensity={0.8}
            emissive={"#D01506"}
            emissiveIntensity={0.5}
          /> */}
        </mesh>
        <mesh
          geometry={nodes["enthusiast-keyring-pawprint_2"].geometry}
          material={materials["yellow-plastic-GLOSS"]}
          castShadow
          receiveShadow
        >
          {/* <Plastic
            color={"#F2B807"}
            roughness={0}
            clearcoat={true}
            clearcoatRoughness={0}
            envMapIntensity={0.6}
            emissive={"#F2B807"}
            emissiveIntensity={0.7}
          /> */}
        </mesh>
        <mesh
          geometry={nodes["enthusiast-keyring-pawprint_3"].geometry}
          // material={materials["RM-metal-mid-chrome"]}
          castShadow
          receiveShadow
        >
          <Metal />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload("/enthusiast_key.glb");

export default Enthusiast;
