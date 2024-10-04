'use client';
import { useEffect, useState } from 'react';
import english from '../../data/questions_en';
import arabic from '../../data/questions_ar';
import styles from '../../styles/Form.module.css';

const MultiPageForm = ({ language }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState({});
  const [questionStack, setQuestionStack] = useState([]);
  const [multiselectRandomOpt, setMultiselectRandomOpt] = useState("");

  const englishq = english(multiselectRandomOpt);
  const arabicq = arabic(multiselectRandomOpt);

  useEffect(() => {
    setQuestions(language === 'English' ? englishq : arabicq);
  }, [language, multiselectRandomOpt]);

  // useEffect(() => {
  //   if (selectedOptions.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * selectedOptions.length);
  //     const randomOptionId = selectedOptions[randomIndex];
  //     const options = options || [];
  //     const option = questions[currentQuestion]?.options.find(opt => opt.id === randomOptionId);
  //     if (option) {
  //       setMultiselectRandomOpt(option.answer);
  //     }
  //   }
  // }, [selectedOptions, questions, currentQuestion]);

  const handleAnswerSelection = (selectedAnswer, nextQuestion) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: selectedAnswer,
    }));

    if (nextQuestion !== undefined) {
      setQuestionStack((prevQuestionStack) => [
        ...prevQuestionStack,
        currentQuestion,
      ]);
      setCurrentQuestion(nextQuestion);
    } else {
      alert('Form complete! Thank you for your answers.');
    }
  };

  const handleInputChange = (e) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: e.target.value,
    }));
  };

  const handleMatrixInputChange = (rowIndex, columnValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: {
        ...prevAnswers[currentQuestion],
        [rowIndex]: columnValue,
      },
    }));
  };

  const handlePrevQuestion = () => {
    if (questionStack.length > 0) {
      const prevQuestion = questionStack.pop();
      setQuestionStack([...questionStack]); // Update state without mutation
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleSubmit = () => {
    window.electron.sendFormData(answers);

    window.electron.onFormSaved((event, message) => {
      alert(message);
    });

    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOptions([]);
    setQuestionStack([]); // Clear the stack on submit
  };

  const handleMultiSelectChange = (optionId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      }
      return [...prev, optionId];
    });
    console.log("Selected Options:", selectedOptions);
  };

  const handleMultiSelectSubmit = () => {
    if (selectedOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedOptions.length);
        const randomOptionId = selectedOptions[randomIndex];
        const option = questions[currentQuestion].options.find(opt => opt.id === randomOptionId);
        
        if (option && option.nextQuestion) {
            const nextQuestion = option.nextQuestion;
            console.log("Random Option Selected:", randomOptionId);
            setMultiselectRandomOpt(option.answer); // Set the random option in the state
            setCurrentQuestion(nextQuestion);
            console.log("Next Question:", nextQuestion);
        } else {
            alert('No valid next question found for the selected option.');
        }
    } else {
        alert('No valid selections made.');
    }
  };

  const questionData = questions[currentQuestion];

  if (!questionData) {
    return <p>Error: Question not found!</p>;
  }

  const renderQuestion = () => {
    switch (questionData.type) {
      case 'intro':
        return (
          <div className={styles.introPage}>
            <h3 className={styles.introHead}>{questionData.title}</h3>
            <p className={styles.introPara}>{questionData.detail}</p>
            <button
              onClick={() => handleAnswerSelection(answers[currentQuestion], questionData.nextQuestion)}
              className={styles.startBtn}
            >
              Start
            </button>
          </div>
        );
      case 'rating':
        return (
          <>
            <p className={styles.question}>Q. {questionData.question}</p>
            <div className={styles.ratingContainer}>
              {questionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option.answer, option.nextQuestion)}
                  className={styles.ratingBtn}
                >
                  {option.answer}
                </button>
              ))}
            </div>
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
            </div>
          </>
        );
      case 'text':
        return (
          <>
            <p className={styles.question}>Q. {questionData.question}</p>
            <input
              type="text"
              value={answers[currentQuestion] || ''}
              onChange={handleInputChange}
              className={styles.textInpt}
            />
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={() => handleAnswerSelection(answers[currentQuestion], questionData.nextQuestion)}
                className={styles.nextBtn}
              >
                Next
              </button>
            </div>
          </>
        );
      case 'multi-select':
        return (
          <>
            <p className={styles.question}>Q. {questionData.question}</p>
            {questionData.options.map((option) => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  value={option.answer}
                  onChange={(e) => {
                    const selectedAnswers = answers[currentQuestion] || [];
                    if (e.target.checked) {
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [currentQuestion]: [...selectedAnswers, option.answer],
                      }));
                    } else {
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [currentQuestion]: selectedAnswers.filter((a) => a !== option.answer),
                      }));
                    }
                  }}
                />
                {option.answer}
              </label>
            ))}
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={() => handleAnswerSelection(answers[currentQuestion], questionData.nextQuestion)}
                className={styles.nextBtn}
              >
                Next
              </button>
            </div>
          </>
        );
      case 'multi-select-random':
        return (
          <>
            <p className={styles.question}>{questionData.question}</p>
            {questionData.options.map((option) => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleMultiSelectChange(option.id)}
                />
                {option.answer}
              </label>
            ))}
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={handleMultiSelectSubmit}
                className={styles.nextBtn}
              >
                Next
              </button>
            </div>
          </>
        );
      case 'mcq':
        return (
          <>
            <p className={styles.question}>Q. {questionData.question}</p>
            <div className={styles.options}>
              {questionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option.answer, option.nextQuestion)}
                  className={styles.mcqBtn}
                >
                  {option.answer}
                </button>
              ))}
            </div>
            <button onClick={handlePrevQuestion} className={styles.backBtn}>
              Back
            </button>
          </>
        );
      case 'matrix':
        return (
          <>
            <p className={styles.question}>Q. {questionData.question}</p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {questionData.columns.map((label) => (
                    <th key={label.value} className={styles.tablehead}>{label.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {questionData.rows.map((row, rowIndex) => (
                  <tr key={row.value}>
                    <td>{row.label}</td>
                    {questionData.columns.map((column) => (
                      <td key={column.value} className={styles.tableCell}>
                        <input
                          type="radio"
                          name={`row-${rowIndex}`}
                          value={column.value}
                          checked={answers[currentQuestion]?.[rowIndex] === column.value}
                          onChange={() => handleMatrixInputChange(rowIndex, column.value)}
                          className={styles.radio}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={() => handleAnswerSelection(answers[currentQuestion], questionData.nextQuestion)}
                className={styles.nextBtn}
              >
                Next
              </button>
            </div>
          </>
        );
      case 'complete':
        return (
          <>
            <p>{questionData.question}</p>
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={styles.submitBtn}
              >
                Submit Form
              </button>
            </div>
          </>
        );
      default:
        return <p className={styles.error}>Invalid question type.</p>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.containerCard}>
        {renderQuestion()}
      </div>
    </div>
  );
};

export default MultiPageForm;