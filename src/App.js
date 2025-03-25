import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import * as THREE from "three";
import Controls from "./Controls";
import Scene from "./Scene";
import "./App.css";

const radius = 0.5;
const keys = ["enthusiast", "nostalgic", "dreamer"].map(
  (name, index, array) => {
    const position = [index, 0, 0];
    const rotation = [0, 0, 0];
    return { name, position, rotation };
  }
);

console.log(keys);

const App = () => {
  const [dev, setDev] = useState(false);
  const [degrade, setDegrade] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setCurrentKey(keys[0].name);
  }, []);

  useEffect(() => {
    console.log("degrade", degrade);
  }, [degrade]);

  return (
    <div className="app">
      {currentKey && (
        <div className="border">
          <Controls
            keys={keys}
            currentKey={currentKey}
            setCurrentKey={setCurrentKey}
            selected={selected}
            setSelected={setSelected}
            showOptions={showOptions}
          />
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              colorSpace: THREE.SRGBColorSpace,
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
            camera={{ position: [0, 0, 0.6] }}
          >
            <Physics>
              <Scene
                dev={dev}
                radius={radius}
                keys={keys}
                currentKey={currentKey}
                selected={selected}
                degrade={degrade}
                setShowOptions={setShowOptions}
              />
            </Physics>
            <PerformanceMonitor
              onChange={(e) => {
                setDegrade(e.fps < 45 ? true : false);
              }}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default App;
