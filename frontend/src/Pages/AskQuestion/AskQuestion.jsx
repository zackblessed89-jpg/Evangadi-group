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