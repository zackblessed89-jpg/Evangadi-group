import React, { useState } from "react";
import axiosBase from "../../../services/axiosConfig";
import classes from "./AnswerForm.module.css";

const AnswerForm = ({ questionId }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Answer is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // POST /answer/postAnswer or your actual route
      await axiosBase.post("/answer/postAnswer", {
        questionid: questionId,
        answer,
      });

      setSuccess("Answer posted successfully.");
      setAnswer("");
     
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.answer_form_container}>
      {error && <p className={classes.error}>{error}</p>}
      {success && <p className={classes.success}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <label className={classes.label}>
          Answer <span className={classes.required}>:-</span>
        </label>
        <textarea
          className={classes.textarea}
          placeholder="Write your answer here"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          // required
        />

        <button
          type="submit"
          className={`orenge_btn ${classes.submitButton}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Post Your Answer"}
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
