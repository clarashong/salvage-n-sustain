import '../styles/index.css'; 
import postImage from '../assets/postImage.png';
import { useNavigate } from 'react-router-dom';

/**
 * A item bubble element
 * @param {object} props 
 * @param {string} name name of the item
 * @param {number} index  
 * @returns {JSX.Element} 
 */
const Item = ({name, index}) => {
    return (
        <span className="posting-item" key={index}>{name}</span>
    ); 
}

/**
 * A post card element with a post summary 
 * @component
 * @param {object} props 
 * @param {object} postContent
 * @returns {JSX.Element} 
 */
export const Posting = ({postContent}) => {
    const maxLength = 50;  
    const navigate = useNavigate(); 

    const title = postContent.title || postContent.post_title; 
    let description = postContent.description || postContent.post_description; 
    const items = postContent.items || postContent.post_items; 
    const user_name = postContent.user_name || postContent.post_user_name; 

    if (description.length > maxLength) {
        description = description.substring(0, maxLength) + "..."; 
    }

    const goToPostingPage = () => {
        console.log("clicked"); 
        navigate('/post', {state: {postContent: postContent}}); 
    }

    return (
        <div className="posting" onClick={goToPostingPage}> 
            <img className="post-image" src={postImage}></img>
            <div className="posting-details">
                <span key="title" className="posting-title">{title}</span>
                <span key="user" className="posting-username">{user_name}</span>
                <span key="desc" className="posting-description">{description}</span> 
                <div className="posting-item-list">
                    {items.map((name, index) => 
                    <Item name={name} index={index}></Item>)}
                </div>
            </div>
        </div>
    ); 
}