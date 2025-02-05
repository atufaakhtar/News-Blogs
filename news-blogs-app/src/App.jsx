import { useState } from 'react';
import Blogs from './Components/Blogs';
import News from './Components/News';


const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

  const handleShowBlogs=()=>{
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleBackToNews=()=>{
    setShowNews(true);
    setShowBlogs(false);
  }

  return (
    <div className='container'>
      <div className='news-blogs-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs onBack={handleBackToNews} />}
      </div>
    </div>
  )
}

export default App