import React from 'react'
import LogoCarousel from './ui/icon-carousel'


const IconScroll = () => {
  return (
    <>

    <h1 className="text-white font-medium flex justify-center mb-3 mt-[60px] gap-3 text-3xl">OUR <span className="text-gray-400">{" "}PARTNERS</span></h1>
        <div className="relative h-[80px] ml-0  md:ml-[220px] w-full md:w-[70%] flex flex-col justify-center  overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
            <div className="text-center">
              <LogoCarousel />
            </div>
          </div>
        </div>
    </>
  )
}

export default IconScroll