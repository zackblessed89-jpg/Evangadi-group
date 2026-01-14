import axiosBase from "../../services/axiosConfig";

// For Eyerus
export const getAllQuestions = async () => {
  const response = await axiosBase.get("/question/getAllQuestions");//send et request method to the backend, usess the base url defined in axiosconfig
  return response.data;// the response conatin status,header,data from server. we only want the data part
};

//  using question_id to match your controller
export const getSingleQuestion = async (question_id) => {
  const response = await axiosBase.get(
    `/question/getSingleQuestion/${question_id}`
  );
  return response.data;
};

// For the Ask Question Form
export const askQuestion = async (title, description, tag) => {
  const response = await axiosBase.post("/question/postQuestion", {
    title,
    description,
    tag,
  });
  return response.data;
};

export const updateQuestion = async (question_id, data) => {
  const response = await axiosBase.put(
    `/question/updateQuestion/${question_id}`,
    data
  );
  return response.data;
};

export const deleteQuestion = async (question_id) => {
  const response = await axiosBase.delete(
    `/question/deleteQuestion/${question_id}`
  );
  return response.data;
};
