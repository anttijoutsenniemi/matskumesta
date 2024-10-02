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

  const handleInputChange = (e : any) => {
    setInput(e.target.value);
    e.target.style.height = 'auto'; // Reset the height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scroll height
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
        {/* this is for just a one row non-expanding input
         <input
          maxLength={300}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-input"
          placeholder="Kirjoita tähän tai valitse ylhäältä..."
          onKeyDown={handleKeyPress}
        /> */}
        <textarea
          maxLength={300}
          value={input}
          onChange={handleInputChange}
          className="rounded-input"
          placeholder="Kirjoita tähän tai valitse ylhäältä..."
          rows={1} // Start with one row
          style={{
            fontSize: '16px',
            overflow: 'hidden',
            resize: 'none',
            minHeight: '40px', // Minimum height for the input
          }}
        />
        <button onClick={handleSend} className="send-button">
          Lähetä
        </button>
      </div>
    </div>
  );
};

export default InputField;