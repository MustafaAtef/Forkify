import icons from '../../img/icons.svg';
export default class View {
  _data;
  render(data) {
    this._data = data;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkup()
    );
    console.dir();
  }

  update(data) {
    this._data = data;
    const newParentDom = Array.from(
      document
        .createRange()
        .createContextualFragment(this._generateMarkup())
        .querySelectorAll('*')
    );
    const oldParentDom = Array.from(this._parentElement.querySelectorAll('*'));
    newParentDom.forEach((newEl, idx) => {
      const oldEl = oldParentDom[idx];

      if (newEl.isEqualNode(oldEl)) return;

      if (
        newEl.childNodes?.length === 1 &&
        newEl.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        oldEl.textContent = newEl.textContent;
      }

      Array.from(newEl.attributes).forEach(attr =>
        oldEl.setAttribute(attr.name, attr.value)
      );
    });
  }

  renderSpinner() {
    const spinnerHtml = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
        `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerHtml);
  }

  renderError(msg) {
    const errorMsgHtml = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${msg}</p>
              </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', errorMsgHtml);
  }

  renderMessage(msg) {
    const messgaeHtml = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
          ${msg}
        </p>
      </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', messgaeHtml);
  }
}
