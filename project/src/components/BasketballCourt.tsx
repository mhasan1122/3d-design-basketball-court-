import { useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BasketballCourtProps {
  courtColor: string;
  keyColor: string;
  dimensions: {
    width: number;
    length: number;
  };
}

function BasketballCourt({ courtColor, keyColor, dimensions }: BasketballCourtProps) {
  const courtRef = useRef<any>(null);
  const { width, length } = dimensions;
  const scale = 0.3; // Scale down the court size for better visualization

  // Helper function to create basketball hoops
 const createHoop = (position: Vector3, rotationY: number) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Backboard */}
    <mesh position={[0, 10 * scale, -2 * scale]}>
      <boxGeometry args={[4 * scale, 3 * scale, 0.2 * scale]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>

    {/* Hoop (Red) */}
    <mesh position={[0, 8 * scale, -3 * scale]} rotation={[Math.PI / 2, 0, 1]}>
      <torusGeometry args={[1.5 * scale, 0.2 * scale, 16, 100]} />
      <meshStandardMaterial color="#FF0000" /> {/* Updated to red */}
    </mesh>

    {/* Support Pole */}
    <mesh position={[0, 5 * scale, 0]}>
      <boxGeometry args={[0.5 * scale, 10 * scale, 0.5 * scale]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  </group>
);


  // Helper function to create boundary nets
  const createBoundaryNet = (position: Vector3, rotation: [number, number, number], size: [number, number]) => (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size[0] * scale, size[1] * scale]} />
      <meshStandardMaterial color="#000000" transparent opacity={0.3} wireframe />
    </mesh>
  );

  return (
    <group ref={courtRef}>
      {/* Court Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * scale, length * scale]} />
        <meshStandardMaterial color={courtColor} side={THREE.DoubleSide} /> {/* Make the floor double-sided */}
      </mesh>

      {/* Keys */}
      <mesh position={[0, 0.01, (length * 0.4 * scale)]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16 * scale, 19 * scale]} />
        <meshStandardMaterial color={keyColor} side={THREE.DoubleSide} /> {/* Make the keys double-sided */}
      </mesh>
      <mesh position={[0, 0.01, -(length * 0.4 * scale)]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16 * scale, 19 * scale]} />
        <meshStandardMaterial color={keyColor} side={THREE.DoubleSide} /> {/* Make the keys double-sided */}
      </mesh>

      {/* Center Circle */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6 * scale, 6.2 * scale]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Hoops */}
      {createHoop(new Vector3(0, 0, length * 0.45 * scale), 0)} {/* First hoop moved inward */}
      {createHoop(new Vector3(0, 0, -length * 0.45 * scale), Math.PI)} {/* Second hoop moved inward */}

      {/* Boundary Nets */}
      {/* Side Nets (Short Sides) */}
      {createBoundaryNet(
        new Vector3(width * 0.5 * scale, 5 * scale, 0),
        [0, -Math.PI / 2, 0],
        [length * scale, 10 * scale]
      )}
      {createBoundaryNet(
        new Vector3(-width * 0.5 * scale, 5 * scale, 0),
        [0, Math.PI / 2, 0],
        [length * scale, 10 * scale]
      )}

      {/* End Net (One Long Side) */}
      {createBoundaryNet(
        new Vector3(0, 5 * scale, -length * 0.5 * scale),
        [0, Math.PI, 0],
        [width * scale, 10 * scale]
      )}

      {/* Open Side (No net on this long side) */}
    </group>
  );
}

export default BasketballCourt;