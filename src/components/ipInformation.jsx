import React from 'react';

import iconArrow from '../assets/icon-arrow.svg';

const IpInformation = ({ geo, error, input, setInput, handleSubmit }) => {
  return (
    <div className='w-full p-4 md:p-8 absolute left-[50%] -translate-x-[50%] z-50 flex flex-col justify-between items-center gap-4 md:gap-8'>
      <h1 className=' text-white font-medium text-3xl'>IP Address Tracker</h1>
      <form className='flex items-center w-full md:w-[700px]' onSubmit={handleSubmit}>
        <input type="text" className=' h-12 w-full rounded-l-xl p-4 text-lg outline-none hover:shadow-md' placeholder='Search for any IP address or domain' value={input} onChange={(e) => setInput(e.target.value)} />
        <button type='submit' className='h-12 w-14 grid place-items-center bg-very-dark-gray hover:bg-dark-gray rounded-r-xl'>
          <img src={iconArrow} alt="icon arrow" />
        </button>
      </form>
      {error && input !== '' ? <p className=' text-red-300'>Invalid URL or IP Address!</p> : null}
      <div className='w-full md:w-[700px] lg:w-[1000px] h-[300px] bg-white rounded-xl flex flex-col md:flex-row justify-between items-center md:items-stretch px-4 py-8 gap-4 md:p-8 md:gap-8 md:divide-x-2 flex-1 shadow-md'>
        <div className='w-full flex flex-col items-center md:items-start gap-2 md:px-4'>
          <span className=' text-gray-500 tracking-widest text-xs font-medium  uppercase'>IP Address</span>
          <p className=' font-medium text-xl'>{geo.ip}</p>
        </div>
        <div className='w-full flex flex-col items-center md:items-start gap-2 md:px-4'>
          <span className=' text-gray-500 tracking-widest text-xs font-medium  uppercase'>Location</span>
          <p className=' font-medium text-xl'>{`${geo.location?.city}, ${geo.location?.region} ${geo.location?.postalCode}`}</p>
        </div>
        <div className='w-full flex flex-col items-center md:items-start gap-2 md:px-4'>
          <span className=' text-gray-500 tracking-widest text-xs font-medium  uppercase'>Timezone</span>
          <p className=' font-medium text-xl'>UTC {geo.location?.timezone}</p>
        </div>
        <div className='w-full flex flex-col items-center md:items-start gap-2 md:px-4'>
          <span className=' text-gray-500 tracking-widest text-xs font-medium  uppercase'>ISP</span>
          <p className=' font-medium text-xl'>{geo.isp}</p>
        </div>
      </div>
    </div>
  )
}

export default IpInformation