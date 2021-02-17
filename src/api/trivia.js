let allCategoriesQuestions = {};

export const fetchCategories = () => {
  return fetch(`https://opentdb.com/api_category.php`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      fetchCategoriesQuestions(json.trivia_categories); //aplies only for OPTION 1
      return json.trivia_categories;
    });
};

export const fetchCategoriesQuestions = (categories) => {
  const dif = ["easy", "medium", "hard"];

  categories.forEach((category) => {
    const questions = {
      easy: [],
      medium: [],
      hard: [],
    };

    dif.forEach((difficulty) => {
      return fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category.id}`
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          questions[difficulty] = json.results;
        });
    });

    allCategoriesQuestions = {
      ...allCategoriesQuestions,
      [category.id]: {
        id: category.id,
        name: category.name,
        questions,
      },
    };
  });

  console.log(allCategoriesQuestions);
};

// OPTION 1: FETCH ALL POSSIBLE QUESTIONS FROM ALL CATEGORIES AT ONCE AND ALLOW THE USE OF THE APP OFFLINE
export const fetchQuestion = (difficulty, categoryId, token) => {

  const question = allCategoriesQuestions[categoryId].questions[difficulty][0]
  allCategoriesQuestions[categoryId].questions[difficulty].shift()

  return { results: question, token: null };
};

// OPTION 2: FETCH QUESTION ONE BY ONE (ON DEMAND)
// export const fetchQuestion = (difficulty, category, token) => {
//   if (token) {
//     return fetchWithToken(difficulty, category, token);
//   } else {
//     return getToken(difficulty, category);
//   }
// };

// const fetchWithToken = (difficulty, category, token) => {
//   return fetch(
//     `https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${difficulty}&category=${category}&token=${token}`
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => {
//       if (json.response_code === 3 || json.response_code === 4) {
//         return getToken(difficulty, category);
//       } else {
//         return { results: json.results[0], token };
//       }
//     });
// };

// const getToken = (difficulty, category) => {
//   return fetch("https://opentdb.com/api_token.php?command=request")
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => {
//       return fetchWithToken(difficulty, category, json.token);
//     });
// };
