const txt = document.getElementById('txt_input');
const word_count = document.getElementById('word_cnt');

function get_word_cnt(content) {
	content = content.trim();
	if (content === "") return 0;
	return content.split(/\s+/).length;
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
