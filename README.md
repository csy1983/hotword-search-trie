# hotword-search-trie

Search hotwords by building a trie-like structure.

This module is originally created for hotword detection in a voice control application.

## Install

`npm install hotword-search-trie`

## Usage

```js
const HotwordSearchTrie = require('hotword-search-trie')

const hotwords = [
  'ok google',
  'hey google',
  'turn on air conditioning',
  'lights on',
  'play music',
  'stop',
  'volume up',
  'volume down'
]

const hstrie = new HotwordSearchTrie()

/* Build hotword search trie */
hstrie.build(hotwords)

/* Search for multiple hotwords */
hstrie.search('ok google, turn lights on and play some music please.')
// Returns: ['ok google', 'lights on', 'play music']

/* No hotword found */
hstrie.search('hey siri, sing me a song')
// Returns: []

/* Search hotwords across two dependent strings */
hstrie.search('hey google, turn on')
// Returns: ['hey google']
hstrie.search('air conditioning and play music')
// Returns: ['turn on air conditioning', 'play music']

/* Reset search position */
hstrie.search('hey google, turn on')
// Returns: ['hey google']
hstrie.resetSearch()
hstrie.search('air conditioning and play music')
// Returns: ['play music']

/* First come first serve */
hstrie.search('volume up and down')
// Returns: ['volume up']
```

# License

MIT