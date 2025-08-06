const txt = document.getElementById('txt_input');
const word_count = document.getElementById('word_cnt');
const freq_table = document.getElementById(('word-container'))

function create_frequency_table(word_list) {
	freq_table.innerHTML = "";
	word_list.sort((a, b) => b[1] - a[1]);
	const wordsToDisplay = Math.min(10, word_list.length);

	for (let i = 0; i < wordsToDisplay; i++) {
		const word = word_list[i][0];
		const freq = word_list[i][1];

		if (word === '') continue;

		const word_ele = document.createElement('div');
		word_ele.classList.add('word-freq');

		word_ele.innerHTML = `${word}: ${freq}`;
		// console.log(`${word}: ${freq}`);

		freq_table.appendChild(word_ele);
	}
}

function get_data_from_backend() {
	const data_list = Array();
	// console.log("Fetching data from backend");
	fetch('http://127.0.0.1:5000/analyze_text', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: txt.value })
	})
		.then(response => response.json())
		.then(data => {
			if (data.length === 0) {
				// console.log("No words found.")
				create_frequency_table(data);
			} else {
				create_frequency_table(data);
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});

	return data_list;
}

txt.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && event.ctrlKey) {
		event.preventDefault();
		get_data_from_backend();
	}
});

txt.addEventListener('input', () => {
	get_data_from_backend();
});

