const arabic = (multiselectRandomOpt) => ({
    0: {
      title: "Welcome to offline survey 2024",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      type: "intro",
      nextQuestion: 1
    },
    1: {
      question: "Arabic huehue Greetings. My name is ________. On behalf of the Company XXX, we are conducting a short survey among visitors and residents of Place YYY. The survey will take about 12-16 minutes to complete and will help us to serve you better. Would you be willing to participate?",
      type:"mcq",
      options: [
        { answer: "Yes", nextQuestion: 2 },
        { answer: "No", nextQuestion: null },
      ]
    },
    2:{
      question: "How likely are you to recommend Place YYY to a friend, family member, or colleague? You can choose any number between 0 and 10, where 0 is not likely at all and 10 is extremely likely.",
      type: "rating",
      min: 0,
      max: 10,
      options : [
        { answer: 0, nextQuestion: 6 },
        { answer: 1, nextQuestion: 6 },
        { answer: 2, nextQuestion: 6 },
        { answer: 3, nextQuestion: 6 },
        { answer: 4, nextQuestion: 6 },
        { answer: 5, nextQuestion: 6 },
        { answer: 6, nextQuestion: 6 },
        { answer: 7, nextQuestion: 6 },
        { answer: 8, nextQuestion: 6 },
        { answer: 9, nextQuestion: 6 },
        { answer: 10, nextQuestion: 3 },
      ],
    },
    3: {
      question: "What did you like most about Place YYY?",
      type: "text",
      nextQuestion: 4,
    },
     4: {
      question: "Before arriving at Place YYY, which information sources did you use to gather information about Place YYY? Select as many as applicable.",
      type: "multi-select",
      options: [
        { answer: "Airline websites", id: 1 },
        { answer: "Hotel/accommodation website", id: 2 },
        { answer: "Newspapers / magazines / Print (Magazine, Newspaper, Guide books, other print)", id: 3 },
        { answer: "Online blogs", id: 4 },
        { answer: "Previous experience", id: 5 }
      ],
      nextQuestion: 5,
    },
    5: {
      question: "How would you rate your experience at Place YYY Airport on each of the following aspects? Please rate on a scale of 1 to 5 where 5 means very satisfied and 1 means very dissatisfied. If you have not experienced a particular service or experience, you may select Not Applicable.",
      type: "matrix",
      columns: [
        { label: "Poor", value: 1 },
        { label: "Fair", value: 2 },
        { label: "Good", value: 3 },
        { label: "Very Good", value: 4 },
        { label: "Excellent", value: 5 },
        ],
        rows: [
          { label: "Cleanliness", value: 1 },
          { label: "Service", value: 2 },
          { label: "Food", value: 3 },
          { label: "Value for money", value: 4 },
          { label: "Overall", value: 5 },
          ],
          nextQuestion: 6,
      },
    6: {
      question: "Form complete! Thank you for your answers.",
      type: "complete",
    },
  });
  
  export default arabic;
  