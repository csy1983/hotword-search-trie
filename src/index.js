class HotwordTrieNode {
  constructor (word) {
    this.word = word
    this.branches = {}
    this.completeHotword = ''
  }
}

class HotwordSearchTrie {
  constructor () {
    this.rootNode = new HotwordTrieNode()
    this.currNode = this.rootNode
  }

  build (hotwords = []) {
    trim(this.rootNode)

    hotwords.forEach((hotword) => {
      let node = this.rootNode

      extractWords(hotword.toLowerCase()).forEach((word) => {
        if (node.branches[word]) {
          node = node.branches[word]
        } else {
          node.branches[word] = new HotwordTrieNode(word)
          node = node.branches[word]
        }
      })

      if (node !== this.rootNode) {
        node.completeHotword = hotword
      }
    })
  }

  search (string) {
    const hotwords = []

    for (let word of extractWords(string.toLowerCase())) {
      if (this.currNode.branches[word]) {
        this.currNode = this.currNode.branches[word]
      } else if (this.rootNode.branches[word]) {
        this.currNode = this.rootNode.branches[word]
      } else {
        /* skip this word */
        continue
      }

      if (this.currNode.completeHotword) {
        hotwords.push(this.currNode.completeHotword)
      }
    }

    return hotwords
  }

  resetSearch () {
    this.currNode = this.rootNode
  }
}

module.exports = HotwordSearchTrie

function extractWords (string = '') {
  return string
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, ' ')
    .split(' ')
    .filter(word => word)
}

/* Trim all branches from given tree node */
function trim (node) {
  Object.keys(node.branches).forEach((word) => {
    const childNode = node.branches[word]
    trim(childNode)
    delete node.branches[word]
  })
}
