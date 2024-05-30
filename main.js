"use strict";

import { getTodos, postTodo } from "./api.js";
import { renderTodo } from "./render.js";
import { formValidation } from "./formValidation.js";


  // получаем кнопку, buttonElement ссылается на элемент из DOM с id 'add-button'
  const buttonElement = document.getElementById('add-button');
  // получаем список комментариев, listElement ссылается на элемент из DOM с id 'list' 
  const listElement = document.getElementById('list');
  // получаем инпут ввода имени, nameTextElement ссылается на элемент из DOM с id 'name-text'
  const nameTextElement = document.getElementById('name-text');
  // получаем форму комментария, commentTextElement ссылается на элемент из DOM с id 'comment-form-text'
  const commentTextElement = document.getElementById('comment-form-text');

  let comments = [];

  // рендерится список комметариев из HTML
  const renderComments = () => {
    renderTodo(comments, listElement);
    initAddingRemoveLikes();
    replyToComment();
  };
  renderComments();

  listElement.textContent = 'Комментарии загружаются...';

  // Получение комментария с сервера
  function getComments() {
    getTodos().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            comment: comment.text,
            numberLiks: comment.likes,
            like: false,
            date: new Date(comment.date),
          };
        });
        comments = appComments;
        renderComments();
      });
  };
  getComments();

  // добавляем обработчик события на элемент - buttonElement (кнопку 'Написать')
  buttonElement.addEventListener('click', () => {

    formValidation(nameTextElement, commentTextElement);

    renderComments();

    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарий добавляется...';

    // Сохраняет новый комментарий на сервере
    postTodo({
      name: sanitize(nameTextElement.value),
      text: sanitize(commentTextElement.value),
    }).then((response) => {
        if (response.status === 400) {
          throw new Error('Имя должно содержать хотя бы 3 символа')
        }
        if (response.status === 500) {
          throw new Error('Сервер упал')
        }
        return response.json();
      })
      .then(() => {
        return getComments();
      })
      .then(() => {
        nameTextElement.value = '';
        commentTextElement.value = '';
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
      })
      .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        if (error.message === 'Имя должно содержать хотя бы 3 символа') {
          alert('Введите имя не менее трех символов')
        }
        if (error.message === 'Сервер упал') {
          alert('Сервер упал')
        } else {
          alert('Нет интернета, попробуйте попытку позже');
        }
      })
  });

  function initAddingRemoveLikes() {
    const addingRemoveLikes = document.querySelectorAll('.like-button');

    for (const addRemoveLike of addingRemoveLikes) {
      addRemoveLike.addEventListener('click', (e) => {
        e.stopPropagation();

        const index = addRemoveLike.dataset.index
        if (comments[index].like === false) {
          comments[index].numberLiks += 1;
        }
        if (comments[index].like === true) {
          comments[index].numberLiks -= 1;
        };
        comments[index].like = !comments[index].like
        renderComments(comments);
      });
    };
  };

  function replyToComment() {
    const commentsText = document.querySelectorAll('.comment'); // получаем комментарии
      commentsText.forEach((el, index) => {
        el.addEventListener('click', () => {
          commentTextElement.value =
            `QUOTE_BEGIN>${comments[index].name} \n ${comments[index].comment}QUOTE_END \n`
        });
      });
  };
  
  function sanitize(text) {
    return text
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("QUOTE_BEGIN", "</div>")
      .replaceAll("QUOTE_END", "</div>");
  };