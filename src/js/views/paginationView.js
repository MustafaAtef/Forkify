import { RESULT_PER_PAGE } from '../config';
import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const pagBtn = e.target.closest('.pagination__btn');
      if (!pagBtn) return;
      const goToPage = +pagBtn.dataset.goTo;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    let totalPages = Math.ceil(this._data.result.length / RESULT_PER_PAGE);

    // page no 1 and there is no next page
    if (totalPages === 1) return '';
    // page no 1 and there are next pages

    if (this._data.currentPage === 1) {
      return `
       <button class="btn--inline pagination__btn pagination__btn--next" data-go-to='${
         this._data.currentPage + 1
       }'>
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    // last page
    if (this._data.currentPage === totalPages) {
      return `
        <button class="btn--inline pagination__btn pagination__btn--prev" data-go-to='${
          this._data.currentPage - 1
        }'>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
        </button>
        `;
    }

    // middle page
    return `
    <button class="btn--inline pagination__btn pagination__btn--next" data-go-to='${
      this._data.currentPage + 1
    }'>
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <button class="btn--inline pagination__btn pagination__btn--prev" data-go-to='${
          this._data.currentPage - 1
        }'>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.currentPage - 1}</span>
          </button>
    `;
  }
}

export default new PaginationView();

/**
 * <!-- <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> -->
 */
