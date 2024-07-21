import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../components/BlogPage.css"
import { Link } from 'react-router-dom';
import EditPage from './EditPage';
import { useNavigate } from 'react-router-dom';

function BlogPage() {
    const {id} = useParams()
    console.log(id);
    const [pageData, setPageData] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`/api/${id}`)
        .then(response => {
            setPageData(response.data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[])
    if(!pageData){
        return "Loading"
    }

    function handleDelete(){
        if(window.confirm('Are you sure you want to edit?')){
            console.log("Delete id="+id);
            axios.post(`/api/${id}/delete`,id)
            .then(response=>{
                console.log("Success");
            })
            .catch(error=>{
            console.error(error)
            })
            navigate(`/`,{replace:true});
        }
    }

    function handleEdit(){
        if(window.confirm('Are you sure you want to edit?')){
        navigate(`/${id}/edit`);
        }
    }

    return (
    <div className='blog-page-div'>
        <h1 className='title'>{pageData.title}</h1>
        <div className="same-line">
            <p className='author'>By {pageData.author}</p>
            <p className='date'>{pageData.date.slice(0,10)}</p>
        </div>
        <p className='content'>{pageData.content}</p>
        {/* <Link to={`/${id}/edit`} className='edit-btn'>Edit</Link>
        <Link to="/" className='delete-btn' onClick={handleDelete}>Delete</Link> */}
        <button onClick={handleEdit} className='edit-btn'>Edit</button>
        <button onClick={handleDelete} className='delete-btn'>Delete</button>
    </div>

  )
}

export default BlogPage