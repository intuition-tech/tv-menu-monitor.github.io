// скопировать название макета по клику 
const titlesArray = Array.from(document.getElementsByClassName('title'));

function copyTitle(title) {
  title.addEventListener('click', () => {
    const text = title.textContent;
    navigator.clipboard.writeText(text);
    title.innerText = 'Скопировано';
    setTimeout(() => {
      
      title.innerText = text; // надпись 'Скопировано' исчезает через 1 сек
    }, 1000);
    
  });
}

titlesArray.forEach(copyTitle);
