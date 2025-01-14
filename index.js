// скопировать название макета по клику 
const titlesArray = Array.from(document.getElementsByClassName('title'));

function copyTitle(title) {
  title.addEventListener('click', () => {
    const text = title.textContent;
    navigator.clipboard.writeText(text);
    title.innerText = 'Скопировано';
    setTimeout(() => {
      
      title.innerText = text; // надпись 'Скопировано' исчезает через 1 сек
    }, 450);
    
  });
}

titlesArray.forEach(copyTitle);



// видимость контента при фильтрации 
const toggleVisibility = (showElement, hideElement) => {
  showElement.classList.remove('hide'); // Показать элемент
  hideElement.classList.add('hide');    // Скрыть элемент
};

// Переключение формата (ветрикальные / горизонтальные)
// const verticalButton = document.getElementById('vertical');
// const horizontalButton = document.getElementById('horizontal');

// verticalButton.addEventListener('change', () => {
//   toggleVisibility(
//     document.querySelector('.vertical'),
//     document.querySelector('.horizontal')
//   );
// });
// horizontalButton.addEventListener('change', () => {
//   toggleVisibility(
//     document.querySelector('.horizontal'),
//     document.querySelector('.vertical')
//   );
// });











document.addEventListener('DOMContentLoaded', () => {
  
  const menuItems = document.querySelectorAll('.wrapper-menu-content');//макеты
  const openMenuButton = document.getElementById("openMenu");
  const menuList = document.getElementById("menuList");//<ul id="menuList">
  const menuListItems = document.querySelectorAll('#menuList li');
  const menuDescription = document.getElementById('menu-description');//<p id="menu-description">

  
  function toggleMenu(forceClose = false) {
    const isActive = menuList.classList.contains('active');
    
    if (forceClose || isActive) {
      // Закрываем меню
      menuList.classList.remove('active');
      openMenuButton.classList.remove('active');
      menuDescription.classList.add('active');

    } else {
      // Открываем меню
      menuList.classList.add('active');
      openMenuButton.classList.add('active');
      menuDescription.classList.add('hide');
    }
  }
  
  // клик по кнопке "Выберите"
  openMenuButton.addEventListener("click", () => toggleMenu());
  
  // Закрыть меню при клике вне его
  document.addEventListener('mouseup', (e) => {
    if (!menuList.contains(e.target) && e.target !== openMenuButton) {
      toggleMenu(true);
    }
  });
  



  // показать / скрыть макеты
  function filterMenu() {
      // <div id="dropdown"> data-filter="base"/"far-east"/"no-pork"/"pizza-bar"
      const selectedFilter = document.querySelector('#menuList li[data-selected]')?.dataset.filter || 'base';
    
      // <form id="format"> "horizontal"/vertical
      const selectedFormat = document.querySelector('input[name="imgFormat"]:checked').value;
    
      // <form id="period"> "present"/previous
      const selectedPeriod = document.querySelector('input[name="period"]:checked').value;
    
      menuItems.forEach(item => {
          //<div class="wrapper-menu-content"
          // data-type="base"/"far-east"/"no-pork"/"pizza-bar"
          const itemType = item.dataset.type;
          // data-format="horizontal"/vertical
          const itemFormat = item.dataset.format;
          // data-period="present"/previous
          const itemPeriod = item.dataset.period;
          

          // Проверяем соответствие выбранным параметрам
          if (itemType === selectedFilter && itemFormat === selectedFormat && itemPeriod === selectedPeriod) {
              item.style.display = 'block'; // Показываем элемент
              // menuDescription.classList.add('active');
          } else {
              item.style.display = 'none'; // Скрываем элемент 
              // menuDescription.classList.remove('active');
          }
          
      }); 
  }
  
  

  // клик по пункту Базовое/ Дальневосточное/ Без свинины/ Пицца-бар
  menuListItems.forEach(item => {
    const itemTitle = item.dataset.title;
    const itemDescription = item.dataset.description;
    
    item.addEventListener('click', () => {
        menuListItems.forEach(i => i.removeAttribute('data-selected'));
        item.setAttribute('data-selected', 'true');

        if (itemTitle) {
          openMenuButton.innerText = itemTitle;
          menuDescription.innerText = itemDescription;
          menuDescription.classList.remove('hide');
          
        } 
        filterMenu();
        toggleMenu(true); // Закрытие меню после выбора
    });
  });

  // Обработчик событий для радиокнопок формата и периода
    document.querySelectorAll('input[name="imgFormat"], input[name="period"]').forEach(input => {
      input.addEventListener('change', filterMenu);
  });
  
  

  filterMenu();
});
