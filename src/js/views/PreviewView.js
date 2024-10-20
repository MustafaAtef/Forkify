import View from './view';

class PreviewView extends View {
  _generateMarkup() {
    const id = location.hash.slice(1);
    if (this._data.length === 0) this.renderMessage(this._message);
    return this._data.reduce((acc, cur) => {
      acc += `
        <li class="preview ">
            <a class="preview__link ${
              id === cur.id ? 'preview__link--active' : ''
            }" href="#${cur.id}">
              <figure class="preview__fig">
                <img src="${cur.image}" alt="${cur.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${cur.title}</h4>
                <p class="preview__publisher">${cur.publisher}</p>
                
              </div>
            </a>
          </li>
        `;
      return acc;
    }, '');
  }
}

export default PreviewView;
