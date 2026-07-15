import { useRef } from 'react';

export default function OtpInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (index, digit) => {
    if (!/^\d?$/.test(digit)) return;
    const next = value.split('');
    next[index] = digit;
    onChange(next.join('').slice(0, length));
    if (digit && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="input !w-12 !h-14 !text-center !text-xl !font-semibold !px-0"
        />
      ))}
    </div>
  );
}