export const fetchCategories = () => {
  return fetch(`https://opentdb.com/api_category.php`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.trivia_categories;
    })
    .then((categories) => {
      return fetchAllCategoriesQuestions(categories);
    })
    .then((categoriesQuestions) => {
      return checkCategoryAvailability(categoriesQuestions);
    });
};

export const fetchAllCategoriesQuestions = async (categories) => {
  return await Promise.all(
    categories.map(async (category) => {
      return await fetchCategoryQuestions(category);
    })
  );
};

const fetchCategoryQuestions = async (category) => {
  const easy = await fetchDifficultyQuestions(8, "easy", category);
  const medium = await fetchDifficultyQuestions(10, "medium", category);
  const hard = await fetchDifficultyQuestions(8, "hard", category);

  return {
    id: category.id,
    name: category.name,
    questions: {
      easy: easy.results,
      medium: medium.results,
      hard: hard.results,
    },
    response_code:
      easy.response_code + medium.response_code + hard.response_code,
  };
};

const fetchDifficultyQuestions = async (amount, difficulty, category) => {
  let response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}&category=${category.id}`
  );
  let json = await response.json();
  let results = await json.results;
  let response_code = await json.response_code;
  return { results, response_code };
};

const checkCategoryAvailability = (categoriesQuestions) => {
  return categoriesQuestions
    .filter((category) => category.response_code === 0)
    .map((filteredCategory) => {
      return { id: filteredCategory.id, name: filteredCategory.name, questions: filteredCategory.questions };
    });
};
