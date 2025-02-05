/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState } from 'react';
import noImg from '../assets/images/no-img.png';
import userImg from '../assets/images/user.jpg';
import Bookmark from './Bookmark';
import Calendar from './Calendar';
import './News.css';
import NewsModal from './NewsModal';
import Weather from './Weather';


const categories = ["general", "world", "business", "technology", "entertainment", "sport", "science", "health", "nation"];



const News = () => {

    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarksModal, setShowBookmarksModal] = useState(false);

    useEffect(()=>{
        const fetchNews = async()=>{
            let url =`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=6d05f248e77a4199220fcf381efb7b8e`;

            if(searchQuery){
                url= `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=6d05f248e77a4199220fcf381efb7b8e`
            }
            const response = await axios.get(url);
            const fetchNews = response.data.articles;

            fetchNews.forEach((article) => {
                if(!article.image){
                    article.image= noImg;
                }
            });
            
            setHeadline(fetchNews[0]);
            setNews(fetchNews.slice(1,7));
            
            const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            setBookmarks(savedBookmarks);

            console.log(fetchNews[0]);
        }
        fetchNews();
    },[selectedCategory, searchQuery]);

    const handleCategoryClick= (e, category)=>{
        e.preventDefault();
        setSelectedCategory(category);
    }

    const handleSearch =(e) =>{
        e.preventDefault();
        setSearchQuery(searchInput);
        setSearchInput('');
    }

    const handleArticleClick= (article)=>{
        setSelectedArticle(article);
        setShowModal(true);
        console.log(article);
    }

    const handleBookmarkClick =(article)=>{
        setBookmarks((prevBookmarks)=>{
            const updatedBookmarks = prevBookmarks.find((bookmark)=> bookmark.title === article.title)? prevBookmarks.filter((bookmark)=> bookmark.title !== article.title):[...prevBookmarks,article];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            return updatedBookmarks;
        })
    }

    return (
        <div className="news">
            <header className="news-header">
                <h1 className='logo'>NEWS & BLOGS</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch} >
                        <input type="text" placeholder="Search News..." value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
                        <button type='submit'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>

            <div className="news-content">
                <div className="navbar">
                    <div className="user">
                        <img src={userImg} alt="User Image" />
                        <p>Atufa's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category)=>(
                                <a href="#" key={category} className='nav-link' onClick={(e)=> handleCategoryClick(e,category)}>{category}</a>
                            ))}
                            
                            <a href="#" className='nav-link' onClick={()=>setShowBookmarksModal(true)} >Bookmarks
                                <i className='fa-solid fa-bookmark'></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (<div className="headline" onClick={()=> handleArticleClick(headline)}>
                        <img src={headline.image || noImg} alt={headline.title} />
                        <h2 className="headline-title">
                            {headline.title}
                            <i className={`${bookmarks.some((bookmark)=> bookmark.title === headline.title )? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    handleBookmarkClick(headline);
                                }}>
                            </i>
                        </h2>
                    </div>
                    )}
                    
                    <div className="news-grid">
                        {news.map((article, index)=>(
                            <div  key={index} className="news-grid-item" onClick={()=> handleArticleClick(article)}>
                            <img src={article.image || noImg} alt={article.title} />
                            <h3>
                                {article.title}
                                <i className={`${bookmarks.some((bookmark)=> bookmark.title === article.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    handleBookmarkClick(article);
                                }}>
                            </i>
                            </h3>
                        </div>
                        ))}
                    </div>
                </div>
                <NewsModal show={showModal} article={selectedArticle} onClose={()=> setShowModal(false)}/>
                <Bookmark show={showBookmarksModal} bookmarks={bookmarks} onClose={()=> setShowBookmarksModal(false)} onSelectArticle={handleArticleClick} onDeleteBookmark={handleBookmarkClick} />
                <div className="my-blog">My Blogs</div>
                <div className="weather-calendar">
                    <Weather/>
                    <Calendar/>
                </div>
                
            </div>
            <footer className="news-footer">Footer</footer>
        </div>
    )
}

export default News