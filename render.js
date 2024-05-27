import { formatDate } from "./formatDate.js";

export function renderTodo (comments, listElement) {
     const commentsHTML = comments.map((commentMap, index) => {
        return `<li class="comment">
            <div class="comment-header">
              <div>${commentMap.name}</div>
              <div>${formatDate()}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${commentMap.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${commentMap.numberLiks}</span>
                <button class="like-button ${commentMap.like ? '-active-like' : ''}" data-index='${index}'></button>
              </div>
            </div>
          </li>`;
      }).join('');
      listElement.innerHTML = commentsHTML;
};