import { useEffect, useState } from 'react';
import { getSavedNews,saveNews,deleteNews } from '../api/newsApi';
import { useNavigate } from 'react-router-dom';
import { clearTokens,isAuthenticated } from '../util/auth.js';
import { logoutApi } from '../api/authApi.js';
import Card from '../components/Card.jsx';
import NavBar1 from '../components/NavBar1.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function SavedNews() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  

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
      toast.error('Error saving article:', err);
      alert('Failed to delete article. Try again.');
    }
  };

  useEffect(() => {

     if (!isAuthenticated()) {
      navigate('/login');
     }

    async function fetchNews() {
      try {
        const data = await getSavedNews();
        setArticles(data || []);
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
      <NavBar1  navigate={navigate} />

      
      {articles.length > 0 ? 
      (<div className="h-[91%] p-2 px-4 text-white overflow-y-auto white-scrollbar box-border grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center place-items-center">
        
        {articles.map((article, index) => (
          <Card article={article} index={index} onSave={handleSave} key={index} onDelete={handleDelete}/>
        ))}
      </div>) 
      : 
      (
        <div className='text-white flex justify-center items-center text-4xl mt-8'>
          <h1>No Saved News Yet</h1>

        </div>
      )
      }
    </div>
  );
}

