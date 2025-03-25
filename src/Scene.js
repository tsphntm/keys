import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

import Key from "./Key";
import Env from "./Env";
import Effects from "./Effects";

const Scene = ({
  dev,
  keys,
  currentKey,
  selected,
  degrade,
  setShowOptions,
}) => {
  const [animateKeys, setAnimateKeys] = useState(true);
  const keyContainer = useRef();
  const keySlider = useRef();

  useEffect(() => {
    if (!keyContainer.current) return;
    gsap.to(keyContainer.current.position, {
      y: 0.13,
      duration: 2,
      ease: "elastic.out(1,0.8)",
      onComplete: () => {
        setAnimateKeys(true);
      },
    });
  }, []);

  useEffect(() => {
    if (!keySlider.current) return;
    const index = keys.findIndex((key) => key.name === currentKey);
    gsap.to(keySlider.current.position, {
      x: index * -1,
      ease: "elastic.out(1,0.8)",
      duration: 2,
    });
  }, [keys, currentKey]);

  return (
    <>
      {dev && <OrbitControls />}
      <group ref={keyContainer} position={[0, 1, 0]}>
        <group ref={keySlider}>
          {keys.map((key, index) => {
            return (
              <Key
                key={index}
                name={key.name}
                position={key.position}
                rotation={key.rotation}
                selected={selected}
                currentKey={currentKey}
                animateKeys={animateKeys}
                setAnimateKeys={setAnimateKeys}
                setShowOptions={setShowOptions}
                degrade={degrade}
              />
            );
          })}
        </group>
      </group>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[0, 0.8, 1]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={1}
        shadow-bias={-0.0001}
      />
      <Effects />
      <Env degrade={degrade} />
    </>
  );
};

export default Scene;
