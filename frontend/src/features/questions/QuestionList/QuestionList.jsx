import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { getAllQuestions, deleteQuestion } from "../questionService";
import classes from "./QuestionList.module.css";
import { useAuth } from "../../../context/AuthContext";

function QuestionList({ searchTerm, onEdit, onDelete }) {
  const [question, setQuestion] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoader(true);
        const data = await getAllQuestions();

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

  // Filter logic
  const filteredQuestions = useMemo(
    () =>
      question.filter((q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [question, searchTerm]
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuestions.length / PAGE_SIZE)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, question.length]);

  const pagedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, currentPage]);

  const { user } = useAuth();
  const currentUserId = user?.userid || null;

  const navigate = useNavigate();

  const handleEdit = (q) => {
    navigate("/ask", { state: { edit: true, question: q } });
  };

  const handleDelete = async (q) => {
    try {
      if (!confirm("Delete this question? This cannot be undone.")) return;

      await deleteQuestion(q.questionid || q.id);

      setQuestion((prev) =>
        prev.filter((item) => item.questionid !== (q.questionid || q.id))
      );
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete question.");
    }
  };

  const changePage = (p) =>
    setCurrentPage(Math.min(Math.max(1, p), totalPages));

  if (Loader) {
    return <div className={classes.loading}>Loading Questions ....</div>;
  }

  if (question.length === 0) {
    return (
      <p className={classes.no_data}>
        No Questions found. Be the first one to ask!
      </p>
    );
  }

  return (
    <div className={classes.question_list}>
      {filteredQuestions.length === 0 ? (
        <p className={classes.no_data}>No Questions match your search.</p>
      ) : (
        pagedQuestions.map((q) => {
          const ownerId = q.userid || q.userId || q.user_id || null;
          const isOwner =
            user &&
            (ownerId
              ? ownerId === currentUserId
              : user.username === q.username);

          return (
            <Link
              key={q.questionid || q.id}
              to={`/question/${q.questionid || q.id}`}
              className={classes.question_item}
            >
              {/* Left */}
              <div className={classes.user_info}>
                <div className={classes.avatar}>
                  <CircleUser size={40} strokeWidth={1.5} color="#d6671d" />
                </div>
                <p className={classes.user_name}>{q.username}</p>
              </div>

              {/* Middle */}
              <div className={classes.question_content}>
                <p className={classes.question_title}>{q.title}</p>
                <p className={classes.question_meta}>
                  Asked by {q.username}
                  {q.createdAt &&
                    ` • ${new Date(q.createdAt).toLocaleDateString()}`}
                </p>
              </div>

              {/* Right */}
              <div className={classes.action_group}>
                {isOwner && (
                  <>
                    <button
                      className={classes.icon_btn}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit ? onEdit(q) : handleEdit(q);
                      }}
                      title="Edit question"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      className={classes.icon_btn_danger}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete ? onDelete(q) : handleDelete(q);
                      }}
                      title="Delete question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}

                <div className={classes.arrow_circle}>
                  <ChevronRight size={20} strokeWidth={2} color="#fff" />
                </div>
              </div>
            </Link>
          );
        })
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={classes.pagination}>
          <button
            className={classes.page_btn}
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${classes.page_btn} ${
                currentPage === i + 1 ? classes.active : ""
              }`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={classes.page_btn}
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
