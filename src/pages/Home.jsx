import { useEffect, useState } from 'react';
import { getNews,saveNews,deleteNews } from '../api/newsApi';
import { useNavigate } from 'react-router-dom';
import { clearTokens,isAuthenticated } from '../util/auth.js';
import { logoutApi } from '../api/authApi.js';
import NavBar from '../components/NavBar.jsx';
import Card from '../components/Card.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error('Logout API error', err);
    }
    clearTokens();
    navigate('/login');
  };

  const handleSave = async (article) => {
    try {
      await saveNews(article, navigate); // call saveNews API
      toast.success('News saved successfully!');
    } catch (err) {
      console.error('Error saving article:', err);
      toast.error('Failed to save article. Try again.');
    }
  };

  const handleDelete = async (article) => {
    try {
      await deleteNews(article, navigate); // call saveNews API
      toast.success('News deleted successfully!');
    } catch (err) {
      console.error('Error saving article:', err);
      toast.error('Failed to delete article. Try again.');
    }
  };

  useEffect(() => {

     if (!isAuthenticated()) {
      navigate('/login');
     }

    async function fetchNews() {
      try {
        const data = await getNews();
        setArticles(data);
      } catch (err) {
        console.error('News fetch error:', err);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="h-full w-full bg-[#3450d7] flex flex-col box-border">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <NavBar handleLogout={handleLogout} navigate={navigate} />

      <div className="h-[91%] p-2 px-4 text-white overflow-y-auto white-scrollbar box-border grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center place-items-center">
        {articles.map((article, index) => (
          <Card article={article} index={index} onSave={handleSave} key={index} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}

