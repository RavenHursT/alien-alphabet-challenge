
import Graph from './graph.js'
import {
  randInt,
  shuffleArray,
  getPrintableASCII,
  sortByAlphabet,
  generateDictionary
} from './util.js'
import chalk from 'chalk'

//some simple examples
const dictionaries = [
  ["baa", "abcd", "abca", "cab", "cad"],
  ["baa", "abed", "abcd", "abca", "cab", "cad"],
  ["baa", "baf", "abed", "abcd", "abca", "cab", "cad"]
]

dictionaries.forEach(dictionary => {
  console.log(`dictionary => `, dictionary)
  const g = new Graph(dictionary)

  console.dir(g, {colors:true, depth: 4})
  g.reset()
  console.log(`dictionary => g.topologicalSort() => `, g.topologicalSort())
})

// A more complex example that verifies derived alphabet order from a generated "alien"
// alphabet and a sorted dictionary of "words" generated from the given alphabet.
const expectedAlphabetOrder = shuffleArray(getPrintableASCII())
console.log(`expectedAlphabetOrder => `, expectedAlphabetOrder)

const dictionary = generateDictionary(randInt(5, 15), expectedAlphabetOrder)
console.log('unsorted =>')
console.dir(dictionary)

const sortedDictionary = sortByAlphabet(dictionary, expectedAlphabetOrder)
console.log('sorted =>')
console.dir(sortedDictionary)

const g = new Graph(sortedDictionary)
console.dir(g, {colors:true, depth: 4})
g.reset()
const topSort = g.topologicalSort()
console.log(`topSort => `, topSort)

const filtered = expectedAlphabetOrder.filter(c => topSort.includes(c))
console.log(`filtered => `, filtered)

if (topSort.join('') !== filtered.join('')) {
  throw(new Error('resultant alphabet order did not match given alphabet order!'))
}
console.log(chalk.greenBright.bold('\nDerived order matches Expected order! ☺️'))
