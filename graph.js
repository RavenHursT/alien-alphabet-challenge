import Vertex from './vertex.js'

export default class Graph {
  vertices = {}

  constructor(words) {
    for (let i = 0; i < words.length - 1; i++) {
      const firstWord = words[i]
      const secondWord = words[i + 1]
      for (let j = 0; j < Math.min(firstWord.length, secondWord.length); j++) {
        const firstChar = firstWord[j]
        const secondChar = secondWord[j]
        if (firstChar !== secondChar) {
          const firstVert = this.vertices[firstChar] || new Vertex(firstChar)
          const secondVert = this.vertices[secondChar] || new Vertex(secondChar)

          firstVert.addOut(secondChar)
          if (firstVert.outEdges.length > 1) {
            firstVert.outEdges.sort(
              (a, b) => {
                  const aVert = this.vertices[a]
                  const bVert = this.vertices[b]
                  return aVert.inEdges.length > bVert.inEdges.length ?
                    1 :
                    bVert.inEdges.length > aVert.inEdges.length ?
                      -1 : 0
                }
            )
          }

          secondVert.addIn(firstChar)
          if (secondVert.inEdges.length > 1) {
            secondVert.inEdges.sort(
              (a, b) => {
                const aVert = this.vertices[a]
                const bVert = this.vertices[b]
                if (!aVert || !bVert) {
                  return 0
                }
                return aVert.outEdges.length > bVert.outEdges.length ?
                  1 :
                  bVert.outEdges.length > aVert.outEdges.length ?
                    -1 : 0
              }
            )
          }

          this.vertices[firstChar] = firstVert
          this.vertices[secondChar] = secondVert

          break
        }
      }
    }
  }

  get firstVertex () {
    return this.vertices[
      Object.keys(this.vertices).find(k => !this.vertices[k].inEdges.length)
      ]
  }

  get length() {
    return Object.keys(this.vertices).length
  }

  reset() {
    Object.keys(this.vertices).forEach(v => this.vertices[v].visited = false)
  }

  topologicalSort (current = this.firstVertex, result = []) {
    current.visited = true
    if (current.inEdges.length) {
      for (let i = 0; i < current.inEdges.length; i++) {
        if (!this.vertices[current.inEdges[i]].visited) {
          this.topologicalSort(this.vertices[current.inEdges[i]], result)
        }
      }
    }
    result.push(current.value)
    if (current.outEdges.length) {
      for (let i = 0; i < current.outEdges.length; i++) {
        if (!this.vertices[current.outEdges[i]].visited) {
          this.topologicalSort(this.vertices[current.outEdges[i]], result)
        }
      }
    }
    return result
  }
}
