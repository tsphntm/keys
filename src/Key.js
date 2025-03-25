import { useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

import Dreamer from "./keys/Dreamer";
import Enthusiast from "./keys/Enthusiast";
import Explorer from "./keys/Explorer";
import Nostalgic from "./keys/Nostalgic";

import { GSAP_CONFIG } from "./config";

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
  setAnimateKeys,
  setShowOptions,
  degrade,
}) => {
  const ref = useRef();

  const plasticTexture = useLoader(
    THREE.TextureLoader,
    "/plastic-grain-NRM.jpg"
  );

  const handleAnimation = useCallback(() => {
    if (selected === name) {
      gsap.to(ref.current.position, GSAP_CONFIG.moveForward(position));
      gsap.to(
        ref.current.rotation,
        GSAP_CONFIG[name](ref.current.rotation, () => setShowOptions(true))
      );
    } else {
      setShowOptions(false);
      gsap.to(ref.current.position, GSAP_CONFIG.moveBackward(position));
    }
  }, [name, position, selected, setShowOptions]);

  useEffect(() => {
    if (!ref.current) return;
    if (animateKeys) {
      gsap.to(ref.current.position, GSAP_CONFIG.float(position));
      gsap.to(ref.current.rotation, GSAP_CONFIG.spin(rotation));
    } else {
      gsap.killTweensOf(ref.current.position);
      gsap.killTweensOf(ref.current.rotation);
    }
  }, [animateKeys, position, rotation]);

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
