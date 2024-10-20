import PreviewView from './PreviewView';

class SearchResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _message = 'Start searching to explore the recipes !';
}

export default new SearchResultView();
