import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON, timeout } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    currentPage: -1,
  },
  bookmarks: [],
};

export const loadRecipe = async id => {
  const response = await Promise.race([
    getJSON(`${API_URL}/recipes/${id}`),
    timeout(5),
  ]);
  if (response.status === 'fail')
    throw new Error('There is no recipe with this Id!');
  const recipe = response.data.recipe;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    publisherUrl: recipe.source_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
  };
  state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)
    ? (state.recipe.isBookmarked = true)
    : (state.recipe.isBookmarked = false);
};

export const loadSearchRecipes = async query => {
  const response = await getJSON(`${API_URL}/recipes?search=${query}`);
  if (response.results === 0)
    throw new Error(
      `There are no "${query}" recipes! Try searching for other recipes.`
    );
  state.search.query = query;
  state.search.result = response.data.recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
    };
  });
  state.search.currentPage = 1;
  console.log(response);
};

export const getRecipesPaged = (page = state.search.currentPage) => {
  let start = (page - 1) * RESULT_PER_PAGE;
  let end = page * RESULT_PER_PAGE;
  state.search.currentPage = page;
  return state.search.result.slice(start, end);
};

export const updateServings = servings => {
  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity)
      ing.quantity = (servings / state.recipe.servings) * ing.quantity;
  });
  state.recipe.servings = servings;
};

export const addBookmark = () => {
  state.recipe.isBookmarked = true;
  state.bookmarks.push(state.recipe);
  saveBookmarkToLocalStorage();
};

export const removeBookmark = () => {
  state.recipe.isBookmarked = false;
  state.bookmarks.splice(
    state.bookmarks.findIndex(bookmark => bookmark.id === state.recipe.id),
    1
  );
  saveBookmarkToLocalStorage();
};

const saveBookmarkToLocalStorage = () => {
  localStorage.setItem('bookmarkedRecipes', JSON.stringify(state.bookmarks));
};

export const loadBookmarksFromLocalStorage = () => {
  if (localStorage.getItem('bookmarkedRecipes'))
    state.bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes'));
};
