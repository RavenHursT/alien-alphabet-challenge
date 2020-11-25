export const randInt = (min, max) => Math.floor(
  Math.random() * (
    Math.floor(max) - Math.ceil(min) + 1
  )
) + Math.ceil(min)


export const getPrintableASCII = () => {
  const s = []
  for (let i = 33; i <= 126; i++) {
    s.push(String.fromCharCode(i))
  }
  return s
}

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const findCharValue = (c, alphabet) => alphabet.findIndex(a => a === c) + 1

export const replaceAt = (words, i, word) =>
  [...words.slice(0,i), word, ...words.slice(i + 1)]

export const swap = (words, i1, i2) =>
  replaceAt(replaceAt(words, i1, words[i2]),i2,words[i1])

export const wordCompare = (w1, w2, alphabet) => {
  if(w1 === w2) {
    return 0
  }
  const shortestLen = Math.min(w1.length, w2.length)
  let i
  for (i = 0; i < shortestLen; i++) {
    if (w1[i] !== w2[i]) {
      break
    }
  }
  if (i + 1 === shortestLen && w1[i] === w2[i]) {
    return w2.length > w2.length ? -1 : 1
  }
  const c1Val = findCharValue(w1[i], alphabet)
  const c2Val = findCharValue(w2[i], alphabet)
  return c1Val < c2Val ?
    1 : -1
}


export const sortByAlphabet = (words, alphabet) => {
  //Selection sort
  for (let i = 0; i < words.length; i++) {
    for(let j = i + 1; j < words.length; j++) {
      if (wordCompare(words[i], words[j], alphabet) < 0) {
        words = swap(words, i, j)
      }
    }
  }
  return words;
}

export const generateDictionary = (dictLen, alphabet) => {
  const dictionary = []
  for (let i = 0; i < dictLen; i++) {
    const wordLen = randInt(3, 8)
    let word = ''
    for (let j = 0; j < wordLen; j++) {
      word = `${word}${alphabet[randInt(0, alphabet.length - 1)]}`
    }
    dictionary.push(word)
  }
  return dictionary
}