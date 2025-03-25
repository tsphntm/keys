import { Environment, Lightformer, SoftShadows } from "@react-three/drei";

const config = {
  size: 15,
  focus: 2,
  samples: 20,
};

const Lightformers = ({ positions = [2, 0, 2, 0] }) => {
  return (
    <>
      <Lightformer
        form="circle"
        color="white"
        intensity={1}
        position={[0, 0.5, 0.9]}
        scale={[10, 1, 1]}
      />
      <Lightformer
        type="ring"
        color={"white"}
        position={[-1, 0, 1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        type="ring"
        color={"white"}
        position={[1, 0, 1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        type="ring"
        color={"black"}
        position={[0, 0, 1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        color={"white"}
        rotation-y={-Math.PI / 2}
        position={[1, 1, 1]}
        scale={[20, 1, 1]}
      />
    </>
  );
};

const Env = ({ degrade }) => {
  return (
    <>
      <Environment frames={Infinity} resolution={256}>
        <Lightformers />
      </Environment>
      {!degrade && <SoftShadows {...config} />}
      <mesh rotation={[0, 0, 0]} position={[0, 0, -0.12]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Env;
