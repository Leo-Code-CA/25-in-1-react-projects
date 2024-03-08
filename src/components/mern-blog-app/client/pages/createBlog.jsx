import { useContext, useEffect } from 'react';
import classes from './style.module.css';
import { GlobalContext } from '../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CreateBlog() {

    const { formData, setFormData, isEdited, setIsEdited } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(isEdited);

    async function handleSaveBlogToDB() {

        try {
            const response = isEdited ?
            await axios.put(`http://localhost:3000/api/blogs/update/${location.state.getCurrentBlog._id}`, {
                title: formData.title,
                description: formData.description
            })
            : await axios.post('http://localhost:3000/api/blogs/add', {
                title: formData.title,
                description: formData.description
            });
    
            const result = await response.data;
            console.log(result);

            if (result) {
                setIsEdited(false);
                setFormData({
                    title: '',
                    description: ''
                });
                navigate('/');
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        // console.log(location);
        if (location.state) {
            const { getCurrentBlog } = location.state;
            console.log(`Inside the effect of the add blog page, the current blog is:`);
            console.log(getCurrentBlog);
            setIsEdited(true);
            setFormData({
                title: getCurrentBlog.title,
                description: getCurrentBlog.description
            });
        }
    }, [location]);

    console.log(`setFormData is: `);
    console.log(formData);

    return (
        <div className={classes.wrapper}>
            <h3>{isEdited ? 'Edit' : 'Add'} a blog</h3>
            <div className={classes.formWrapper}>
                <input 
                type="text" 
                name='title' 
                placeholder='Enter blog title' id='title' 
                value={formData.title}
                onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value
                })}/>
                <textarea 
                name="description" placeholder='Enter Blog description' 
                id="description" 
                cols="30" 
                rows="10" 
                value={formData.description}
                onChange={(e) => setFormData({
                    ...formData,
                    description: e.target.value
                })}></textarea>
                <button onClick={handleSaveBlogToDB}>{isEdited ? 'Edit' : 'Add'} Blog</button>
            </div>
        </div>
    );
}