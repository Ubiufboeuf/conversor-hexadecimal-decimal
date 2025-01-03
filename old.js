const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

const $inp_hex = $("#inp-hex"), $$inp_hex = $$(".inp-hex")
const [inp_hex_red, inp_hex_green, inp_hex_blue] = [...$$inp_hex].map(inp => inp)

const $span_dec = $("#span-dec"),
 $span_dec_red = $("#span-dec-r"),
 $span_dec_green = $("#span-dec-g"),
 $span_dec_blue = $("#span-dec-b")

const $inp_dec = $("#inp-dec"), $$inp_dec = $$(".inp-dec")
const [inp_dec_red, inp_dec_green, inp_dec_blue] = [...$$inp_dec].map(inp => inp)

const $span_hex = $("#span-hex"),
  $span_hex_red = $("#span-hex-r"),
  $span_hex_green = $("#span-hex-g"),
  $span_hex_blue = $("#span-hex-b")

const colors = {
  hex: { r: 0, g: 0, b: 0, },
  dec: { r: 0, g: 0, b: 0, },
}

console.log("ff: ", parseInt("ff", 16))
const x = 255
console.log("255: ", x.toString(16))

$inp_hex.addEventListener("keydown", (e) => e.key === "Enter" && handleInpHex(e))
$inp_hex.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    inp_hex_red.value = ""
    inp_hex_green.value = ""
    inp_hex_blue.value = ""
    colors.hex.r = 0
    colors.hex.g = 0
    colors.hex.b = 0
    updateResults()
  }
})
$inp_dec.addEventListener("keydown", (e) => e.key === "Enter" && handleInpDec(e))
$inp_dec.addEventListener("keydown", (e) => e.key === "Enter" && handleInpDec(e))
$$inp_hex.forEach(inp => inp.addEventListener("input", () => handleInputHex(inp)))
$$inp_dec.forEach(inp => inp.addEventListener("input", () => handleInputDec(inp)))

function handleInpHex(e) {
  const val = e.target.value
  const len = val.length

  if (val === "") {

  } else if (len === 3) {
    inp_hex_red.value = val[0] + val[0]
    inp_hex_green.value = val[1] + val[1]
    inp_hex_blue.value = val[2] + val[2]
    colors.hex.r = parseInt(`${val[0]}${val[0]}`, 16)
    colors.hex.g = parseInt(`${val[1]}${val[1]}`, 16)
    colors.hex.b = parseInt(`${val[2]}${val[2]}`, 16)
  } else if (len === 6) {
    inp_hex_red.value = val[0] + val[1]
    inp_hex_green.value = val[2] + val[3]
    inp_hex_blue.value = val[4] + val[5]
    colors.hex.r = parseInt(`${val[0]}${val[1]}`, 16)
    colors.hex.g = parseInt(`${val[2]}${val[3]}`, 16)
    colors.hex.b = parseInt(`${val[4]}${val[5]}`, 16)
  }

  updateResults()
}

function handleInpDec(e) {

}

function handleInputHex(inp) {
  const color = inp.getAttribute("data-color")
  const val = inp.value
  const len = val.length

  if ((len > 2 || isNaN(parseInt(val, 16))) && val !== "") return

  const temp_color = val === "" ? 0 : val
  colors.hex[color] = parseInt(temp_color, 16)

  updateResults()
}

function handleInputDec(inp) {
  const color = inp.getAttribute("data-color")
  const val = inp.value
  const len = val.length

  if ((len > 3 || Number(val).toString(16).length > 2) && val !== "") return

  const temp_color = val === "" ? 0 : Number(val)
  colors.dec[color] = temp_color.toString(16)
  colors.dec[color] = colors.dec[color].split("", 2).join("")

  updateResults()
}

function updateResults() {
  $span_dec.textContent = `rgb(${colors.hex.r}, ${colors.hex.g}, ${colors.hex.b})`
  $span_dec_red.textContent = colors.hex.r
  $span_dec_green.textContent = colors.hex.g
  $span_dec_blue.textContent = colors.hex.b

  $span_hex.textContent = `#${colors.dec.r}${colors.dec.g}${colors.dec.b}`
  $span_hex_red.textContent = colors.dec.r
  $span_hex_green.textContent = colors.dec.g
  $span_hex_blue.textContent = colors.dec.b
}