import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'green' | 'primary' | 'white' | 'black' |'yellow' |'blue';
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
        color === 'yellow' && 'bg-yellow-500 text-black',
        color === 'blue' && 'bg-blue-400 text-white',
        
        color === 'red' && 'dark:bg-red-700 dark:text-white',
        color === 'green' && 'dark:bg-green-700 dark:text-white',
        color === 'primary' && 'dark:bg-pink-700 dark:text-white',
        color === 'white' && 'dark:bg-gray-200 dark:text-black',
        color === 'black' && 'dark:bg-gray-900 dark:text-white',
        color === 'yellow' && 'dark:bg-yellow-500 dark:text-black',
        color === 'blue' && 'dark:bg-blue-400 dark:text-white',
        className,
      )}
      {...props}
    >
      {children || text}
    </button>
  );
};
