import { useLayoutEffect, useRef } from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

export function Nostalgic(props) {
  const { Metal, plasticTexture } = props;
  const { nodes, materials } = useGLTF("/nostalgic_key.glb");

  const ring = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useLayoutEffect(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    applyProps(materials["orange-green-plastic-GLOSS"], {
      color: "#F76917",
      roughness: 0.1,
      roughnessMap: null,
      normalMap: plasticTexture,
      // normalScale: [4, 4],
      emissive: "#F76917",
      emissiveIntensity: 0.3,
      // map: plasticTexture,
    });
    applyProps(materials["teal-plastic-GLOSS"], {
      color: "#05DEB6",
      roughness: 0,
      roughnessMap: null,
      clearcoat: true,
      clearcoatRoughness: 0.1,
      normalMap: plasticTexture,
      // normalScale: [4, 4],
      emissive: "#05DEB6",
      emissiveIntensity: 0.5,
    });
  }, [nodes, materials, plasticTexture]);

  return (
    <>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody position={[0.5, 0, 0]} ref={j1}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <group {...props} dispose={null}>
        <mesh
          ref={ring}
          geometry={nodes["nostalgic-keyring-keyring"].geometry}
          // material={materials["RM-metal-mid-chrome"]}
          receiveShadow
          castShadow
        >
          <Metal />
          <mesh
            geometry={nodes["nostalgic-key"].geometry}
            // material={materials["RM-metal-mid-chrome"]}
            position={[-0.029, -0.08, 0.005]}
            rotation={[0, -0.013, 0]}
            receiveShadow
            castShadow
          >
            <Metal />
          </mesh>
          <group position={[0.033, -0.067, 0.004]} rotation={[0, -0.013, 0]}>
            <mesh
              geometry={nodes["nostalgic-key001_1"].geometry}
              material={materials["orange-green-plastic-GLOSS"]}
              receiveShadow
              castShadow
            />
            <mesh
              geometry={nodes["nostalgic-key001_2"].geometry}
              material={materials["teal-plastic-GLOSS"]}
              receiveShadow
              castShadow
            />
            <mesh
              geometry={nodes["nostalgic-key001_3"].geometry}
              // material={materials["RM-metal-mid-chrome"]}
              receiveShadow
              castShadow
            >
              <Metal />
            </mesh>
          </group>
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/nostalgic_key.glb");

export default Nostalgic;
