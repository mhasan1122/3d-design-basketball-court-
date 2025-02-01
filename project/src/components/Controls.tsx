import { Dispatch, SetStateAction } from 'react';

interface ControlsProps {
  courtColor: string;
  setCourtColor: Dispatch<SetStateAction<string>>;
  keyColor: string;
  setKeyColor: Dispatch<SetStateAction<string>>;
  dimensions: {
    width: number;
    length: number;
  };
  setDimensions: Dispatch<SetStateAction<{ width: number; length: number }>>;
}

function Controls({
  courtColor,
  setCourtColor,
  keyColor,
  setKeyColor,
  dimensions,
  setDimensions
}: ControlsProps) {
  const colors = [
    '#FFFFFF', // White
    '#000000', // Black
    '#FF0000', // Red
    '#0066CC', // Blue
    '#FFFF00', // Yellow
    '#008000', // Green
    '#FFA500', // Orange
    '#800080', // Purple
  ];

  return (
    <div className="bg-gray-800 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">DESIGN YOUR COURT</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <label className="block">
            Width:
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions(prev => ({...prev, width: Number(e.target.value)}))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
            />
          </label>
          <label className="block">
            Length:
            <input
              type="number"
              value={dimensions.length}
              onChange={(e) => setDimensions(prev => ({...prev, length: Number(e.target.value)}))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
            />
          </label>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="unit" defaultChecked className="mr-2" />
              Feet
            </label>
            <label className="flex items-center">
              <input type="radio" name="unit" className="mr-2" />
              Meters
            </label>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="location" defaultChecked className="mr-2" />
              Outdoor
            </label>
            <label className="flex items-center">
              <input type="radio" name="location" className="mr-2" />
              Indoor
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Main Court Color</h2>
          <div className="flex gap-4 flex-wrap">
            {colors.map((color) => (
              <button
                key={`court-${color}`}
                className="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110"
                style={{ 
                  backgroundColor: color,
                  borderColor: color === courtColor ? '#FFFFFF' : 'transparent'
                }}
                onClick={() => setCourtColor(color)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Key Color</h2>
          <div className="flex gap-4 flex-wrap">
            {colors.map((color) => (
              <button
                key={`key-${color}`}
                className="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110"
                style={{ 
                  backgroundColor: color,
                  borderColor: color === keyColor ? '#FFFFFF' : 'transparent'
                }}
                onClick={() => setKeyColor(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <button className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors">
        GET QUOTE
      </button>
    </div>
  );
}

export default Controls;