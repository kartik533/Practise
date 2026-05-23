import { useCallback, useRef, useState } from 'react';

function App() {
  const [input, setInput] = useState(Array(6).fill(null));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const refs = useRef([]);

  const handleChange = useCallback(
    (e, ind) => {
      const val = e.target.value;

      const temp = [...input];
      temp[ind] = val;
      setInput(temp);

      if (val && ind < 5) {
        refs.current[ind + 1]?.focus();
      }
    },
    [input],
  );

  const backSpaceHandler = useCallback(
    (e, ind) => {
      if (e.key === 'Backspace' && !input[ind] && ind > 0) {
        refs.current[ind - 1]?.focus();
      }
    },
    [input],
  );

  return (
    <div>
      {input.map((value, index) => (
        <input
          key={index}
          style={{
            fontSize: '40px',
            all: 'unset',
            height: '80px',
            width: '80px',
            border: '2px solid',
            borderColor: focusedIndex === index ? 'blue' : 'lightgrey',
            borderRadius: '4px',
            textAlign: 'center',
          }}
          ref={(el) => {
            refs.current[index] = el;
          }}
          autoFocus={index === 0}
          value={value ?? ''}
          onChange={(e) => handleChange(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onKeyDown={(e) => backSpaceHandler(e, index)}
        />
      ))}
    </div>
  );
}

export default App;
