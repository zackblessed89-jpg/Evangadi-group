import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';

import classes from './AnswerList.module.css';

const AnswerList = () => {
  // Get question_id from the URL
  const { question_id } = useParams();

  // State to store answers from DB
  const [answers, setAnswers] = useState([]);

  // Loading & error states for UX
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //fetch answers when component mounts or questionId changes

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/api/answer/${question_id}`);

        setAnswers(response.data.answers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching answers:', err);
        setError('Failed to load answers');
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [question_id]);

  // Loading state
  if (loading) {
    return <p>Loading answers...</p>;
  }

  // Error state
  if (error) {
    return <p className={classes.error}>{error}</p>;
  }

  // No answers case
  if (answers.length === 0) {
    return <p>No answers yet. Be the first to answer.</p>;
  }

  return (
    <div className={classes.answerList}>
      {answers.map((item) => (
        <div key={item.answer_id} className={classes.answerCard}>
          <p className={classes.answerText}>{item.answer}</p>

          <div className={classes.meta}>
            <span className={classes.user}>Answered by {item.user_name}</span>
            <span className={classes.date}>
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
