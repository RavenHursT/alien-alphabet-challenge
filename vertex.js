export default class Vertex {
  value
  inEdges = []
  outEdges = []
  visited = false
  constructor(value) {
    this.value = value
  }
  addIn(fromIndex) {
    this.inEdges.push(fromIndex)
  }
  addOut(toIndex) {
    this.outEdges.push(toIndex)
  }
}