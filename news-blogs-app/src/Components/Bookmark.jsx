/* eslint-disable react/prop-types */
import noImg from '../assets/images/no-img.png';
import './Bookmark.css';
import './Modal.css';

const Bookmark = ({show, bookmarks, onClose, onSelectArticle, onDeleteBookmark})=>{
    
    if(!show){
        return null;
    }
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <h2 className="bookmarks-heading">Bookmarked NEWS</h2>
                <div className="bookmark-list">
                    {bookmarks.map((article, index)=>(
                        <div key={index} className="bookmark-items" onClick={()=> onSelectArticle(article)}>
                            <img src={article.image || noImg} alt={article.title} />
                            <h3>{article.title}</h3>
                            <span className="delete-button" onClick={(e)=> {
                                e.stopPropagation();
                                onDeleteBookmark(article);
                            }}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bookmark