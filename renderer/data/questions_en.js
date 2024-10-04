const english = (multiselectRandomOpt) => ({

    // 0: {
    //   title: "Welcome to offline survey 2024",
    //   detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //   type: "intro",
    //   nextQuestion: 1
    // },
    // 1: {
    //   question: "Greetings. My name is ________. On behalf of the Company XXX, we are conducting a short survey among visitors and residents of Place YYY. The survey will take about 12-110 minutes to complete and will help us to serve you better. Would you be willing to participate?",
    //   type:"mcq",
    //   options: [
    //     { answer: "Yes", nextQuestion: 2 },
    //     { answer: "No", nextQuestion: null },
    //   ]
    // },
    // 2:{
    //   question: "How likely are you to recommend Place YYY to a friend, family member, or colleague? You can choose any number between 0 and 10, where 0 is not likely at all and 10 is extremely likely.",
    //   type: "rating",
    //   min: 0,
    //   max: 10,
    //   options : [
    //     { answer: 0, nextQuestion: 10 },
    //     { answer: 1, nextQuestion: 10 },
    //     { answer: 2, nextQuestion: 10 },
    //     { answer: 3, nextQuestion: 10 },
    //     { answer: 4, nextQuestion: 10 },
    //     { answer: 5, nextQuestion: 10 },
    //     { answer: 6, nextQuestion: 10 },
    //     { answer: 7, nextQuestion: 10 },
    //     { answer: 8, nextQuestion: 10 },
    //     { answer: 9, nextQuestion: 10 },
    //     { answer: 10, nextQuestion: 3 },
    //   ],
    // },
    // 3: {
    //   question: "What did you like most about Place YYY?",
    //   type: "text",
    //   nextQuestion: 4,
    // },
    //  4: {
    //   question: "Before arriving at Place YYY, which information sources did you use to gather information about Place YYY? Select as many as applicable.",
    //   type: "multi-select",
    //   options: [
    //     { answer: "Airline websites", id: 1 },
    //     { answer: "Hotel/accommodation website", id: 2 },
    //     { answer: "Newspapers / magazines / Print (Magazine, Newspaper, Guide books, other print)", id: 3 },
    //     { answer: "Online blogs", id: 4 },
    //     { answer: "Previous experience", id: 5 }
    //   ],
    //   nextQuestion: 5,
    // },
    // 5: {
    //   question: "How would you rate your experience at Place YYY Airport on each of the following aspects? Please rate on a scale of 1 to 5 where 5 means very satisfied and 1 means very dissatisfied. If you have not experienced a particular service or experience, you may select Not Applicable.",
    //   type: "matrix",
    //   columns: [
    //     { label: "Poor", value: 1 },
    //     { label: "Fair", value: 2 },
    //     { label: "Good", value: 3 },
    //     { label: "Very Good", value: 4 },
    //     { label: "Excellent", value: 5 },
    //     ],
    //     rows: [
    //       { label: "Cleanliness", value: 1 },
    //       { label: "Service", value: 2 },
    //       { label: "Food", value: 3 },
    //       { label: "Value for money", value: 4 },
    //       { label: "Overall", value: 5 },
    //       ],
    //       nextQuestion: 6,
    //   },
    //   6: {
    //     question: "Based on your previous selections, please choose the information sources you found most helpful. Select as many as applicable.",
    //     type: "multi-select-random",
    //     options: [
    //       { answer: "Airline websites", id: 1, nextQuestion: 10 }, // Example next question
    //       { answer: "Hotel/accommodation website", id: 2, nextQuestion: 9 },
    //       { answer: "Newspapers / magazines / Print", id: 3, nextQuestion: 10 },
    //       { answer: "Online blogs", id: 4, nextQuestion: 11 },
    //       { answer: "Previous experience", id: 5, nextQuestion: 12 }
    //     ],
    //     nextQuestion: 10, 
    //   },
    // 

    // questions for the survey

    // intro
    0: {
      title: "Welcome to offline survey 2024",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      type: "intro",
      nextQuestion: 1
    },

    // mcq question
    1: {
      question: "Greetings. My name is ________. On behalf of the Company XXX, we are conducting a short survey among visitors and residents of Place YYY. The survey will take about 12-110 minutes to complete and will help us to serve you better. Would you be willing to participate?",
      type:"mcq",
      options: [
        { answer: "Yes", nextQuestion: 2 },
        { answer: "No", nextQuestion: 54 },
      ]
    },

    // mcq question
    2: {
      question: "Select place of Interview",
      type:"mcq",
      options : [
        { answer: "Place 1", nextQuestion: 5 },
        { answer: "Place 2", nextQuestion: 2 },
        { answer: "Place 3", nextQuestion: 2 },
        { answer: "Place 4", nextQuestion: 2 },
        { answer: "Place 5", nextQuestion: 4 },
      ],
    },
    
    // mcq 
    3: {
      question: "Which Park is it",
      type:"mcq",
      options : [
        { answer: "Park1", nextQuestion: 5 },
        { answer: "Park2", nextQuestion: 5 },
        { answer: "Park3", nextQuestion: 5 },
        { answer: "Park4", nextQuestion: 5 },
        { answer: "Park5", nextQuestion: 5 },
      ],
    },

    // mcq
    4: {
      question: "Name of Event",
      type:"mcq",
      options : [
        { answer: "Event1", nextQuestion: 5 },
        { answer: "Event2", nextQuestion: 5 },
        { answer: "Event3", nextQuestion: 5 },
        { answer: "Event4", nextQuestion: 5 },
        { answer: "Event5", nextQuestion: 5 },
      ],
    },

    // mcq
    5: {
      question: "Are you working (employed) with company XXX?",
      type:"mcq",
      options : [
        { answer: "Yes", nextQuestion: 1000 },
        { answer: "No", nextQuestion: 6 },
      ],
    },

    // mcq

    6: {
      question: "Have you partipated in any survey in place Y in the last one week",
      type:"mcq",
      options : [
        { answer: "Yes", nextQuestion: 1000 },
        { answer: "No", nextQuestion: 7 },
      ],
    },

    // mcq

    7: {
      question: "Which of the following age group do you belong to?",
      type:"mcq",
      options : [
        { answer: "Under 18", nextQuestion: 1000 },
        { answer: "18-25", nextQuestion: 8 },
        { answer: "26-35", nextQuestion: 8 },
        { answer: "36-65", nextQuestion: 8 },
        { answer: "65 or Above", nextQuestion: 8 },
      ],
    },

    // mcq
    8: {
      question: "Are you a local or a visitor?",
      type:"mcq",
      options : [
        { answer: "Local", nextQuestion: 10 },
        { answer: "Visitor", nextQuestion: 10 },
      ],
    },
    //rating

    9: {
      question: "How likely are you to recommend Place YYY to a friend, family member, or colleague? You can choose any number between 0 and 10, where 0 is not likely at all and 10 is extremely likely.",
      type: "rating",
      options : [
        { answer: 0, nextQuestion: 12 },
        { answer: 1, nextQuestion: 12 },
        { answer: 2, nextQuestion: 12 },
        { answer: 3, nextQuestion: 12 },
        { answer: 4, nextQuestion: 12 },
        { answer: 5, nextQuestion: 12 },
        { answer: 6, nextQuestion: 12 },
        { answer: 7, nextQuestion: 12 },
        { answer: 8, nextQuestion: 12 },
        { answer: 9, nextQuestion: 12 },
        { answer: 10, nextQuestion: 12 },
      ],
    },
    
    // mcq
    10: {
      question: "What is/was the purpose of your visit to Place YYY?",
      type:"mcq",
      options : [
        { answer: "Business", nextQuestion: 11 },
        { answer: "Leisure", nextQuestion: 11 },
        { answer: "Visiting friends/family", nextQuestion: 11 },
        { answer: "Other", nextQuestion: 10.1 },
      ],
    },

    //text
    10.1: {
      question: "Please specify",
      type: "text",
      nextQuestion: 11,
    },

    11: {
      question: "Which of the following reasons or experiences motivated you to visit Place YYY? Please rank up to 3 reasons, starting with the most important.",
      type: "multi-select",
      options: [
        { answer: "I was curious to discover what Place YYY has to offer", id: 1 },
        { answer: "I was keen to experience the heritage sites at place YYY", id: 2 },
        { answer: "I wanted to participate in adventure activities offered at Place YYY", id: 3 },
        { answer: "I came to attend a concert or a festival in Place YYY", id: 4 },
        { answer: "I was interested in engaging with arts and crafts experiences in Place YYY", id: 5 },
        { answer: "I came to attend a sporting event or competition in Place YYY (cycling, polo, etc)", id: 6 },
        { answer: "I was attracted to the culinary experience in Place YYY (fine dining restaurants)", id: 7 },
        {answer: "I came to Place YYY for a camping experience", id: 8 },
      ],
      nextQuestion: 15,
    },

    // mcq
    12: {
      question: "What mode of transport did you use to get to Place YYY?",
      type:"mcq",
      options : [
        { answer: "Air transport (flight to Place YYY airport)", nextQuestion: 13 },
        { answer: "Road transport (bus, car, train)", nextQuestion: 13 },
        { answer: "Both road & air transport", nextQuestion: 13 },
        { answer: "Both cruise & road transport", nextQuestion: 13 },
        { answer: "Both cruise & air transport", nextQuestion: 13 },
      ],
    },

    // multi-select-random
    54: {
      question: "Which of the following heritage tours in Place YYY? have you booked or participated in, during the current month",
      type:"multi-select-random",
      options: [
        { answer: "Heritage Tour 1", id: 1, nextQuestion: 56 },
        { answer: "Heritage Tour 2", id: 2, nextQuestion: 56 },
        { answer: "Heritage Tour 3", id: 3, nextQuestion: 56 },
        { answer: "Heritage Tour 4", id: 4, nextQuestion: 56 },
        { answer: "Heritage Tour 5", id: 5, nextQuestion: 56 },
      ],
    },
      //rating
      56:{
        question:`How likely are you to recommend ${multiselectRandomOpt} to a friend, family member, or colleague? You can choose any number between 0 and 10, where 0 is not likely at all and 10 is extremely likely.`, 
        type: "rating",
        options : [
          { answer: 0, nextQuestion: 1000 },
          { answer: 1, nextQuestion: 1000 },
          { answer: 2, nextQuestion: 1000 },
          { answer: 3, nextQuestion: 1000 },
          { answer: 4, nextQuestion: 1000 },
          { answer: 5, nextQuestion: 1000 },
          { answer: 6, nextQuestion: 1000 },
          { answer: 7, nextQuestion: 1000 },
          { answer: 8, nextQuestion: 1000 },
          { answer: 9, nextQuestion: 1000 },
          { answer: 10, nextQuestion: 1000 },
        ],
      },
    1000: {
      question: "Form complete! Thank you for your answers.",
      type: "complete",
    },
  });
  
  export default english;
  