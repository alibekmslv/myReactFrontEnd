import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import StateContext from "../StateContext"
import Post from "./Post"

function ProfilePosts() {
  const appState = useContext(StateContext)

  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const ourRequest = Axios.CancelToken.source()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })
        setIsLoading(false)
        setPosts(response.data)
      } catch (e) {
        console.log("There was a problem or request has been canceled")
      }
    }
    fetchPosts()

    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <>
      {posts.length == 0 && appState.loggedIn && appState.user.username == username && (
        <>
          <p className="text-center">You have not created posts yet.</p>
          <p className="text-center">
            Tell what's going on right now
            <Link className="btn btn-sm btn-primary ml-2" to="/create-post">
              Create Post
            </Link>
          </p>
        </>
      )}
      {posts.length == 0 && appState.loggedIn && appState.user.username != username && <p className="text-center">{username} have not created posts yet</p>}
      {posts.length > 0 && (
        <div className="list-group">
          {posts.map(post => {
            const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            return <Post post={post} key={post._id} noAuthor={true} />
          })}
        </div>
      )}
    </>
  )
}

export default ProfilePosts
