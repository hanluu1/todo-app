"use client";
import React from 'react';
function Header() {
    return (

        <div className=" flex items-center gap-2 pt-5 pb-6 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-heart" viewBox="0 0 16 16" >
                <path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1m7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
            </svg>
            <h1 className='font-sans md:font-semibold text-2xl' >TODO</h1>
        </div>
    )
}
export default Header;