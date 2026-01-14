import React, { useState } from "react";// to manage component state
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowUp, Search } from "lucide-react";
import classes from "./Home.module.css";
import QuestionList from "../../features/questions/QuestionList/QuestionList";


function Home() {
  const { user } = useAuth();//get the current logged in user
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");//store the search input /text/ entered by the user
  // to scroll to top smoothly

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };//used for the back to top button

  const handleAskQuestion = (e) => {
    e.preventDefault();
    navigate("/ask");
  };// navigate to the askquestionpage by prevents page refresh

  return (
    <div className={classes.home_container}>
      <div className={classes.header_row}>
        <button onClick={handleAskQuestion} className={classes.askButton}>
          Ask Question
        </button>

        {/* ----- PREMIUM USER CHIP ----- */}
        {/* display currently loin user info */}
        <div className={classes.user_chip}>
          <div className={classes.user_avatar}>
            {/* shows the first letter of the username as avatar */}
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className={classes.user_text}>
            {/* display user status */}
            <span className={classes.user_status}>Online</span>
            {/* display the username  */}
            <span className={classes.user_name}>{user?.username}</span>
          </div>
        </div>
      </div>

      <div className={classes.search_section}>
        <Search className={classes.search_icon} size={18} />
        <input
          type="text"
          placeholder="Search questions...."
          className={classes.search_bar}
          // update serachterm state when user types input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* shows clear (x) button only if text exist */}
        {searchTerm && (
          <button
          // clear the search input text
            onClick={() => setSearchTerm("")}
            style={{
              color: "#999",
              cursor: "pointer",
              border: "none",
              background: "none",
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className={classes.question_list_wrapper}>
        <h3>Questions</h3>
        <hr />
        {/* passes serachterm as prop it filter question based on the user input (type) */}
        <QuestionList searchTerm={searchTerm} />
      </div>

      <div className={classes.scroll_top_container}>
        <button onClick={scrollToTop} className={classes.scrollTopButton}>
          <ArrowUp size={20} />
          Back To Top
        </button>
      </div>
    </div>
  );
}

export default Home;
