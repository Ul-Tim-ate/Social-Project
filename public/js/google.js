const googleButton = document.getElementById('google');

googleButton.addEventListener('click', async () => {
	let response = await fetch('http://localhost:4000/auth/google');
	console.log(response.text);
})
