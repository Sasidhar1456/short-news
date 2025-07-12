import React, { useState } from 'react'
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from 'react-icons/fa'; // Filled bookmark






const Card = ({ article, index, onSave, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  const [isSaved, setIsSaved] = useState(article.isSaved)

  const handleSave = () => {
    // Extract the necessary fields
    const { author, title, url, urlToImage } = article;

    const saveBody = {
      author,
      title,
      url,
      urlToImage,
    };

    if(!isSaved){
      setIsSaved(!isSaved)
      onSave(saveBody);
    } else{
      setIsSaved(!isSaved)
      onDelete(saveBody);
    }
    
  };

  return (
    <div key={index} className="card bg-white text-black rounded shadow-2xl box-border w-[96%] md:w-96 h-[25rem] flex flex-col justify-between pb-5">
      <div>
        <img src={article.urlToImage} className='rounded w-full h-56 ' />
      </div>

      <div className='p-4 text-[#3450d7]'>
        <h2>{article.title}</h2>
      </div>

      <div className='px-4 flex justify-between items-center'>
        <a href={article.url} target='_blank' className='text-[#3450d7] cursor-pointer text-sm hover:underline hover:decoration-[#3450d7]'>View Full Article</a>

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleSave} // ← save on click!
          className="cursor-pointer"
        >
          {hovered || isSaved   ? (
            <FaBookmark className="text-[28px] text-[#3450d7]" />
          ) : (
            <CiBookmark className="text-[28px] text-[#3450d7]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
