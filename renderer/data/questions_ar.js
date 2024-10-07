const arabic = (multiselectRandomOpt) => ({
    0: {
      title: "مرحبًا بك في الاستطلاع غير المتصل بالإنترنت 2024",
      detail: "من المهم الاعتناء بالمريض، وأن يتبعه المريض، لكن ذلك سيحدث في وقت يكون فيه الكثير من العمل والألم. فبالنسبة لأدق التفاصيل، لا يجوز لأحد أن يمارس أي عمل إلا إذا استفاد منه بعض الشيء. ولا تغضب من الألم في التوبيخ في لذة يريد أن يكون من الألم شعرة على أمل أن لا يكون هناك تكاثر. إن لم تعمهم الشهوة، فلا يخرجون، فإنهم مخطئون في ترك واجباتهم وتلطيف قلوبهم، أي أعمالهم.",
      type: "intro",
      nextQuestion: 1
    },
    1: {
      question: "تحيات. هل ستكون على استعداد للمشاركة؟",
      type:"mcq",
      options: [
        { answer: "نعم", nextQuestion: 2 },
        { answer: "لا", nextQuestion: null },
      ]
    },
    2: {
      question: "حدد مكان المقابلة",
      type:"mcq",
      options : [
        { answer: "المكان 1", nextQuestion: 5 },
        { answer: "مكان 2", nextQuestion: 3 },
        { answer: "المكان 3", nextQuestion: 3 },
        { answer: "مكان 4", nextQuestion: 3 },
        { answer: "المركز 5", nextQuestion: 4 },
      ],
    },
    
    // mcq 
    3: {
      question: "أي حديقة هي؟",
      type:"mcq",
      options : [
        { answer: "بارك 1", nextQuestion: 5 },
        { answer: "بارك 2", nextQuestion: 5 },
        { answer: "بارك 3", nextQuestion: 5 },
        { answer: "بارك4", nextQuestion: 5 },
        { answer: "بارك 5", nextQuestion: 5 },
      ],
    },

    // mcq
    4: {
      question: "اسم الحدث",
      type:"mcq",
      options : [
        { answer: "الحدث 1", nextQuestion: 5 },
        { answer: "الحدث2", nextQuestion: 5 },
        { answer: "الحدث3", nextQuestion: 5 },
        { answer: "الحدث4", nextQuestion: 5 },
        { answer: "الحدث 5", nextQuestion: 5 },
      ],
    },

    // mcq
    5: {
      question: "هل تعمل (توظف) مع شركة XXX؟",
      type:"mcq",
      options : [
        { answer: "نعم", nextQuestion: 1000 },
        { answer: "لا", nextQuestion: 6 },
      ],
    },

    // mcq

    6: {
      question: "هل شاركت في أي استطلاع في المكان Y خلال الأسبوع الماضي؟ you participaهل شاركت في أي استطلاع في المكان Y خلال الأسبوع الماضي؟ted in any survey in place Y in the last one week",
      type:"mcq",
      options : [
        { answer: "نعم", nextQuestion: 1000 },
        { answer: "لا", nextQuestion: 7 },
      ],
    },

    // mcq

    7: {
      question: "إلى أي فئة عمرية تنتمي؟",
      type:"mcq",
      options : [
        { answer: "أقل من 18 سنة", nextQuestion: 1000 },
        { answer: "18-25", nextQuestion: 8 },
        { answer: "26-35", nextQuestion: 8 },
        { answer: "36-65", nextQuestion: 8 },
        { answer: "65 أو أكثر", nextQuestion: 8 },
      ],
    },

    // mcq
    8: {
      question: "هل أنت محلي أم زائر؟",
      type:"mcq",
      options : [
        { answer: "محلي", nextQuestion: 9 },
        { answer: "زائر", nextQuestion: 10 },
      ],
    },
    //rating

    9: {
      question: "في أي منطقة في مقاطعة YYY تعيش؟",
      type:"mcq",
      options:[
        { answer: "المنطقة 1", nextQuestion: 10},
        { answer: "المنطقة 2", nextQuestion: 10},
        { answer: "المنطقة 3", nextQuestion: 10},
        { answer: "المنطقة 4", nextQuestion: 10},
        { answer: "المنطقة 5", nextQuestion: 10},
        { answer: "المنطقة 6", nextQuestion: 10},
        { answer: "المنطقة 7", nextQuestion: 10},
        { answer: "المنطقة 8", nextQuestion: 10},
        { answer: "المنطقة 9", nextQuestion: 10},
        { answer: "المنطقة 10", nextQuestion: 10}
      ],
    },
    //mcq

    10: {
      question: "ما مدى احتمالية أن توصي بـ Place YYY لصديق أو أحد أفراد العائلة أو زميل؟ يمكنك اختيار أي رقم بين 0 و10، حيث أن الرقم 0 غير محتمل على الإطلاق والرقم 10 محتمل للغاية.",
      type: "rating",
      options : [
        { answer: 0, nextQuestion: 11 },
        { answer: 1, nextQuestion: 11 },
        { answer: 2, nextQuestion: 11 },
        { answer: 3, nextQuestion: 11 },
        { answer: 4, nextQuestion: 11 },
        { answer: 5, nextQuestion: 11 },
        { answer: 6, nextQuestion: 11 },
        { answer: 7, nextQuestion: 11 },
        { answer: 8, nextQuestion: 11 },
        { answer: 9, nextQuestion: 11 },
        { answer: 10, nextQuestion: 11 },
      ],
    },
    
    // mcq
    11: {
      question: "ما هو/كان الغرض من زيارتك إلى Place YYY؟",
      type:"mcq",
      options : [
        { answer: "عمل", nextQuestion: 12 },
        { answer: "فراغ", nextQuestion: 12 },
        { answer: "زيارة الأصدقاء/العائلة", nextQuestion: 12 },
        { answer: "آخر", nextQuestion: 11.1 },
      ],
    },

    //text
    11.1: {
      question: "يرجى التحديد",
      type: "text",
      nextQuestion: 12,
    },

    12: {
      question: "ما هي الأسباب أو التجارب التالية التي دفعتكم لزيارة Place YYY؟ يُرجى ترتيب الأسباب على النحو التالي: 3 أسباب، بدءًا من الأكثر أهمية.",
      type: "multi-select",
      options: [
        { answer: "كنت مهتمًا باكتشاف ما يقدمه Place YYY", id: 1 },
        { answer: "كنت حريصًا على تجربة المواقع التراثية في مكان YYY", id: 2 },
        { answer: "أردت المشاركة في أنشطة المغامرة المقدمة في Place YYY", id: 3 },
        { answer: "لقد جئت لحضور حفل موسيقي أو مهرجان في Place YYY", id: 4 },
        { answer: "كنت مهتمًا بالمشاركة في تجارب الفنون والحرف اليدوية في Place YYY", id: 5 },
        { answer: "لقد أتيت لحضور حدث رياضي أو مسابقة في Place YYY (ركوب الدراجات، البولو، وما إلى ذلك)", id: 6 },
        { answer: "لقد انجذبت إلى التجربة الطهوية في Place YYY (مطاعم راقية)", id: 7 },
        {answer: "لقد أتيت إلى Place YYY لتجربة التخييم", id: 8 },
      ],
      nextQuestion: 15,
    },

    // mcq
    13: {
      question: "ما هي وسيلة النقل التي استخدمتها للوصول إلى مكان YYY؟",
      type:"mcq",
      options : [
        { answer: "النقل الجوي (رحلة إلى مطار Place YYY)", nextQuestion: 14 },
        { answer: "النقل البري (الحافلات، السيارات، القطارات)", nextQuestion: 14 },
        { answer: "النقل البري والجوي", nextQuestion: 14 },
        { answer: "النقل البري والرحلات البحرية", nextQuestion: 14 },
        { answer: "النقل البحري والجوي", nextQuestion: 14 },
      ],
    },

    49: {
      question: "ما هو تقييمك للجولة التراثية 1؟",
      type:"rating",
      options : [
        { answer: 1, nextQuestion: 50 },
        { answer: 2, nextQuestion: 50 },
        { answer: 3, nextQuestion: 50 },
        { answer: 4, nextQuestion: 50 },
        { answer: 5, nextQuestion: 50 },
      ],
    },

    50: {
      question: "ما هو تقييمك لجولة التراث 2؟",
      type:"rating",
      options : [
        { answer: 1, nextQuestion: 51 },
        { answer: 2, nextQuestion: 51 },
        { answer: 3, nextQuestion: 51 },
        { answer: 4, nextQuestion: 51 },
        { answer: 5, nextQuestion: 51 },
      ],
    },

    51: {
      question: "ما هو تقييمك لجولة التراث 3؟",
      type:"rating",
      options : [
        { answer: 1, nextQuestion: 52 },
        { answer: 2, nextQuestion: 52 },
        { answer: 3, nextQuestion: 52 },
        { answer: 4, nextQuestion: 52 },
        { answer: 5, nextQuestion: 52 },
      ],
    },

    52: {
      question: "ما هو تقييمك للجولة التراثية 4؟",
      type:"rating",
      options : [
        { answer: 1, nextQuestion: 53 },
        { answer: 2, nextQuestion: 53 },
        { answer: 3, nextQuestion: 53 },
        { answer: 4, nextQuestion: 53 },
        { answer: 5, nextQuestion: 53 },
      ],
    },
    // rating
    53: {
      question: "ما هو تقييمك للجولة التراثية الخامسة؟",
      type:"rating",
      options : [
        { answer: 1, nextQuestion: 54 },
        { answer: 2, nextQuestion: 54 },
        { answer: 3, nextQuestion: 54 },
        { answer: 4, nextQuestion: 54 },
        { answer: 5, nextQuestion: 54 },
      ],
    },

    // multi-select-random
    54: {
      question: "أي من الجولات التراثية التالية في Place YYY قمت بالحجز أو المشاركة فيها خلال الشهر الحالي؟",
      type:"multi-select-random",
      options: [
        { answer: "جولة التراث 1", id: 1, nextQuestion: 56 },
        { answer: "جولة التراث 2", id: 2, nextQuestion: 56 },
        { answer: "جولة التراث 3", id: 3, nextQuestion: 56 },
        { answer: "جولة التراث 4", id: 4, nextQuestion: 56 },
        { answer: "جولة التراث 5", id: 5, nextQuestion: 56 },
      ],
    },
      //rating
      56:{
        question:"ما مدى احتمالية أن توصي بـ ${multiselect Random Opt} لصديق أو أحد أفراد العائلة أو زميل؟ يمكنك اختيار أي رقم بين 0 و10، حيث أن الرقم 0 غير محتمل على الإطلاق والرقم 10 محتمل للغاية.", 
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
      question: "تم إكمال النموذج! شكرًا لك على إجاباتك.",
      type: "complete",
    },
  });
  
  export default arabic;
  