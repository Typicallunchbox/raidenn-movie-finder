import useImageColor from 'use-image-color'

export function ColourPalette(url) {
  const { colors } = useImageColor(url, { cors: true, colors: 5 })
  console.log('COLOURS:', colors)
  return colors;
}
