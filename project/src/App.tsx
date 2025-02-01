import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import BasketballCourt from './components/BasketballCourt';
import Controls from './components/Controls';

function App() {
  // State for court customization
  const [courtColor, setCourtColor] = useState<string>('#FFFFFF');
  const [keyColor, setKeyColor] = useState<string>('#0066CC');
  const [dimensions, setDimensions] = useState<{ width: number; length: number }>({
    width: 50, // Standard NBA court width (feet)
    length: 94, // Standard NBA court length (feet)
  });

  return (
    <div
      className="h-screen flex"
      style={{
        background: 'linear-gradient(to right, #898E93, #AF9590)', // Gradient background
      }}
    >
      {/* Left Side: Controls */}
      <div className="w-1/4 p-6 bg-gray-800 text-white overflow-y-auto">
        <Controls
          courtColor={courtColor}
          setCourtColor={setCourtColor}
          keyColor={keyColor}
          setKeyColor={setKeyColor}
          dimensions={dimensions}
          setDimensions={setDimensions}
        />
      </div>

      {/* Right Side: 3D Basketball Court */}
      <div className="flex-1 relative">
        <Canvas
          shadows
          camera={{ position: [50, 50, 50], fov: 45 }}
          gl={{ alpha: true }} // Enable transparency
          style={{ background: 'transparent' }} // Transparent canvas background
        >
          <PerspectiveCamera makeDefault position={[50, 50, 50]} />
          <OrbitControls enableDamping />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <BasketballCourt
            courtColor={courtColor}
            keyColor={keyColor}
            dimensions={dimensions}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default App;