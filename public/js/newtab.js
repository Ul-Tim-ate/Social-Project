document.addEventListener("DOMContentLoaded", () => {
	const collected = document.getElementsByClassName('collected');

	for (let index = 0; index < collected.length; index++) {
		collected[index].textContent = ++collected[index].textContent ;
	}
});