import { useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

import Dreamer from "./keys/Dreamer";
import Enthusiast from "./keys/Enthusiast";
import Explorer from "./keys/Explorer";
import Nostalgic from "./keys/Nostalgic";

const GSAP_CONFIG = {
  moveForward: (position, callback) => {
    return {
      z: position[2] + 0.15,
      x: position[0] - 0.14,
      duration: 1.5,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  moveBackward: (position, callback) => {
    return {
      z: position[2],
      x: position[0],
      duration: 1.5,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  spinRound: (rotationZ, callback) => {
    return {
      z: rotationZ + Math.PI * 2,
      duration: 1.8,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  flipBackward: (rotationX, callback) => {
    return {
      x: rotationX - Math.PI * 2,
      duration: 1.8,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
};

const Metal = () => {
  const scratchTexture = useLoader(THREE.TextureLoader, "/scratches.jpg");
  return (
    <meshPhysicalMaterial
      color={"#fff0f0"}
      roughness={0.15}
      metalness={1}
      clearcoat={true}
      envMapIntensity={0.5}
      // map={scratchTexture}
      side={THREE.DoubleSide}
    />
  );
};

const Plastic = ({
  color,
  roughness,
  clearcoat,
  clearcoatRoughness,
  envMapIntensity,
  emissive,
  emissiveIntensity,
}) => {
  const plasticTexture = useLoader(
    THREE.TextureLoader,
    "/plastic-grain-NRM.jpg"
  );
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      clearcoat={clearcoat}
      clearcoatRoughness={clearcoatRoughness}
      envMapIntensity={envMapIntensity}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      map={plasticTexture}
      side={THREE.DoubleSide}
    />
  );
};

const Key = ({
  name,
  selected,
  currentKey,
  position,
  rotation,
  animateKeys,
  setShowOptions,
}) => {
  const ref = useRef();

  const plasticTexture = useLoader(
    THREE.TextureLoader,
    "/plastic-grain-NRM.jpg"
  );

  const handleAnimation = useCallback(() => {
    if (selected === name) {
      gsap.to(
        ref.current.position,
        GSAP_CONFIG.moveForward(position, () => setShowOptions(true))
      );
      gsap.to(
        ref.current.rotation,
        GSAP_CONFIG.spinRound(ref.current.rotation.z)
      );
    } else {
      setShowOptions(false);
      gsap.to(ref.current.position, GSAP_CONFIG.moveBackward(position));
    }
  }, [name, position, selected, setShowOptions]);

  useFrame(({ clock }) => {
    if (!animateKeys) return;
    const time = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.cos(time) * 0.02;
    ref.current.rotation.y = rotation[1] + Math.sin(time) * 0.3;
  });

  useEffect(() => {
    handleAnimation();
  }, [selected, handleAnimation]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {name === "dreamer" && (
        <Dreamer
          position={[0, 0, 0]}
          rotation={[Math.PI * -0.1, Math.PI * 0.15, 0]}
          selected={selected}
          Metal={Metal}
          Plastic={Plastic}
          GSAP_CONFIG={GSAP_CONFIG}
          plasticTexture={plasticTexture}
        />
      )}
      {name === "enthusiast" && (
        <Enthusiast
          position={[0, 0, 0]}
          rotation={[Math.PI * -0.1, Math.PI * 0.15, 0]}
          selected={selected}
          Metal={Metal}
          Plastic={Plastic}
          GSAP_CONFIG={GSAP_CONFIG}
          plasticTexture={plasticTexture}
        />
      )}
      {name === "explorer" && (
        <Explorer selected={selected} Metal={Metal} Plastic={Plastic} />
      )}
      {name === "nostalgic" && (
        <Nostalgic
          position={[0, 0, 0]}
          rotation={[Math.PI * -0.1, Math.PI * 0.12, 0]}
          selected={selected}
          Metal={Metal}
          Plastic={Plastic}
          GSAP_CONFIG={GSAP_CONFIG}
          plasticTexture={plasticTexture}
        />
      )}
    </group>
  );
};

export default Key;
