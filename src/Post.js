import React from 'react'
import PropTypes from 'prop-types'


const Post=({id,title,deletePost})=>{
    return(

        <div className="Post">
        <button className="Post__Delete" onClick={()=>deletePost(id)}>X</button>
        <div className="Post__title">{title}</div>
        <img className="Post__image" 
        src={`https://source.unsplash.com/random?sig=${id}`} />

        </div>    

    )

}
Post.propType ={
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired

}

export default Post;