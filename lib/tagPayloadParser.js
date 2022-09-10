const tagMap = {
  "Artist": "artist",
  "Album": "album",
  "AlbumArtist": "album-artist",
  "Comment": "comment",
  "Composer": "composer",
  "Conductor": "conductor",
  "Copyright": "copyright",
  "Description": "description",
  "DiscNumber": "disc-number",
  "DiscTotal": "disc-total",
  "EncodedBy": "encoded-by",
  "EncoderSettings": "encoder-settings",
  "EncodingTool": "encoding-tool",
  "Genre": "genre",
  "Group": "group",
  "ItunesCompilation": "itunes-compilation",
  "ItunesMediaType": "itunes-media-type",
  "ItunesPlayGap": "itunes-play-gap",
  "LongDescription": "long-description",
  "Part": "part",
  "Movement": "movement",
  "MovementName": "movement-name",
  "Narrator": "narrator",
  "OriginalAlbum": "original-album",
  "OriginalArtist": "original-artist",
  "Popularity": "popularity",
  "Publisher": "publisher",
  "PublishingDate": "publishing-date",
  "PurchaseDate": "purchase-date",
  "RecordingDate": "recording-date",
  "SortAlbum": "sort-album",
  "SortAlbumArtist": "sort-album-artist",
  "SortArtist": "sort-artist",
  "SortComposer": "sort-composer",
  "SortTitle": "sort-title",
  "Subtitle": "subtitle",
  "Title": "title",
  "TrackNumber": "track-number",
  "TrackTotal": "track-total",
  "AdditionalField": "additional-field",
  "ChaptersFile": "chapters-file",
  "CoverFile": "cover-file",
  "ToneJsonFile": "tone-json-file"
}

module.exports = (payload) => {
  const args = []
  for (const key in payload) {
    if (key === 'AdditionalFields') { // array of additional fields
      if (payload[key] && Array.isArray(payload[key])) {
        payload[key].forEach((keyValuePair) => {
          args.push('--meta-additional-field')
          args.push(keyValuePair)
        })
      } else {
        throw new Error('Error AdditionalFields must be an array')
      }
    } else if (tagMap[key]) {
      args.push(`--meta-${tagMap[key]}`)
      args.push(payload[key])
    }
  }
  return args
}