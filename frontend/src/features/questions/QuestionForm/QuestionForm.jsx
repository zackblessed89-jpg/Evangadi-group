import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../questionService";
import classes from "./QuestionForm.module.css";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill all fields");

    setLoading(true);
    try {
      await askQuestion(title, description, "General");

      alert("Question posted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error details:", err);
      alert(
        err.response?.data?.msg ||
          "Error posting question. Make sure you are logged in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.form_box}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className={classes.title_input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Question Description..."
          className={classes.desc_input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className={classes.post_btn} disabled={loading}>
          {loading ? "Posting..." : "Post Your Question"}
        </button>
      </form>
    </div>
  );
};
export default QuestionForm;