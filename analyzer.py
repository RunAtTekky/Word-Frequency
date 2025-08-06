import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from collections import Counter
import re

try:
    nltk.data.find('tokenizers/punkt')
except nltk.downloader.DownloadError:
    nltk.download('punkt', quiet=True)

def get_stemmed_word_frequencies(text):
    """
    Cleans and tokenizes text, then returns a frequency count of stemmed words.
    """
    cleaned_text = re.sub(r'[^a-zA-Z\s]', '', text)
    lower_text = cleaned_text.lower()
    tokens = word_tokenize(lower_text)
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in tokens]
    frequency_counts = Counter(stemmed_words)
    return frequency_counts

