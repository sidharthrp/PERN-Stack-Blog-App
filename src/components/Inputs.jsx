import React,{useState,useEffect} from 'react'
import axios from 'axios';
import "./Inputs.css"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Inputs(props) {
    const [pageData, setPageData] = useState(null);
    const {id} = useParams()
    const [input,setInput] = useState({
        title:"",
        author:"",
        content:""
    })
    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(pageData){
            setInput({
                title: pageData.title,
                author: pageData.author,
                content: pageData.content
            })
        }
    },[pageData])


    useEffect(()=>{  
        console.log(id);
        console.log("Edit page")
        if(props.edit){
            axios.get(`/api/${id}`)
            .then(response=>{
                console.log(response.data);
                setPageData(response.data);
                console.log(pageData.content);
            })
        }
    },[props.edit, id])
    
    function handleChange(event){
        const {value,name} = event.target;
        console.log(value);
        
        setInput((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    function handleSubmit(event){
        console.log(input.title);
        console.log(input.author);
        console.log(input.content);
        
        if(props.edit){
            console.log("Editing")
            axios.post(`/api/${id}/edit`,input)
            .then(response=>{
                console.log("Success");
            })
            .catch(error=>{
                console.error(error)
            })
        }
        else{
            axios.post('/api/write',input)
            .then(response=>{
                console.log("Success");
            })
            .catch(error=>{
                console.error(error)
            })
        }
        
        event.preventDefault();
        navigate('/', {replace:true});
    }


  return (
    <div>
         <form onSubmit={handleSubmit}>
            <div className='inputs'>
            <div>
                <input className="input blog-title" type='text' name='title' placeholder={!pageData?'Title':null} onClick={()=>{setClick(false)}} 
                    defaultValue={pageData?pageData.title:input.title} onChange={handleChange} required></input>
                <input className="input blog-author" type='text' name='author' placeholder={!pageData?'Author':null} onClick={()=>{setClick(false)}} onChange={handleChange} 
                    defaultValue={pageData?pageData.author:input.author} required></input>
            </div>
            <br />
            <textarea className="input" name='content' placeholder={!pageData?'Content':null} rows={click?10:1} onClick={()=>{setClick(true)}} onChange={handleChange} 
            defaultValue={pageData?pageData.content:""} required>
                </textarea>
            </div>
            <button className="submit-btn" type='submit' name='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Inputs