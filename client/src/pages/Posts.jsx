import '../styles/Posts.css'; 
import { Posting } from '../components/Posting';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A simple search bar 
 * @component
 * @param {object} props
 * @param {string} props.item 
 * @returns {JSX.Element} The search bar
 */
const SearchBar = ({item, onChange, onSearch, onKeyDown}) => {
    return (
        <div className="search-bar">
            <input value={item} onChange={onChange} onKeyDown={onKeyDown} className="search-input"/>
            <button className="search-button" onClick={onSearch}>
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
export function PostPage () {
    const location = useLocation();
    const searchItem = location.state?.searchItem;

    const [currItem, setCurrItem] = useState(''); 
    const [item, setItem] = useState(searchItem ? searchItem : ''); 
    const [postList, setPostList] = useState([]);  // list of objects (posts)
    const [pageNumber, setPageNumber] = useState(1); 
    const [loading, setLoading] = useState(true); 
    

    const search = () => {
        setItem(currItem); 
    }; 

    const handleEnter = (e) => {
        if (e.key === "Enter") { 
            search(); 
        }
    }; 

    // search posts at the beginning 
    useEffect(() => {
        const fetchPosts = async () => { 
            setLoading(true); 
            const params = new URLSearchParams();
            params.append('search', item);
            params.append('page', pageNumber);
            let json = []; 
            const url = `/posts/search?${params.toString()}`;
            try {
              const response = await fetch(url);
              json = await response.json();
              setLoading(false); 
            } catch (e) {
                console.log(e.message); 
                throw e; 
            } finally {
                setPostList(json); 
            }
        };
        fetchPosts(); 
        console.log(postList); 
    }, [item, pageNumber]); 
    
    useEffect(() => {
        console.log('Updated postList:', postList);
    }, [postList]);

    // set the page to some sort of loading state 
    
    const renderPosting = () => {
        if (!postList.length) return (<p>No posts match your search</p>); 
        return postList.map((post, index) => (<Posting postContent={post} key={index}></Posting>)); 
    }

    const renderPage = () => {
        if (loading) {
            return (
                <div>
                    Loading...
                </div>
            ); 
        }
        return (
            <div className="post-page-content">
                <div>
                    <SearchBar 
                        value={currItem}
                        onChange={(e) => setCurrItem(e.target.value)}
                        onSearch={search}
                        onKeyDown={handleEnter}>
                    </SearchBar>
                </div>
                <div className="post-list">
                    {renderPosting()}
                </div>
            </div>
        ); 
    }; 

    return (
        <div className="post-page">
            <h1>Posts</h1>
            {renderPage()}
        </div>
    ); 

}