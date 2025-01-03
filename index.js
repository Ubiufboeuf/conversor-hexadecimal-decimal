const $input = document.querySelector('#input')
const $result = document.querySelector('#result')
const $convert = document.querySelector('#convert')
const $isColor = document.querySelector('#isColor')
const $isColorInput = document.querySelector('#isColor>input')
const $gradient = document.querySelector('#gradient')
const $base = document.querySelector('#base')
const test = document.createElement('label')

$convert.addEventListener('input', handleConvert)
$input.addEventListener('input', handleInput)
$isColor.addEventListener('input', handleIsColor)

let convert = 'toDecimal' // string
let isColor = false // boolean
let value // string | number

function handleConvert() {
  const input = $convert.children[1]
  const bg = (input.checked) ? '--bg: #036a' : '--bg: #063a'
  const rotation = (input.checked) ? '--rotation: 180deg' : '--rotation: 0deg'
  convert = (input.checked) ? 'toHexadecimal' : 'toDecimal'

  $gradient.setAttribute('style', bg)
  $base.setAttribute('style', rotation)
  changeInput()
  changePreview()
}

function handleInput(e) {
  value = e.target.value
  changePreview()
}

function handleIsColor() {
  isColor = $isColorInput.checked
  changePreview()
}

function changeInput() {
  let v = $input.value
  const vn = Number(v)
  v = convert === 'toDecimal' ? vn.toString(16) : parseInt(v, 16)
  $input.value = (!v || v == 0) ? '' : v
}

function changePreview() {
  let { value } = $input
  value = value.includes('#') ? value.replaceAll('#', '') : value
  value = value.includes(' ') ? value.replaceAll(' ', '') : value
  if (convert === 'toDecimal' && isColor) {
    $result.textContent = getValueForDecimalColor(value) ?? $result.textContent
  } else if (convert === 'toDecimal' && !isColor) {
    $result.textContent = parseInt(value, 16) || 4035
  } else if (convert === 'toHexadecimal' && isColor) {
    $result.textContent = `#${getValueForHexadecimalColor(value)}`
  } else if (convert === 'toHexadecimal' && !isColor) {
    $result.textContent = getValueForHexadecimalColor(value)
  }
}

function getValueForDecimalColor(value) {
  const len = `${value}`.length
  if (len > 8) return null
  if (len === 0) {
    return 'rgb(225, 144, 9)'
  }
  if (len === 1) {
    const rgb = parseInt(value, 16)
    return `rgb(${rgb}, ${rgb}, ${rgb})`
  }
  if (len === 2) {
    const rgb = parseInt(value[0], 16)
    const alpha = parseInt(value[1], 16)
    return `rgb(${rgb}, ${rgb}, ${rgb}, ${alpha})`
  }
  if (len === 3) {
    const r = parseInt(`${value[0]}${value[0]}`, 16),
          g = parseInt(`${value[1]}${value[1]}`, 16),
          b = parseInt(`${value[2]}${value[2]}`, 16)
    return `rgb(${r}, ${g}, ${b})`
  }
  if (len === 4) {
    const r = parseInt(`${value[0]}${value[0]}`, 16),
          g = parseInt(`${value[1]}${value[1]}`, 16),
          b = parseInt(`${value[2]}${value[2]}`, 16),
          a = parseInt(`${value[3]}${value[3]}`, 16)
    return `rgb(${r}, ${g}, ${b}, ${alpha(a)})`
  }
  if (len === 5) {
    const r = parseInt(`${value[0]}${value[0]}`, 16),
          g = parseInt(`${value[1]}${value[1]}`, 16),
          b = parseInt(`${value[2]}${value[2]}`, 16),
          a = parseInt(`${value[3]}${value[4]}`, 16)
    return `rgb(${r}, ${g}, ${b}, ${alpha(a)})`
  }
  if (len === 6) {
    const r = parseInt(`${value[0]}${value[1]}`, 16),
          g = parseInt(`${value[2]}${value[3]}`, 16),
          b = parseInt(`${value[4]}${value[5]}`, 16)
    return `rgb(${r}, ${g}, ${b})`
  }
  if (len === 7) {
    const r = parseInt(`${value[0]}${value[1]}`, 16),
          g = parseInt(`${value[2]}${value[3]}`, 16),
          b = parseInt(`${value[4]}${value[5]}`, 16),
          a = parseInt(`${value[6]}${value[6]}`, 16)
    return `rgb(${r}, ${g}, ${b}, ${alpha(a)})`
  }
  if (len === 8) {
    const r = parseInt(`${value[0]}${value[1]}`, 16),
          g = parseInt(`${value[2]}${value[3]}`, 16),
          b = parseInt(`${value[4]}${value[5]}`, 16),
          a = parseInt(`${value[6]}${value[7]}`, 16)
    return `rgb(${r}, ${g}, ${b}, ${alpha(a)})`
  }
}

function getValueForHexadecimalColor(value) {
  // const len = `${value}`.length
  const n = +value
  return n.toString(16)
  // JAJA, no, esto va a ser mucho más dificil que getValueForDecimalColor()
}

function alpha(a) {
  return Math.round((a / 255) * 1000) / 1000
}