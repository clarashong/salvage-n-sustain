import '../styles/index.css';
import supabase from '../data/supabaseClient' 
import { useState } from 'react';

/** A form to create a post
 * @component 
 * @returns {JSX.Element} the form 
 */
export const PostCreator = () => {
    
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [items, setItems] = useState([]); 
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState(''); 
    const [errorMsg, setErrorMsg] = useState('');
    
    /** adds post form content into posts table in database
     * @returns {void}
     */
    const createPost = async () => {
        const { data: { user }, error} = await supabase.auth.getUser(); 
        // there is no user logged into client
        if (!user) {
            throw new Error("No active user session"); 
        }
        // supabase getUser operation has an error
        if (error) {
            throw new Error(error.message); 
        }
        let formattedItems = items.split(',').map(item => item.trim());


        let post = {
            title: title,
            user_id: user.id,
            user_name: user.user_metadata.name,
            description: description, 
            items: formattedItems
        };
        if (startDate) post.start_date = new Date (startDate + "T00:00:00"); 
        if (endDate) post.end_date = new Date (endDate + "T23:59:59"); 

        const result = await supabase
            .from('posts')
            .insert([post]);
        if (result.error) {
            console.log(result.error); 
            throw new Error(result.error.message); 
        } 
    }; 
    
    /**
     * Attempt to sign up the user 
     * @returns {void} either returns an error message, or does nothing and submits the post
     */
    const validatePost = async (event) => {
        event.preventDefault(); 
        setErrorMsg(''); 
        try {
            if (title === '') throw new Error('Post must have a title'); 
            if (startDate.localeCompare(endDate) > 0) throw new Error ('End date must be at start date or later'); 
            await createPost(); 
            setErrorMsg('Post Created!'); 
        } catch (e) {
            setErrorMsg(e.message)
        }
    }; 
    
    return (
        <div>
            <h1>Create a Posting</h1>
            <div>
                <form className="post-creator"onSubmit={validatePost}>
                    <p>Title</p>
                    <input 
                        type="text"
                        maxLength="100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>    
                    </input>
                    <p>Describe your program</p>
                    <textarea 
                        className="description-input"
                        type="text"
                        placeholder=""
                        maxlength="1000"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >    
                    </textarea>
                    <p>What item are you accepting? (separate with commas)</p>
                    <input 
                        type="text"
                        placeholder=""
                        value={items}
                        onChange={(e) => setItems(e.target.value)}
                    >    
                    </input>
                    <p>Start Date</p>
                    <input 
                        type="date"
                        placeholder=""
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    >    
                    </input>
                    <p>End Date</p>
                    <input 
                        type="date"
                        placeholder=""
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    >    
                    </input>
                    <button 
                    className="creator-submit-button"
                    type="submit">Create Post</button>
                    <p className="errorMessage">{errorMsg}</p>
                </form>
            </div>
        </div>
    );
}