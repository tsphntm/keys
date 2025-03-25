export const GSAP_CONFIG = {
  float: (position, callback) => {
    return {
      y: position[1] + 0.02,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  spin: (rotation, callback) => {
    return {
      y: rotation[1] + 0.25,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
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
  enthusiast: (rotation, callback) => {
    return {
      z: rotation.z + Math.PI * 2,
      duration: 1.8,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  nostalgic: (rotation, callback) => {
    return {
      x: rotation.x - Math.PI * 2,
      duration: 1.8,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
  dreamer: (rotation, callback) => {
    return {
      y: rotation.y + Math.PI * 2,
      duration: 1.8,
      ease: "elastic.inOut",
      onComplete: () => {
        if (callback) callback();
      },
    };
  },
};
