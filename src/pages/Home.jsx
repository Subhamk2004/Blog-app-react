import React, {useEffect, useState} from 'react'
import service from '../appwrite/appwriteConfig'
import { Container, PostCard } from '../Components'
import { useSelector } from 'react-redux'

function Home() {
    let userData = useSelector(state => state.auth.userData)

    console.log(userData);
    let [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

  if(posts.length === 0){
    return (
        <div className='text-center py-8'>
            <Container>
                <div className='flex, flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1>No posts found.</h1>
                        <p>Please add some posts to see them here.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home