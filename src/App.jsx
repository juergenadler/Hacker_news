import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${currentPage}`);
        setStories(response.data.hits);
        setTotalPages(response.data.nbPages);
      } catch (error) {
        setError('Error fetching stories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm, currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchTerm(searchTerm.trim());
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="bg-orange-500 text-3xl font-bold p-4 mb-4 rounded-lg">Hacker News Stories - Page {currentPage}</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search term..."
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button type="submit" className="bg-orange-700 text-white px-4 py-2 rounded">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <ul className="divide-y divide-gray-300">
            {stories.map(story => (
              <li key={story.objectID} className="py-4 hover:bg-orange-500 rounded-md">
                <a href={story.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{story.title}</a>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-orange-700 text-white px-4 py-2 rounded-md " style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>Previous Page</button>
            <p className="text-gray-700">Page {currentPage} of {totalPages}</p>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-orange-700 text-white px-4 py-2 rounded-md" style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>Next Page</button>
          </div>
        </div>
      )}
      {!loading && !error && stories.length === 0 && <p>No stories found.</p>}
    </div>
  );
}

export default App;
