import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import classes from './style.module.css';
import { FaTrash, FaEdit } from 'C:/Users/leono/OneDrive/Documents/Code/Projects/project19_25_in_1_react/25-in-1-react-projects/node_modules/react-icons/fa/index.mjs';
import { useNavigate } from "react-router-dom";


export default function Home() {

    const { blogList, setBlogList, pending, setPending, isEdited, setIsEdited } = useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchBlogList() {

        setPending(true);
        try {
            const response = await axios.get('http://localhost:3000/api/blogs');

            const result = await response.data;

            // console.log(result);

            setPending(false);

            if (result && result.blogList && result.blogList.length > 0) {
                setBlogList(result.blogList);
            } else {
                setBlogList([]);
            }

        } catch (error) {
            console.log(error);
            setPending(false);
        }
    }

    async function handleDeleteBlog(getCurrentId) {

        setPending(true);

        try {
            const response = await axios.delete(`http://localhost:3000/api/blogs/delete/${getCurrentId}`);

            const result = await response.data;

            if (result?.message) {
                fetchBlogList();
                // or call navigate(0) which reloads the same page
            }

            console.log(result);
            setPending(false);

        } catch (error) {
            console.log(error);
            setPending(false);
        }

    }

    function handleEditBlog(getCurrentBlog) {

        console.log(`I'm in handleEditBlog, the current blog is`);
        console.log(getCurrentBlog);

        navigate('/add-blog', { state: { getCurrentBlog }});

    }

    useEffect(() => {
        fetchBlogList();
    }, []);

    return (
        <div className={classes.blogListWrapper}>
            <h3>Blog List</h3>
            {
                pending ? <h1>Loading blogs... please wait!</h1>
                : <div className={classes.blogList}>
                    {
                        blogList && blogList.length > 0 ? blogList.map(item => 
                        <div key={item._id}>
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <FaEdit size={30} onClick={() => handleEditBlog(item)}/>
                            <FaTrash size={30} onClick={() => handleDeleteBlog(item._id)}/>
                        </div>)
                        : <h3>No Blogs Found. Start By Adding One.</h3>
                    }
                </div>
            }
        </div>
    );
}