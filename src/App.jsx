import React, { useState, useEffect } from 'react';

import { IpInformation, GoogleMaps } from './components';
import patternBg from './assets/pattern-bg.png';
import isValidURL from './utils/isValidURL';

const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

const App = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geo, setGeo] = useState({
    ip: '',
    location: {},
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
    setLoading(true);
    try {
      let url;
      if (regexExp.test(input)) {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEO_API_KEY}&ipAddress=${input}`
      } else {
        if (!isValidURL(input) && input.length > 0) {
          setError(true);
          setLoading(false);
          return;
        }
        url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${import.meta.env.VITE_GEO_API_KEY}${input.length > 0 ? `&domain=${input}` : ''}`
      }
      setInput('');
      setError(false);
      const res = await fetch(url);
      const { ip, location, isp } = await res.json();
      setLoading(false);
      setGeo((prev) => ({ ...prev, ip, location, isp }));
    } catch (err) { console.log(err) }
  };

  return (
    <div className='h-[100vh] w-full m-0 overflow-x-hidden relative'>
      <IpInformation geo={geo} error={error} input={input} setInput={setInput} handleSubmit={handleSubmit} />
      <div className='h-full w-full overflow-hidden'>
        <img src={patternBg} alt="pattern bg" className='md:w-full h-[280px] md:h-[250px] lg:h-[240px] absolute top-0 object-cover z-20' />
        <GoogleMaps geo={geo} loading={loading} />
      </div>
    </div>
  )
}

export default App
