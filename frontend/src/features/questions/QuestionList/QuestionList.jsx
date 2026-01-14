import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { getAllQuestions } from "../questionService";
import classes from "./QuestionList.module.css";
import { ChevronRight } from "lucide-react";

function QuestionList({ searchTerm }) {
  const [question, setQuestion] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoader(true);
        const data = await getAllQuestions();

        // Extract the data array from the response we got
        const extractedQuestions = data?.data;
        if (Array.isArray(extractedQuestions)) {
          setQuestion(extractedQuestions);
        } else {
          setQuestion([]);
        }
      } catch (error) {
        console.log("Error Fetching Questions:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchQuestion();
  }, []);

  // Filter logic:- this creates a new list based on the search input
  const filteredQuestions = question.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // then we handle loading state
  if (Loader) {
    return <div className={classes.loading}>Loading Questions ....</div>;
  }

  //  handle empty state (when thereis no questions from the db)
  if (question.length === 0) {
    return (
      <p className={classes.no_data}>
        No Questions found. Be the first one to ask!
      </p>
    );
  }

  return (
    <div className={classes.question_list}>
      {/* to handle no search result */}

      {filteredQuestions.length === 0 ? (
        <p className={classes.no_data}>No Questions match your search.</p>
      ) : (
        // to map over filtered questions
        filteredQuestions.map((q) => (
          <Link
            key={q.questionid || q.id}
            to={`/question/${q.questionid}`}
            className={classes.question_item}
          >
            {/* Left: Avatar + Username */}
            <div className={classes.user_info}>
              <div className={classes.avatar}>
                <CircleUser size={40} strokeWidth={1.5} color="#d6671d" />
              </div>

              <p className={classes.user_name}>{q.username}</p>
            </div>
            {/* Middle: Question Content + Meta */}
            <div className={classes.question_content}>
              <p className={classes.question_title}>{q.title}</p>
              <p className={classes.question_meta}>
                Asked by {q.username}{" "}
                {q.createdAt
                  ? ` • ${new Date(q.createdAt).toLocaleDateString()}`
                  : ""}
              </p>
            </div>
            {/* Right: Arrow */}

            <div className={classes.arrow_circle}>
              <ChevronRight size={20} strokeWidth={2} color="#fff" />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default QuestionList;
