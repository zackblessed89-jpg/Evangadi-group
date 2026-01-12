import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionForm from "../../features/questions/QuestionForm/QuestionForm";
import classes from "./AskQuestion.module.css";
import { FaLightbulb, FaPenFancy, FaCheckCircle, FaEye } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    icon: <FaLightbulb />,
    title: "Summarize",
    desc: "Write a clear, one-line title for your question.",
  },
  {
    icon: <FaPenFancy />,
    title: "Describe",
    desc: "Explain your problem in detail for better understanding.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Explain",
    desc: "Mention what you tried and what you expected to happen.",
  },
  {
    icon: <FaEye />,
    title: "Review",
    desc: "Check your question for clarity before posting it.",
  },
];

const AskQuestion = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <div className={classes.ask_page_container}>
      <div className={classes.inner_container}>
        {/* --- INSTRUCTIONS CARD --- */}
        <div className={classes.instructions_card} data-aos="fade-up">
          <h2>How to Ask a Great Question</h2>
          <p className={classes.instructions_intro}>
            Follow these steps to get the best answers quickly:
          </p>
          <ul>
            {steps.map((step, index) => (
              <li
                key={index}
                className={classes.step_item}
                data-aos="fade-right"
                data-aos-delay={index * 150}
              >
                <div className={classes.icon}>{step.icon}</div>
                <div>
                  <strong>{step.title}:</strong> {step.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --- FORM CARD --- */}
        <div
          className={classes.form_card}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className={classes.form_header}>
            <h3>Ask a Public Question</h3>
            <Link to="/" className={classes.home_link}>
              ← Back to All Questions
            </Link>
          </div>
          <QuestionForm />
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;