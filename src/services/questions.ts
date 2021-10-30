import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import { db } from "./firestore";

import OptionModel from "../models/option";
import QuestionModel from "../models/question";
import { shuffleQuestions } from "../functions/arrayFunctions";

export type Option = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  options: Option[];
  category: string;
};

const addQuestion = async (question: Question) => {
  try {
    const questionsCollection = collection(db, "questions");
    const docRef = await addDoc(questionsCollection, question);

    console.log("Question: ", question);
    console.log("Question Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getQuestionsDb = async (): Promise<Question[]> => {
  const questionsCollection = collection(db, "questions");
  const questionsSnapshot = await getDocs(questionsCollection);
  const questionsList = questionsSnapshot.docs.map(
    doc => doc.data() as Question
  );

  return questionsList;
};

const getQuestions = async (): Promise<QuestionModel[]> => {
  const firestoreQuestions = await getQuestionsDb();

  const questions = firestoreQuestions.map(
    ({ id, text, options, category }) => {
      const questionOptions = options.map(({ text, isCorrect }) => {
        return isCorrect
          ? OptionModel.isCorrect(text)
          : OptionModel.isWrong(text);
      });

      return new QuestionModel(id, text, questionOptions, category);
    }
  );

  return shuffleQuestions(questions.map(question => question.shuffleOptions()));
};

const getQuestionsTotal = async (): Promise<number> => {
  const questionsCollection = collection(db, "questions");
  const questionsSnapshot = await getDocs(questionsCollection);
  return questionsSnapshot.size;
};

const getQuestionById = async (
  questionId: number
): Promise<QueryDocumentSnapshot<DocumentData>> => {
  const questionsCollection = collection(db, "questions");
  const q = query(questionsCollection, where("id", "==", questionId));
  const querySnapshot = await getDocs(q);
  const questionList = querySnapshot.docs;

  if (questionList.length === 0) return;

  if (questionList.length === 1) {
    const question = questionList[0];
    return question;
  }

  if (questionList.length > 1) {
    throw new Error("Não pode ter 2 questões com mesmo ID!");
  }
};

const updateQuestion = async (question: Question) => {
  const questionToUpdate = await getQuestionById(question.id);
  const docRef = questionToUpdate.id;

  const updatedQuestion = { ...question };
  await setDoc(doc(db, "questions", docRef), updatedQuestion);
};

export {
  db,
  addQuestion,
  getQuestions,
  getQuestionsDb,
  getQuestionsTotal,
  getQuestionById,
  updateQuestion,
};
