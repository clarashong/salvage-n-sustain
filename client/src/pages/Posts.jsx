import '../styles/Posts.css'; 
import { Posting } from '../components/Posting';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
    const pages = {POSTINGS: 'Postings', GUIDE: 'Disposal Guide'}; 

    const [currItem, setCurrItem] = useState(''); 
    const [item, setItem] = useState(searchItem ? searchItem : ''); 
    const [postList, setPostList] = useState([]);  // list of objects (posts)
    const [pageNumber, setPageNumber] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(pages.POSTINGS);  
    const [guide, setGuide] = useState(''); 
    const [currLocation, setCurrLocation] = useState('North America'); 
    const [userLocation, setUserLocation] = useState('North America'); // random default location

    const search = () => {
        setItem(currItem); 
    }; 

    const searchGuide = () => {
        setItem(currItem); 
        setUserLocation(currLocation); 
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            if (page===pages.POSTINGS) {
                search(); 
            } else {
                searchGuide(); 
            }
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

        const fetchGuide = async () => {
            console.log("fetching guide");
            setLoading(true); 
            const params = new URLSearchParams();
            params.append('item', item);
            params.append('location', userLocation);
            const url = `/posts/guide?${params.toString()}`; 
            let json = {}
            let responseGuide = ''; 
            try {
                const response = await fetch(url);
                if (!response.ok) throw Error("LLM Error. Please try again later."); 
                json = await response.json(); 
                console.log(json); 
                setLoading(false); 
                if (!json) {
                    throw Error("API Response error"); 
                }
                try {
                    responseGuide = json.guide.response.candidates[0].content.parts[0].text; 
                } catch (e) {
                    throw Error("LLM Response error. Please try again later."); 
                }
            } catch (e) {
                console.log(e.message);
                setGuide(e.message);  
            } finally {
                console.log(json.guide); 
                if (!item) {
                    setGuide(json.guide); 
                    return;
                }
                setGuide(responseGuide);
            }
        }

        if (page === pages.POSTINGS) {
            fetchPosts(); 
        } else {
            fetchGuide(); 
        }
    }, [item, pageNumber, page, userLocation]); 
    
    useEffect(() => {
        console.log('Updated postList:', postList);
    }, [postList]);

    const renderPosting = () => {
        if (!postList.length) return (<p>No posts match your search</p>); 
        return postList.map((post, index) => (
            <Posting 
                postContent={post} 
                key={index}></Posting>)); 
    }

    const renderContent = () => {
        switch (page) {
            case pages.GUIDE: 
                const markdownText = guide; 
                return (
                    <div className="disposal-guide-block">
                        <input 
                            value={currLocation}
                            className="location-input"
                            placeholder='Location (ex. Toronto, Ontario)'
                            onKeyDown={handleEnter}
                            onChange={(e) => setCurrLocation(e.target.value)}></input>
                        <ReactMarkdown className="guide-content" children={markdownText} />
                    </div>
                ); 
            default:
                return (
                    <div className="post-list">
                        {renderPosting()}
                    </div>
                );
        }
    }

    const renderPage = () => {
        if (loading) {
            return (
                <div className="post-page-content">
                    <div>
                        <SearchBar 
                            value={item}
                            onChange={(e) => setCurrItem(e.target.value)}
                            onSearch={search}
                            onKeyDown={handleEnter}>
                        </SearchBar>
                    </div>
                    <div className="sub-content">
                        <div className="post-sidebar">
                            <button
                                style={{backgroundColor: page===pages.POSTINGS? "rgb(199, 130, 9)" : "rgb(238, 174, 63)"}} 
                                onClick={() => {setPage(pages.POSTINGS)}}>{pages.POSTINGS}</button>
                            <button
                                style={{backgroundColor: page===pages.GUIDE? "rgb(199, 130, 9)" : "rgb(238, 174, 63)"}} 
                                onClick={() => {setPage(pages.GUIDE)}}>{pages.GUIDE}</button>
                        </div>
                        <div className="disposal-guide-block">
                            Loading...
                        </div>
                    </div>
                </div>
            ); 
        }
        return (
            <div className="post-page-content">
                <div>
                    <SearchBar 
                        item={currItem}
                        onChange={(e) => setCurrItem(e.target.value)}
                        onSearch={search}
                        onKeyDown={handleEnter}>
                    </SearchBar>
                </div>
                <div className="sub-content">
                    <div className="post-sidebar">
                        <button
                            style={{backgroundColor: page===pages.POSTINGS? "rgb(199, 130, 9)" : "rgb(238, 174, 63)"}} 
                            onClick={() => {setPage(pages.POSTINGS)}}>{pages.POSTINGS}</button>
                        <button
                            style={{backgroundColor: page===pages.GUIDE? "rgb(199, 130, 9)" : "rgb(238, 174, 63)"}} 
                            onClick={() => {setPage(pages.GUIDE)}}>{pages.GUIDE}</button>
                    </div>
                    {renderContent()}
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