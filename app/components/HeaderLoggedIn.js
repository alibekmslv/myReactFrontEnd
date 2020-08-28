import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import ReactTooltip from "react-tooltip"

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout() {
    appDispatch({ type: "logout" })
    appDispatch({ type: "flashMessage", value: "You have succefully logged out." })
  }
  function handleSearchIcon(e) {
    e.preventDefault()
    appDispatch({ type: "openSearch" })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a onClick={handleSearchIcon} href="#" className="text-white mr-2 header-search-icon" data-for="search" data-tip="Search">
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" effect="solid" id="search" className="customToolip" />{" "}
      <span
        onClick={() => {
          appDispatch({ type: "toggleChat" })
        }}
        className={"mr-2 header-chat-icon " + (appState.unreadChatCount ? "text-danger" : "text-white")}
        data-for="chat"
        data-tip="Chat"
      >
        <i className="fas fa-comment"></i>

        {appState.unreadChatCount ? <span className="chat-count-badge text-white">{appState.unreadChatCount < 10 ? appState.unreadChatCount : "9+"} </span> : ""}
      </span>
      <ReactTooltip place="bottom" effect="solid" id="chat" className="customToolip" />{" "}
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} data-for="profile" data-tip={appState.user.username} />
      </Link>
      <ReactTooltip place="bottom" effect="solid" id="profile" className="customToolip" />{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <Link onClick={handleLogout} className="btn btn-sm btn-secondary" to="/">
        Sign Out
      </Link>
    </div>
  )
}

export default HeaderLoggedIn
