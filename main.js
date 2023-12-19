let memos = JSON.parse(localStorage.getItem('memos'));
memos = memos ?? [];

const Editor = toastui.Editor;

const editor = new Editor({
  el: document.querySelector('#editor'),
  height: '300px',
  initialEditType: 'markdown',
  previewStyle: 'vertical',
  placeholder: '메모를 입력해 주세요.',
});

showMemo();
changeMode();

// 메모 추가하기
function addMemo() {
  const title = document.querySelector('.memo-title').value;
  const content = editor.getHTML();

  memos.push({ title, content });
  localStorage.setItem('memos', JSON.stringify(memos));

  showMemo();

  // 인풋값 초기화 해주기
  document.querySelector('.memo-title').value = '';
  editor.setHTML() = '';
}

// 메모 보여주기
function showMemo() {
  const memoList = document.querySelector('.memo-list');
  memoList.innerHTML = ''; // memoList 초기화해주기

  for (const memo of memos.reverse()) {
    const memoItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const memoTitle = document.createElement('h2');
    const memoContent = document.createElement('p');

    deleteBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
    memoTitle.textContent = memo.title;
    memoContent.innerHTML = memo.content;

    memoList.appendChild(memoItem);
    memoItem.appendChild(deleteBtn);
    memoItem.appendChild(memoTitle);
    memoItem.appendChild(memoContent);

    deleteBtn.addEventListener('click', (event) => {
      if (confirm('삭제 하시겠습니까?')) {
        memoItem.remove(event.target);
        memos.splice(event.target, 1);
        localStorage.setItem('memos', JSON.stringify(memos));
      }
    });

    allDelete();
  }
}

// 전체 삭제하기
function allDelete() {
  const deleteBtnContainer = document.querySelector('.delete-btn-container');
  const allDeleteBtn = document.createElement('button');
  allDeleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  if (memos.length === 1) {
    deleteBtnContainer.appendChild(allDeleteBtn);
    allDeleteBtn.addEventListener('click', () => {
      if (confirm('정말로 전체 삭제 하시겠습니까?')) {
        localStorage.clear();
        memos = [];
        deleteBtnContainer.removeChild(allDeleteBtn);
        showMemo();
      }
    });
  }
}

// dark-mode-toggle
function changeMode() {
  const toggleBtn = document.querySelector('.toggle');
  const body = document.body.classList;
  
  toggleBtn.addEventListener('click', () => {
      if (body.contains('dark-mode')) {
        body.remove('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        body.add('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
    },
    false
  );
}

