import '../styles/index.css'; 
import postImage from '../assets/postImage.png';

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

    const id = postContent.id || postContent.post_id; 
    const title = postContent.title || postContent.post_title; 
    let description = postContent.description || postContent.post_description; 
    const items = postContent.items || postContent.post_items; 
    const start_date = postContent.start_date || postContent.post_start_date; 
    const end_date = postContent.end_date || postContent.post_end_date; 
    const location = postContent.location || postContent.post_location; 
    const user_name = postContent.user_name || postContent.post_user_name; 

    if (description.length > maxLength) {
        description = description.substring(0, maxLength) + "..."; 
    }

    return (
        <div className="posting"> 
            <img className="post-image" src={postImage}></img>
            <div className="posting-details">
                <span className="posting-title">{title}</span>
                <span className="posting-username">{user_name}</span>
                <span className="posting-description">{description}</span> 
                <div className="posting-item-list">
                    {items.map((name, index) => 
                    <Item name={name} index={index}></Item>)}
                </div>
            </div>
        </div>
    ); 
}