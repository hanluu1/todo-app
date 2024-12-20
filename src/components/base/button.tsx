import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'green' | 'primary' | 'white' | 'black';
  text?: string;
}

export const Button = ({ children, className, text, color = 'red', ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-lg p-2',
        color === 'red' && 'bg-red-500 text-white',
        color === 'green' && 'bg-green-500 text-white',
        color === 'primary' && 'bg-pink-500 text-white',
        color === 'white' && 'bg-white text-black',
        color === 'black' && 'bg-black text-white',
        className,
      )}
      {...props}
    >
      {children || text}
    </button>
  );
};
