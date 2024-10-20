import PreviewView from './PreviewView';

class BookmarkView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
}

export default new BookmarkView();
