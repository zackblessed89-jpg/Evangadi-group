import React from "react";
import { ArrowRight, ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import classes from "./QuestionDetail.module.css";

import { getFullDate } from "../../../utilis/formatTime";

const QuestionHeaderUI = ({ questionData }) => {
  const navigate = useNavigate();

  if (!questionData) return null;

  return (
    <div className={classes.header_container}>
      {/* Back to Questions Button */}
      <button onClick={() => navigate("/")} className={classes.back_button}>
        <ArrowLeftCircle size={20} />
        <span>All Questions</span>
      </button>

      <h2 className={classes.title}>
        {questionData?.title}
      </h2>

      <p className={classes.description}>{questionData?.description}</p>
      <span className={classes.question_date}>
        Asked on: {getFullDate(questionData?.created_at)}
      </span>
      <div className={classes.divider} />
    </div>
  );
};

export default QuestionHeaderUI;
