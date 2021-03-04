import React,{useState} from 'react'
import '../App.css';
import Input from '../Input'
import Post from '../Post.js'
import AD from '../pages/AuthenAD.js'

let id = 1;
const Home=()=>{

    const [posts,setPosts]= useState([]);

    const addPost = (title) =>{
      const newPost = {id,title}
      setPosts([newPost,...posts])
      id+=1;
    }
    const deletePost = (id) =>{
      const updatedPosts  = posts.filter((post)=>post.id != id);
      setPosts(updatedPosts);
    }

    return(
        <div>
        
        <Input addPost={addPost}/> 
        {posts.map((post)=>(
        <Post key={post.id} id={post.id} title={post.title} deletePost={deletePost}/>))}
        </div>
    );

}
export default Home;