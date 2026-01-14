import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { askQuestion, updateQuestion } from "../questionService";
import classes from "./QuestionForm.module.css";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // detect edit mode from navigation state
  const isEdit = location?.state?.edit === true;
  const editQuestion = location?.state?.question || null;

  useEffect(() => {
    if (isEdit && editQuestion) {
      setTitle(editQuestion.title || "");
      setDescription(editQuestion.description || "");
    }
  }, [isEdit, editQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill all fields");

    setLoading(true);
    try {
      if (isEdit && editQuestion) {
        await updateQuestion(editQuestion.questionid || editQuestion.id, {
          title,
          description,
        });
        alert("Question updated successfully!");
        navigate(`/question/${editQuestion.questionid || editQuestion.id}`);
        return;
      }

      await askQuestion(title, description, "General");

      alert("Question posted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error posting question - full error:", err);
      const status = err.response?.status;
      const serverMsg = err.response?.data?.msg || err.response?.data || null;
      const message = serverMsg
        ? `${serverMsg} ${status ? `(status ${status})` : ""}`.trim()
        : err.message || "Error posting question. Make sure you are logged in.";
      alert(message);
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
          {loading
            ? isEdit
              ? "Updating..."
              : "Posting..."
            : isEdit
            ? "Update Question"
            : "Post Your Question"}
        </button>
      </form>
    </div>
  );
};
export default QuestionForm;
