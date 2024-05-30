export function formValidation(nameTextElement, commentTextElement) {
     // валидация формы ввода имени и комментария
     nameTextElement.classList.remove('error');
     commentTextElement.classList.remove('error');
 
     if (nameTextElement.value === '' && commentTextElement.value === '') {
       nameTextElement.classList.add('error');
       commentTextElement.classList.add('error');
       return;
     } else if (nameTextElement.value === '') {
       nameTextElement.classList.add('error');
       return;
     } else if (commentTextElement.value === '') {
       commentTextElement.classList.add('error');
       return;
     }
}