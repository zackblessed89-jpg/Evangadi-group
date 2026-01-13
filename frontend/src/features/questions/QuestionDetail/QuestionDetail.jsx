import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CircleUser } from "lucide-react";

// Import Services
import { getSingleQuestion } from "../questionService";
import { getAnswers, postAnswer } from "../../answers/answerService";

import { getTimeAgo } from "../../../utilis/formatTime";
import { getAiSummary } from "../../../utilis/aiService";

// Import Loader Component
import Loader from "../../../components/Loader/Loader";

import QuestionHeaderUI from "./QuestionHeaderUI";
import classes from "./QuestionDetail.module.css";

const QuestionDetail = () => {
  const { questionId } = useParams(); //grabs the ID from the browser address bar
  const [question, setQuestion] = useState(null); //Holds the question title and description.
  const [answers, setAnswers] = useState([]); //An array (list) of all community answers.
  const [newAnswer, setNewAnswer] = useState(""); //What the user is currently typing in the box.
  const [loading, setLoading] = useState(true); //True when the page first opens; false when data arrives.
  const [posting, setPosting] = useState(false); //True only while the "Post" button is clicked and waiting for the server.

  // AI State
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const fetchData = async () => {
    if (!questionId) return; // Safety guard
    try {
      setLoading(true);
      const [qData, aData] = await Promise.all([
        getSingleQuestion(questionId),
        getAnswers(questionId),
      ]);

      setQuestion(qData?.question);
      setAnswers(aData?.answers || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [questionId]);

  const handlePostAnswer = async (e) => {
    e.preventDefault(); //Stops the page from refreshing when you click submit.
    if (!newAnswer.trim()) return alert("Please type an answer");

    setPosting(true);
    try {
      await postAnswer(questionId, newAnswer);
      setNewAnswer("");
      alert("Answer posted successfully!");

      const updatedAnswers = await getAnswers(questionId);
      setAnswers(updatedAnswers?.answers || []);
    } catch (err) {
      console.error("Error posting answer:", err);
      alert(err.response?.data?.msg || "Something went wrong.");
    } finally {
      setPosting(false);
    }
  };

  const handleAiSummarize = async () => {
    if (!question || answers.length === 0) return;
    setAiLoading(true);
    try {
      const summary = await getAiSummary(question.title, answers);
      setAiSummary(summary);
    } catch (error) {
      setAiSummary("Could not generate summary.");
    } finally {
      setAiLoading(false);
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className={classes.detail_container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.detail_container}>
      <div className={classes.inner_container}>
        <section className={classes.question_section}>
          <QuestionHeaderUI questionData={question} />
          <div className={classes.ai_section}>
            <button
              onClick={handleAiSummarize}
              className={classes.ai_button}
              disabled={aiLoading || answers.length === 0}
            >
              {aiLoading ? "AI is thinking..." : "✨ Summarize Discussion"}
            </button>
            {aiSummary && (
              <div className={classes.ai_summary_box}>
                <h3>✨ AI Discussion Summary</h3>
                <div className={classes.summary_content}>{aiSummary}</div>
              </div>
            )}
          </div>
        </section>

        <section className={classes.answers_section}>
          <div className={classes.answers_header_group}>
            <h2>Answer From The Community</h2>
            {answers.length > 0 && (
              <span className={classes.answer_count}>{answers.length}</span>
            )}
          </div>
          <div className={classes.answer_list}>
            {answers.length === 0 ? (
              <p className={classes.no_answer}>
                No answers yet. Be the first to help!
              </p>
            ) : (
              answers.map((ans, index) => (
                <div
                  key={ans.answerid || index}
                  className={classes.answer_item}
                >
                  <div className={classes.user_info}>
                    <div className={classes.avatar}>
                      <CircleUser size={40} strokeWidth={1.5} color="#787878" />
                    </div>
                    <p className={classes.user_name}>{ans.username}</p>
                    <span className={classes.time_stamp}>
                      {getTimeAgo(ans.created_at)}
                    </span>
                  </div>
                  <div className={classes.answer_text}>
                    <p>{ans.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={classes.post_answer_section}>
          <div className={classes.form_header}>
            <h3>Answer The Top Question</h3>
          </div>
          <form onSubmit={handlePostAnswer} className={classes.answer_form}>
            <textarea
              rows="6"
              placeholder="Your answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              disabled={posting}
              className={`blue_btn ${classes.submit_btn}`}
            >
              {posting ? "Posting..." : "Post Your Answer"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default QuestionDetail;
