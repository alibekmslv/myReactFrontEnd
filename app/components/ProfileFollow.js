import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ProfileFollow(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [follow, setFollow] = useState([])

  const ourRequest = Axios.CancelToken.source()

  useEffect(() => {
    async function fetchFollow() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.action}`, { cancelToken: ourRequest.token })
        setIsLoading(false)
        setFollow(response.data)
      } catch (e) {
        console.log("There was a problem or request has been canceled")
      }
    }
    fetchFollow()

    return () => {
      ourRequest.cancel()
    }
  }, [username, props.action])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <>
      {follow.length == 0 && props.action == "followers" && appState.loggedIn && appState.user.username == username && (
        <p className="text-center">
          You have no followers. Start writing interesting stories and following other people to make them follow you back.
          <br />
          <Link className="btn btn-sm btn-primary mt-3" to="/create-post">
            Create Post
          </Link>
        </p>
      )}
      {follow.length == 0 && props.action == "followers" && appState.loggedIn && appState.user.username != username && (
        <p className="text-center">
          {username} have no followers. Be {username}'s first follower
        </p>
      )}
      {follow.length == 0 && props.action == "following" && appState.loggedIn && appState.user.username == username && (
        <p className="text-center">
          You following nobody. Search interesting posts and start follow their author
          <br />
          <button
            className="btn btn-primary btn-sm shadow-sm mt-3"
            onClick={() => {
              appDispatch({ type: "openSearch" })
            }}
          >
            Search <i className="fas fa-search"></i>
          </button>
        </p>
      )}
      {follow.length == 0 && props.action == "following" && appState.loggedIn && appState.user.username != username && <p className="text-center">{username} follows nobody :(</p>}
      {follow.length > 0 && (
        <div className="list-group">
          {follow.map((follow, index) => {
            return (
              <Link key={index} to={`/profile/${follow.username}`} className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src={follow.avatar} /> {follow.username}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ProfileFollow
