import {useTheme} from "next-themes";

import { SunIcon, MoonIcon, CogIcon } from "@heroicons/react/outline";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-end gap-2 px-10">
      
      <button  className="bg-amber-50 text-gray-900 px-2 py-2 rounded-full w-7 h-7" onClick={() => setTheme('light')}>
        <SunIcon />
      </button>
      <button className="bg-gray-500 text-yellow-50 w-7 h-7  px-2 py-2 rounded-full" onClick={() => setTheme('dark')}>
        <MoonIcon/>
      </button>
      <button className="bg-white text-black px-2 py-2 rounded-full w-7 h-7" onClick={() => setTheme('system')}>
        <CogIcon/>
      </button>
      </div>
    
  );
}
