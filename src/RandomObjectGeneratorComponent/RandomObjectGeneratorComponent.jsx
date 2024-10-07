import React, { useState } from 'react';
import { generateRandomObject, jsonSchema } from '../randomObjectGenarator/randomObjectGenerator';

export const RandomObjectGeneratorComponent = () => {
  const [randomObject, setRandomObject] = useState(null);

  const handleGenerate = () => {
    const generatedObject = generateRandomObject(jsonSchema);
    setRandomObject(generatedObject);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Random Object Generator</h1>
      <button onClick={handleGenerate} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Generate Random Object
      </button>
      {randomObject && (
        <pre style={{ marginTop: '20px', backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(randomObject, null, 2)}
        </pre>
      )}
    </div>
  );
};

