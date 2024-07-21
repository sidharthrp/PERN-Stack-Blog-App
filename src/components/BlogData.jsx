import React, {useState,useEffect, useCallback} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./BlogData.css"

function BlogData() {
    const [blogData, setBlogData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
        axios.get('/api')
        .then((response)=>{
            setBlogData(response.data);
        })
        .catch(error => setError(error.message));  
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!blogData) {
      return <div>Loading...</div>;
    }

    function readMore(id){
        console.log("ReadMore")
        navigate(`/${id}`, );
    }
  
   
  return (
    <div className='card'>
        {blogData.map(post => (
        <div className='blog'
            key={post.id}>
            <div className='LinkHeader'> 
                <Link className='link' to={`/${post.id}`}>{post.title}</Link>
            </div>           
            <p className='author'>By {post.author}</p>
            <p className='date'>{post.date.slice(0,10)}</p>
            <p className='content'>{post.content.length>200?post.content.slice(0,200):post.content}
                {post.content.length>200&&<p className='read-more' onClick={()=>readMore(post.id)}>...ReadMore</p>}
            </p>
        </div>
          ))}
    </div>
  )
}

export default BlogData