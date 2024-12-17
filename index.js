// копировать название макета по клику 

let title = document.getElementsByClassName('quote-text');


title.addEventListener('click', () => {
	let text = title.textContent;
  navigator.clipboard.writeText(text);
	alert(`Скопировано в буфер обмена`);
  title.innerText = 'Скопировано в буфер обмена';
});

// Дан массив с числами. Найдите сумму квадратных корней элементов этого массива.
// let arr = [1, 2, 8];

// function toSqrt(el) {
//   return (Math.sqrt(el))
// }
// arr.forEach(toSqrt);

// let arr2 = arr.map(toSqrt);
// // console.log(arr2);

// let sumOfSqrts = arr2.reduce((acc, el) => acc + el, 0);
// console.log(sumOfSqrts);
