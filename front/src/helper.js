// 単語帳用の配列を返す
export const getNewWords = (words) => {
  const title_words = words.map(title_word => { return { title: title_word.title } });
  const meaning_words = words.map(meaning_word => { return { title: meaning_word.meaning, meaning: meaning_word.meaning } });
  const length = title_words.length * 2 - 1;
  const new_words = [];
  for (let i = 0; i <= length; i++) {
    if (i % 2 === 0) {
      new_words.push({ id: i, title: title_words[i / 2].title, meaning: '' });
    } else {
      new_words.push({ id: i, title: meaning_words[(i - 1) / 2].title, meaning: meaning_words[(i - 1) / 2].meaning });
    }
  }
  return new_words
};

// 文字列に含まれる特殊文字をエスケープする
export const escapeStringRegexp = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }
  return string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
};
