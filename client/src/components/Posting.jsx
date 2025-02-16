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
    const maxLength = 100; 
    let trimmedDescription = postContent.description; 
    if (trimmedDescription.length > maxLength) trimmedDescription = trimmedDescription.substring(0, 100);
    return (
        <div className="postCard"> 
            <img style={{backgroundColor: "blue"}}></img>
            <span>{postContent.title}</span>
            <span>{postContent.description}</span> 
        </div>
    ); 
}