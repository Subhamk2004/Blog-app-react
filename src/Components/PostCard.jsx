import React from 'react'
import service from '../appwrite/appwriteConfig'
import { Link } from 'react-router-dom'

function PostCard({
    $id, title, articleImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 p-4 '>
                <div className='w-full justify-center'>
                    <img src={service.getFilePreview(articleImage)} alt={title} className='w-full' />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;