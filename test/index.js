//
// Test various meta tags on an mp3 and m4b file in samples/
//  includes embedding cover image and chapters
//

const tone = require('../index')

const mp3file = './samples/mp3.mp3'
const m4bfile = './samples/m4b.m4b'

async function tag(filepath, metaPayload) {
  const titleNum = (metaPayload.title || '').split(' ').pop()
  const trackNum = metaPayload.trackNumber || 0
  const narratorNum = (metaPayload.narrator || '').split(' ').pop()
  const composerNum = (metaPayload.title || '').split(' ').pop()

  const additionalTestField = (metaPayload.additionalFields || {}).test
  const testNum = (additionalTestField || '').split(' ').pop()

  const tagPayload = {
    Album: 'node-tone',
    Artist: 'advplyr',
    AlbumArtist: 'advplyr',
    Genre: 'abs',
    Comment: 'testing tone metadata comment',
    Description: 'testing tone metadata description',
    EncodingTool: 'audiobookshelf',
    RecordingDate: '2022-09-10',
    PublishingDate: '2022-09-11',
    Title: 'Test ' + (isNaN(titleNum) ? 1 : (Number(titleNum) + 1)),
    TrackNumber: (isNaN(trackNum) ? 1 : (Number(trackNum) + 1)),
    Narrator: 'Narrator ' + (isNaN(narratorNum) ? 1 : (Number(narratorNum) + 1)),
    Composer: 'Composer ' + (isNaN(composerNum) ? 1 : (Number(composerNum) + 1)),
    AdditionalFields: ['test=Test ' + + (isNaN(testNum) ? 1 : (Number(testNum) + 1))],
    CoverFile: './samples/AbsIcon.png',
    ChaptersFile: './samples/TestChapters.txt'
  }
  await tone.tag(filepath, tagPayload)
}

async function testfile(filepath) {
  console.log(`\n====== Testing File: ${filepath} ======`)
  var dumpPayload = await tone.dump(mp3file)
  await tag(mp3file, dumpPayload.meta)
  dumpPayload = await tone.dump(mp3file)
  if (dumpPayload.meta.embeddedPictures && dumpPayload.meta.embeddedPictures.length) dumpPayload.meta.embeddedPictures[0].data = '<Removed>'
  console.log(`Updated dump.meta=\n`, dumpPayload.meta)
}

async function test() {
  await testfile(m4bfile)
  await testfile(mp3file)
}
test()