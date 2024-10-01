import React, { useState, useEffect } from 'react';
import './../styles/inputfield.css';
import textRecommendations from './../assets/textRecommendations.json';

interface InputProps {
  receiveInput: any,
}

const InputField: React.FC<InputProps> = (props) => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState<string[]>(textRecommendations);

  const handleSend = () => {
    props.receiveInput(input);
    setInput('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleOptionClick = (option: string) => {
    setInput((prevInput) => prevInput + " " + option);
  };

  return (
    <div className="input-container">
      <div className="compo-options-container">
        {options.map((option, index) => (
          <button 
            key={index} 
            className="compo-option-button" 
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className='typing-box-container'>
        <input
          maxLength={300}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-input"
          placeholder="Kirjoita tähän tai valitse ylhäältä..."
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend} className="send-button">
          Lähetä
        </button>
      </div>
    </div>
  );
};

export default InputField;