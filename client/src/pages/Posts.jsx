import '../styles/index.css'; 
import { Posting } from '../components/Posting'; 
import { useState, useEffect } from 'react';

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
    const [currItem, setCurrItem] = useState(''); 
    const [item, setItem] = useState(searchItem); 
    const [postList, setPostList] = useState([]);  // list of objects (posts)
    const [pageNumber, setPageNumber] = useState(1); 
    const [loading, setLoading] = useState(true); 
    
    const search = () => {
        setItem(currItem); 
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
    
    const renderPage = () => {
        if (loading) {
            return (
                <div>
                    Loading...
                </div>
            ); 
        }
        return (
            <div>
                <SearchBar 
                    value={currItem}
                    onChange={(e) => setCurrItem(e.target.value)}
                    onSearch={search}>
                </SearchBar>
                <div className="postList">
                    {postList.map((post, index) => <Posting postContent={post} key={index}></Posting>)}
                </div>
            </div>
        ); 
    }; 

    return (
        <div>
            <h1>Posts</h1>
            {renderPage()}
        </div>
    ); 

}