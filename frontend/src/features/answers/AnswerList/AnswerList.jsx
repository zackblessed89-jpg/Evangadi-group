import { useEffect, useState } from 'react';
import classes from './AnswerList.module.css';
import { getAnswers } from '../../answers/answerService';

const AnswerList = ({ question_id }) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const data = await getAnswers(question_id);
        setAnswers(data);
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [question_id]);

  if (loading) return <p>Loading answers...</p>;

  return (
    <div className={classes.answers_container}>
      <h3>Answers From The Community</h3>
      <hr />

      {/* Empty state */}
      {answers.length === 0 && <p>No answers yet. Be the first to answer.</p>}

      {/* Render answers */}
      {answers.map((answer) => (
        <div key={answer.answer_id} className={classes.answer_card}>
          <div className={classes.user_info}>
            <div className={classes.avatar}>👤</div>
            <span className={classes.username}>{answer.username}</span>
          </div>

          <p className={classes.answer_text}>{answer.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
