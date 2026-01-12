import React from "react";
import { Link } from "react-router-dom";
import QuestionForm from "../../features/questions/QuestionForm/QuestionForm";
import classes from "./AskQuestion.module.css";

const AskQuestion = () => {
  return (
    <div className={classes.ask_page_container}>
      <div className={classes.inner_container}>
        {/* --- INSTRUCTIONS SECTION --- */}
        <div className={classes.instructions}>
          <h2>Steps to write a good question</h2>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        {/* --- FORM SECTION --- */}
        <div className={classes.form_wrapper}>
          <div className={classes.form_header}>
            <h3>Ask a public question</h3>
            <Link to="/" className={classes.home_link}>
              Go to All Questions Page
            </Link>
          </div>
          {/* The Actual Form Feature */}
          <QuestionForm />
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
