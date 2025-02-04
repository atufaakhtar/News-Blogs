import demoImg from '../assets/images/demo.jpg';
import './Bookmark.css';
import './Modal.css';

const Bookmark = () => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button">
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <h2 className="bookmarks-heading">Bookmarked NEWS</h2>
                <div className="bookmark-list">
                    <div className="bookmark-items">
                        <img src={demoImg} alt="BookmarkImg" />
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <span className="delete-button">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                    </div>
                    <div className="bookmark-items">
                        <img src={demoImg} alt="BookmarkImg" />
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <span className="delete-button">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                    </div>
                    <div className="bookmark-items">
                        <img src={demoImg} alt="BookmarkImg" />
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <span className="delete-button">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookmark