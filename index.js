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



// // если комментариев нет - блок comments не отображается
// const commentArray = Array.from(document.getElementsByClassName('comment'));

// function showComments(comment) {
//   if (comment.innerText.trim().length > 0) {
//     comment.classList.add('show') 
//   } else {
//     comment.classList.remove('show') 
//   }
// }
// commentArray.forEach(showComments);

//////// - ФИЛЬТР МЕНЮ -

document.addEventListener('DOMContentLoaded', () => {
  
  const menuItems = document.querySelectorAll('.wrapper-menu-content');//макеты
  const openMenuButton = document.getElementById("openMenu");
  const menuList = document.getElementById("menuList");//<ul id="menuList">
  const menuListItems = document.querySelectorAll('#menuList li');
  


  // восстановление выбранного при загрузке страницы
  restoreSelectedFormat(); //  формат
  restoreSelectedPeriod(); //  период
  restoreSelectedMenu(); // вид меню 
  filterMenu(); // обновление фильтрации
  
  // открытие / закрытие меню
  function toggleMenu(forceClose = false) {
    const isActive = menuList.classList.contains('active');
    
    if (forceClose || isActive) {
      // закрытие 
      menuList.classList.remove('active');
      openMenuButton.classList.remove('active');

    } else {
      // открытие 
      menuList.classList.add('active');
      openMenuButton.classList.add('active');
    }
  }
  
  // клик по кнопке "Выберите"
  openMenuButton.addEventListener("click", () => toggleMenu());
  
  // закрытие меню при клике вне его
  document.addEventListener('mouseup', (e) => {
    if (!menuList.contains(e.target) && e.target !== openMenuButton) {
      toggleMenu(true);
    }
  });
  



  // показать / скрыть макеты
  function filterMenu() {
      // <div id="dropdown"> data-filter="basic"/"far-east"/"no-pork"/"pizza-bar"
      const selectedFilter = document.querySelector('#menuList li[data-selected]')?.dataset.filter || 'basic';
    
      // <form id="format"> "horizontal"/vertical
      const selectedFormat = document.querySelector('input[name="imgFormat"]:checked').value;
    
      // <form id="period"> "present"/previous
      const selectedPeriod = document.querySelector('input[name="period"]:checked').value;

      const verticalButton = document.getElementById('vertical');
        const horizontalOption = document.getElementById('horizontalOption');
        const horizontalButton = document.getElementById('horizontal');

      // отключение Горизонтального формата для Пицца-Бар
      if (selectedFilter === 'pizza-bar') {
        verticalButton.checked = true;
        horizontalOption.classList.add('disabled');
        horizontalButton.disabled = true; 
      } else {
        horizontalOption.classList.remove('disabled');
        horizontalButton.disabled = false;
      }

      menuItems.forEach(item => {
        //<div class="wrapper-menu-content"
        // data-type="basic"/"far-east"/"no-pork"/"pizza-bar"
        const itemType = item.dataset.type;
        // data-format="horizontal"/vertical
        const itemFormat = item.dataset.format;
        // data-period="present"/previous
        const itemPeriod = item.dataset.period;
        
          // показать меню в соотв. с выбранными параметрами
          if (itemType === selectedFilter && itemFormat === selectedFormat && itemPeriod === selectedPeriod) {
            item.style.display = 'block'; 
            
            // Черно-белый фильтр для макетов ПРЕДЫДУЩЕГО периода
            if (itemPeriod === 'previous') { 
              item.classList.add('previous');
            }
             
          } else if (selectedFilter === 'pizza-bar' && selectedFormat === 'horizontal' && itemPeriod === selectedPeriod) {
            filterMenu(); 
          }  else {
              item.style.display = 'none'; // скрыть элемент 
          }
          
      }); 

  }
  
  // DROPDOWN MENU
  // клик по пункту Базовое/ Дальневосточное/ Без свинины/ Пицца-бар
  menuListItems.forEach(item => {
    const itemTitle = item.dataset.title;
    const itemDescription = item.dataset.description;
    
    item.addEventListener('click', () => {
      saveSelectedMenu(item.dataset.filter);
      menuListItems.forEach(i => i.removeAttribute('data-selected'));
      item.setAttribute('data-selected', 'true');
      
      if (itemTitle) {
        openMenuButton.innerText = itemTitle; 
      } 
      
      filterMenu();
      toggleMenu(true); // закрытие меню после выбора
    });
  });
  // сохранение выбранногов localStorage
  function saveSelectedMenu(filter) {
    localStorage.setItem('selectedMenu', filter);
  }
  // восстановление выбранного из localStorage
  function restoreSelectedMenu() {
    const savedFilter = localStorage.getItem('selectedMenu');
    if (savedFilter) {
      const selectedItem = document.querySelector(`#menuList li[data-filter="${savedFilter}"]`);
      if (selectedItem) {
        // Устанавливаем атрибут data-selected
        menuListItems.forEach(item => item.removeAttribute('data-selected'));
        selectedItem.setAttribute('data-selected', 'true');

        // обновление текста кнопки и описания
        openMenuButton.innerText = selectedItem.dataset.title;
      }
    }
  }

  // Обработчик событий для радиокнопок формата и периода
    document.querySelectorAll('input[name="imgFormat"], input[name="period"]').forEach(input => {
      input.addEventListener('change', filterMenu);
  });
  
  filterMenu();
});


////////////////////////// Запоминание выборов ////////////

// Горизонтальный / Вертикальный формат
// сохранение выбранного в Local Storage
function saveSelectedFormat() {
  const selectedFormat = document.querySelector('input[name="imgFormat"]:checked');
  if (selectedFormat) {
      localStorage.setItem('selectedFormat', selectedFormat.value);
  }
}

// восстановление выбранного из Local Storage
function restoreSelectedFormat() {
  const savedFormat = localStorage.getItem('selectedFormat');
  if (savedFormat) {
      const radioButton = document.querySelector(`input[name="imgFormat"][value="${savedFormat}"]`);
      if (radioButton) {
          radioButton.checked = true;
      }
  }
}



// Нынешний / Предыдущий период 
// сохранение выбранного в Local Storage
function saveSelectedPeriod() {
  const selectedPeriod = document.querySelector('input[name="period"]:checked');
  if (selectedPeriod) {
      localStorage.setItem('selectedPeriod', selectedPeriod.value);
  }
}

// восстановление выбранного из Local Storage
function restoreSelectedPeriod() {
  const savedPeriod = localStorage.getItem('selectedPeriod');
  if (savedPeriod) {
      const radioButton = document.querySelector(`input[name="period"][value="${savedPeriod}"]`);
      if (radioButton) {
          radioButton.checked = true;
      }
  }
}

// сохранение выбранного при изменении
//.... Формат
const radioButtonsFormat = document.querySelectorAll('input[name="imgFormat"]');
radioButtonsFormat.forEach(radio => {
  radio.addEventListener('change', () => {
    saveSelectedFormat(); // сохранение выбранного формата
    filterMenu(); // обновление фильтрации при изменении
    console.log(radioButtonsFormat);
  });
});
//.... Период
const radioButtonsPeriod = document.querySelectorAll('input[name="period"]');
radioButtonsPeriod.forEach(radio => {
  radio.addEventListener('change', () => {
    saveSelectedPeriod(); // сохранение выбранного периода
    filterMenu(); // обновление фильтрации при изменении
    console.log(radioButtonsPeriod)
  });
});



