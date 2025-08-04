const txt = document.getElementById('txt_input');
const word_count = document.getElementById('word_cnt');
const freq_table = document.getElementById(('word-container'))
const word_freq_map = new Map();

function find_frequency(word_list) {
	word_freq_map.clear();
	for (let word of word_list) {
		word = word.toLowerCase();

		if (word_freq_map.has(word)) {
			const sz = word_freq_map.get(word);
			word_freq_map.set(word, sz + 1);
		} else {
			word_freq_map.set(word, 1);
		}
	}
}

function create_frequency_table() {
	freq_table.innerHTML = "";
	const word_list = Array.from(word_freq_map.entries());

	word_list.sort((a, b) => b[1] - a[1]);

	const wordsToDisplay = Math.min(10, word_list.length);

	for (let i = 0; i < wordsToDisplay; i++) {
		const word_ele = document.createElement('div');
		word_ele.classList.add('word-freq');

		const word = word_list[i][0];
		const freq = word_list[i][1];
		word_ele.innerHTML = `${word}: ${freq}`;

		freq_table.appendChild(word_ele);
	}
}

function get_word_cnt(content) {
	content = content.trim();
	content = content.replace(/[^a-zA-Z ]/g, '');

	if (content === "") return 0;
	const word_list = content.split(/\s+/);

	find_frequency(word_list);
	create_frequency_table();

	return word_list.length;
}

function update_word_cnt() {
	const cnt = get_word_cnt(txt.value);
	console.log(cnt);
	word_count.innerHTML = cnt;
}

txt.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && event.ctrlKey) {
		event.preventDefault();
		update_word_cnt();
	}
});

txt.addEventListener('input', () => {
	update_word_cnt();
});
