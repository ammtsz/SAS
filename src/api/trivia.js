export const fetchQuestion = (difficulty, category, token) => {
  if (token) {
    return fetchWithToken(difficulty, category, token);
  } else {
    return getToken(difficulty, category);
  }
};

const fetchWithToken = (difficulty, category, token) => {
  return fetch(
    `https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${difficulty}&category=${category}&token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.response_code === 3 || json.response_code === 4) {
        return getToken(difficulty, category);
      } else {
        
        return {results: json.results[0], token};
      }
    });
};

const getToken = (difficulty, category) => {
  return fetch("https://opentdb.com/api_token.php?command=request")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return fetchWithToken(difficulty, category, json.token);
    });
};

export const fetchCategories = () => {
  return fetch(`https://opentdb.com/api_category.php`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.trivia_categories;
    });
};
