import '../styles/Post.css'; 
import postImage from '../assets/postImage.png';
import { useLocation } from 'react-router-dom';

/** A page for a single post 
 * @component 
 * @param {object} props 
 * @param {object} props.postContent
 * @returns{JSX.Element}
 */
export function Post() {
    const location = useLocation();
    const postContent = location.state?.postContent;
    console.log(postContent); 
    if (!postContent) {
        return (
            <div className="posting-page">
                <div                className="posting-page-content">
                    <p>No content associated with this posting</p>
                </div>
            </div>
        );
    }

    const title = postContent.title || postContent.post_title; 
    let description = postContent.description || postContent.post_description; 
    const items = postContent.items || postContent.post_items; 
    const start_date = postContent.start_date || postContent.post_start_date; 
    const end_date = postContent.end_date || postContent.post_end_date; 
    const user_name = postContent.user_name || postContent.post_user_name; 
    
    return (
        <div className="posting-page">
            <div className="posting-page-content">
                <h1 className="posting-page-title">{title}</h1>
                <h2 className="posting-page-h2">By: {user_name}</h2>
                <p>From: <span className="posting-page-date">{start_date.substring(0,10)}</span> to <span className="posting-page-date">{end_date.substring(0, 10)} </span></p>
                <img className="posting-page-image" src={postImage}></img>
                <h2 className="posting-page-h2">Description</h2>
                <p>{description}</p>
                <h2 className="posting-page-h2">Accepted Items</h2>
                {items.map((i, index) => (<li className="posting-page-item" key={index}>{i}</li>))}
            </div>
        </div>
    ); 
}