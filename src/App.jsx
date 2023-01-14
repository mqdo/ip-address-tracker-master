import React, { useState, useEffect } from 'react';

import iconArrow from './assets/icon-arrow.svg';
import patternBg from './assets/pattern-bg.png';
import isValidURL from './utils/isValidURL';

const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

const App = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [geo, setGeo] = useState({
    ip: '',
    location: '',
    isp: ''
  });

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (input.length === 0) setError(false);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  }

  const handleSearch = async () => {
    try {
      let url;
      if (regexExp.test(input)) {
        url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${import.meta.env.VITE_GEO_API_KEY}&ipAddress=${input}`
      } else {
        if (!isValidURL(input) && input.length > 0) {
          setError(true);
          return;
        }
        url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${import.meta.env.VITE_GEO_API_KEY}${input.length > 0 ? `&domain=${input}` : ''}`
      }
      setInput('');
      setError(false);
      const res = await fetch(url);
      const { ip, location, isp } = await res.json();
      setGeo((prev) => ({ ...prev, ip, location, isp }));
    } catch (err) { console.log(err) }
  };

  return (
    <div className='h-[100vh] w-full m-0 overflow-x-hidden relative'>
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
      <img src={patternBg} alt="pattern bg" className='md:w-full h-[280px] md:h-[250px] lg:h-[240px] absolute top-0 z-10 object-cover' />
      <div className='h-full w-full'></div>
    </div>
  )
}

export default App
