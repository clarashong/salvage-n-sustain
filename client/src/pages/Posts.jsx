import '../styles/index.css';
import supabase from '../data/supabaseClient' 
import { useState } from 'react';


/**
 * A simple search bar 
 * @component
 * @param {object} props
 * @param {string} props.item 
 * @returns {JSX.Element} The search bar
 */
const SearchBar = ({item, onChange, onSearch}) => {
    return (
        <div className="searchBar">
            <input value={item} onChange={onChange}/>
            <button onClick={onSearch}>
                <span>&#128269;</span> {/* Magnifying glass */} 
            </button>
        </div> 
    ); 
};

/**
 * A page with all the posts correlated with the search
 * @component 
 * @param {object} props 
 * @param {string} searchItem 
 * @returns {JSX.Element} The posts page
*/
export function PostPage ({searchItem=''}) {
    const [item, setItem] = useState(searchItem); 
    const [postList, setPostList] = useState([]);  // list of objects (posts)
    
    const search = async () => {
        if (!item) {
            const {data:posts, error} = await supabase
                .from('posts')
                .select('title,description,items,start_date,end_date,location,image_url,user_name'); 
            if (error) {
                throw error; 
            }
            setPostList(posts); 
            console.log(postList); 
        } else {
            const {data:posts, error} = await supabase
                .from('posts')
                .select('title,description,items,start_date,end_date,location,image_url,user_name')
                .filter('items', 'cs', `[%${item}%]`)  // Case sensitive; 
            if (error) {
                throw error; 
            }
            setPostList(posts); 
            console.log(postList); 
        }
    }; 
    // set the page to some sort of loading state 
    
    // await/get the list of posts based on the search 
    
    return (
        <div>
            <h1> Posts </h1>
            <SearchBar 
                value={item}
                onChange={(e) => setItem(e.target.value)}
                onSearch={search}>
            </SearchBar>
        
        </div>); 
}