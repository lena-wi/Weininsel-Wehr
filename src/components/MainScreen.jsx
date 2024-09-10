import React from 'react';
import { useEffect, useState } from 'react';
import supabase from '../services/supabaseClient';
import LinkButton from './atoms/LInkButton';
import logo from '../assets/ffwlogo.png';

const MainScreen = () => {
  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    const { data } = await supabase.from('main_topics').select();
    setTopics(data);
  }
  const [topics, setTopics] = useState([]);

  return (
    <div className="flex flex-col items-center justify-center bg-main min-h-screen p-4">
      <img
        src={logo}
        alt="logo firedepartment"
        className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto object-cover mb-8"
      />
      <div className="flex md:text-xl text-lg flex-col space-y-6">
        {topics.map((topic, index) => (
          <LinkButton key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
