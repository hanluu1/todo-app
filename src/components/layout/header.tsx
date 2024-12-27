'use client';

import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/16/solid';

export function Header() {
  return (
    <div className=" flex items-center justify-start gap-2 py-5 text-black mx-10 dark:text-white ">
      <CalendarDaysIcon className='w-7 h-7'/>
      <h1 className="font-mono text-2xl md:font-semibold">DoIT</h1>
    </div>
  );
}
