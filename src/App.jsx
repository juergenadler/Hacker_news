import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hn.algolia.com/api/v1/search?query=react');
        // Aqui estamos usando a API de busca do Hacker News para buscar histórias relacionadas a React
        setStories(response.data.hits);
      } catch (error) {
        console.error('Erro ao buscar histórias:', error);
      }
    };

    fetchData();
  }, []); // Executar apenas uma vez ao montar o componente

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Histórias do Hacker News sobre React</h1>
      <ul className="divide-y divide-gray-300">
        {stories.map(story => (
          <li key={story.objectID} className="py-4">
            <a href={story.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;