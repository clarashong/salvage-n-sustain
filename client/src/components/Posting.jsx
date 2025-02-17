import '../styles/index.css'; 
import { useState, useEffect } from 'react';

/**
 * A post card element with a post summary 
 * @component
 * @param {object} props 
 * @param {object} postContent
 * @returns {JSX.Element} 
 */
export const Posting = ({postContent}) => {
    console.log(postContent); 
    const maxLength = 100; 
    let trimmedDescription = postContent.description; 

    const id = postContent.id || postContent.post_id; 
    const title = postContent.title || postContent.post_title; 
    const description = postContent.description || postContent.post_description; 
    const items = postContent.items || postContent.post_items; 
    const start_date = postContent.start_date || postContent.post_start_date; 
    const end_date = postContent.end_date || postContent.post_end_date; 
    const location = postContent.location || postContent.post_location; 
    const user_name = postContent.user_name || postContent.post_user_name; 

    return (
        <div className="posting"> 
            <img style={{backgroundColor: "blue"}}></img>
            <span>{title}</span>
            <span>{description}</span> 
        </div>
    ); 
}