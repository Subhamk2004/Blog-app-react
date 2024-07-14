import React, {useEffect, useState} from 'react'
import {Container, PostCard, PostForm} from '../Components'
import service from '../appwrite/appwriteConfig'
import { useParams, useNavigate } from'react-router-dom'


function Editpost() {

    let [post, setPost] = useState(null)
    let {slug} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        if(slug ) {
            service.getPostBySlug(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default Editpost