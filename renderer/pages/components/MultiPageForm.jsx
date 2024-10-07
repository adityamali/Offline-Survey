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

  const getTruncatedKey = (question) => {
    return question ? question.slice(0, 63) : '';
  };

  const handleAnswerSelection = (selectedAnswer, nextQuestion) => {
    const questionKey = getTruncatedKey(englishq[currentQuestion].question);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: selectedAnswer,
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
    const questionKey = getTruncatedKey(englishq[currentQuestion].question);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: e.target.value,
    }));
  };

  const handleMatrixInputChange = (rowIndex, columnValue) => {
    const questionKey = getTruncatedKey(englishq[currentQuestion].question);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: {
        ...prevAnswers[questionKey],
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

  const [lowestRatedTour, setLowestRatedTour] = useState(null);

  useEffect(() => {
    fetchLowestRatedTour();
  }, []);
  
  const fetchLowestRatedTour = async () => {
    try {
      const data = await window.electron.getLowestRatedTour();
      if (data) {
        setLowestRatedTour(data);
      }
      console.log("Lowest Rated Tour:", data);
    } catch (err) {
      console.error('Error fetching lowest rating data:', err);
      setError('Failed to retrieve lowest rating data.');
    }
  };

  const handleMultiSelectSubmit = () => {
    const questionKey = getTruncatedKey(englishq[currentQuestion].question);
    if (selectedOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedOptions.length);
        const randomOptionId = selectedOptions[randomIndex];
        const option = questions[currentQuestion].options.find(opt => opt.id === randomOptionId);
        console.log("Random Option Selected:", randomOptionId);

        fetchLowestRatedTour();
        console.log("Lowest Rated Tour:", lowestRatedTour.tour_number);

        if (option && option.nextQuestion && lowestRatedTour) {
            console.log("Lowest Rated Tour:", lowestRatedTour.tour_number);
            const nextQuestion = option.nextQuestion;
            console.log("Random Option Selected:", randomOptionId);
            if (selectedOptions.includes(parseInt(lowestRatedTour.tour_number))) {
              let tourString = 'Heritage Tour ' + lowestRatedTour.tour_number;
              setMultiselectRandomOpt(tourString); // Set the random option in the state
            } else {
              setMultiselectRandomOpt(option.answer); // Set the random option in the state
            }
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
              onClick={() => handleAnswerSelection(answers[getTruncatedKey(englishq[currentQuestion].question)], questionData.nextQuestion)}
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
              value={answers[getTruncatedKey(englishq[currentQuestion].question)] || ''}
              onChange={handleInputChange}
              className={styles.textInpt}
            />
            <div className={styles.btns}>
              <button onClick={handlePrevQuestion} className={styles.backBtn}>
                Back
              </button>
              <button
                onClick={() => handleAnswerSelection(answers[getTruncatedKey(englishq[currentQuestion].question)], questionData.nextQuestion)}
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
                    const questionKey = getTruncatedKey(englishq[currentQuestion].question);
                    const selectedAnswers = answers[questionKey] || [];
                    if (e.target.checked) {
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [questionKey]: [...selectedAnswers, option.answer],
                      }));
                    } else {
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [questionKey]: selectedAnswers.filter((a) => a !== option.answer),
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
                onClick={() => handleAnswerSelection(answers[getTruncatedKey(englishq[currentQuestion].question)], questionData.nextQuestion)}
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
                          checked={answers[getTruncatedKey(englishq[currentQuestion].question)]?.[rowIndex] === column.value}
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
                onClick={() => handleAnswerSelection(answers[getTruncatedKey(englishq[currentQuestion].question)], questionData.nextQuestion)}
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