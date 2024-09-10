import React from 'react';
import { Button } from '@headlessui/react';

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(apiUrl, supabaseKey);

const MainScreen = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    const { data } = await supabase.from('countries').select();
    setCountries(data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src="src/assets/ffwlogo.png"
        alt="Main visual"
        className="w-full h-64 object-cover mb-8"
      />
      <div className="flex flex-col space-y-4">
        <Button
          as="a"
          href="/topic1"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        >
          Topic
        </Button>
        <Button
          as="a"
          href="/topic2"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
        >
          Topic 2
        </Button>
      </div>
    </div>
  );
};

export default MainScreen;
