# Node-Tone

Node wrapper for [tone](https://github.com/sandreas/tone)

**Requires tone binary to be installed**

## Installation

```bash
npm install node-tone
```

## Usage

```javascript
const tone = require('tone')

// optionally specify path to binary
tone.TONE_PATH = 'path/to/tone'

// Get metadata for file
tone.dump('path/to/audiofile.mp3').then((jsonDump) => {
   console.log(jsonDump)
})

// Write metadata for file
const metadataToWrite = {
   Title: "some title",
   Comment: "Hello World"
}
tone.tag('path/to/audiobook.m4b', metadataToWrite).then(() => {
   // Success
})
```
