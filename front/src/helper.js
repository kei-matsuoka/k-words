// 単語帳用の配列を返す
export const getNewWords = (data) => {
  const question_words = data.words.map(question_word => { return { title: question_word.question } });
  const answer_words = data.words.map(answer_word => { return { title: answer_word.answer, text: answer_word.text } });
  const length = question_words.length * 2 - 1;
  const new_words = [];
  for (let i = 0; i <= length; i++) {
    if (i % 2 === 0) {
      new_words.push({ id: i, title: question_words[i / 2].title, text: '' });
    } else {
      new_words.push({ id: i, title: answer_words[(i - 1) / 2].title, text: answer_words[(i - 1) / 2].text });
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
