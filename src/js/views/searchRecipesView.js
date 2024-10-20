class SearchRecipeView {
  _parentElement = document.querySelector('.search');

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._parentElement.querySelector('.search__field').value = '';
    return query;
  }
}

export default new SearchRecipeView();
