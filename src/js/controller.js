import * as RecipeModel from './model';
import BookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import RecipeView from './views/recipeView';
import SearchRecipeView from './views/searchRecipesView';
import SearchResultView from './views/searchResultsView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async (mood = 'load') => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      RecipeModel.loadBookmarksFromLocalStorage();
      BookmarkView.render(RecipeModel.state.bookmarks);
      return;
    }
    RecipeView.renderSpinner();
    await RecipeModel.loadRecipe(id);
    RecipeView.render(RecipeModel.state.recipe);
    SearchResultView.update(RecipeModel.getRecipesPaged());
    RecipeModel.loadBookmarksFromLocalStorage();
    if (mood === 'load') BookmarkView.render(RecipeModel.state.bookmarks);
    BookmarkView.update(RecipeModel.state.bookmarks);
  } catch (err) {
    RecipeView.renderError(err.message);
  }
};

const controlSearchRecipes = async () => {
  try {
    SearchResultView.renderSpinner();
    query = SearchRecipeView.getQuery();
    await RecipeModel.loadSearchRecipes(query);
    SearchResultView.render(RecipeModel.getRecipesPaged());
    paginationView.render(RecipeModel.state.search);
  } catch (err) {
    SearchResultView.renderError(err.message);
  }
};

const controlRecipesPagination = page => {
  SearchResultView.render(RecipeModel.getRecipesPaged(page));
  paginationView.render(RecipeModel.state.search);
};

const controlRecipeServings = servings => {
  if (servings < 1) return;
  RecipeModel.updateServings(servings);
  RecipeView.update(RecipeModel.state.recipe);
};

const controlBookmark = (mode = 'add') => {
  console.log(mode);
  if (mode === 'add') RecipeModel.addBookmark();
  else RecipeModel.removeBookmark();

  RecipeView.update(RecipeModel.state.recipe);
  // bookmark view render
  BookmarkView.render(RecipeModel.state.bookmarks);
};

(() => {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpadateServings(controlRecipeServings);
  RecipeView.addHandlerBookmark(controlBookmark);
  SearchRecipeView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerPagination(controlRecipesPagination);
})();
