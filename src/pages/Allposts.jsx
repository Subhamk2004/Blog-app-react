import React, {useState, useEffect} from 'react'
import service from '../appwrite/appwriteConfig'
import { Container, PostCard } from '../Components'
import { useSelector } from 'react-redux'

function Allposts() {
    let userData = useSelector(state => state.auth.userData)

    console.log(userData);
    let [posts, setPosts] = useState([])
    useEffect(() => {

    },[])
    service.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Allposts