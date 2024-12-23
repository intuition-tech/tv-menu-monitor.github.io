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

// видимость контента при фильтрации 
const toggleVisibility = (showElement, hideElement) => {
  showElement.classList.remove('hide'); // Показать элемент
  hideElement.classList.add('hide');    // Скрыть элемент
};

// Переключение формата (ветрикальные / горизонтальные)
const verticalButton = document.getElementById('vertical');
const horizontalButton = document.getElementById('horizontal');

verticalButton.addEventListener('change', () => {
  toggleVisibility(
    document.querySelector('.vertical'),
    document.querySelector('.horizontal')
  );
});
horizontalButton.addEventListener('change', () => {
  toggleVisibility(
    document.querySelector('.horizontal'),
    document.querySelector('.vertical')
  );
});


// Переключение на период (предыдущий / настоящий) 
// const previous = document.getElementById('previous');
// const present = document.getElementById('present');

// previous.addEventListener('change', () => {
//   toggleVisibility(
//     document.querySelector('.previous .vertical'),
//     document.querySelector('.present .vertical'),
//     console.log('prev')
//   );
// });
// present.addEventListener('change', () => {
//   toggleVisibility(
//     document.querySelector('.present .vertical'),
//     document.querySelector('.previous .vertical')
//   );
// });