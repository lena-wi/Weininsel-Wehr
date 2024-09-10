import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import MainScreen from './components/MainScreen';

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    const { data } = await supabase.from('countries').select();
    setCountries(data);
  }
  return (
    <div className="Weininsel-Wehr">
      <MainScreen />
    </div>
  );
}

export default App;
