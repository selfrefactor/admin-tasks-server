function validTime(time) {
  const [hh, mm] = time.split`:`.map(x => ({str: x, num: +x}))
  if (hh.num > 24 || hh.str.length !== 2) return false
  if (mm.num > 60 || mm.str.length !== 2) return false
  return true
}

test('valid time', () => {
  expect(validTime('25:51')).toBe(false)
  expect(validTime('24:51')).toBe(true)
  expect(validTime('23:51')).toBe(true)
  expect(validTime('02:51')).toBe(true)
  expect(validTime('00:51')).toBe(true)
})

function getProductOfDigits(input) {
  const x = `${input}`
  if (x.length === 1) return input

  return x.split``.reduce((prev, current) => prev * Number(current), 1)
}

function uniqueDigitProducts(input) {
  const products = input.map(getProductOfDigits)
  const uniqProducts = []
  products.forEach(x => {
    if (!uniqProducts.includes(x)) uniqProducts.push(x)
  })
  return uniqProducts.length
}

test('unique digit products', () => {
  const result = uniqueDigitProducts([2, 8, 121, 42, 222, 23])
  expect(result).toBe(3)
})

function calculateNumberScore(input) {
  const x = `${input}`.split``

  if (x.length === 1) return 0
  if (x.length === 2) return Math.abs(Number(x[0]) - Number(x[1]))
  const sorted = x.sort((a, b) => (a < b ? 1 : -1))

  return Math.abs(Number(sorted[0]) - Number(sorted[sorted.length - 1]))
}

function digitDifferenceSort(input) {
  return input
    .map((x, i) => ({x, i}))
    .sort((a, b) => {
      const scoreA = calculateNumberScore(a.x)
      const scoreB = calculateNumberScore(b.x)
      const direction = scoreA === scoreB ? a.i > b.i : scoreA < scoreB

      return direction ? -1 : 1
    })
    .map(({x}) => x)
}

test('calc num score', () => {
  expect(calculateNumberScore(7)).toBe(0)
  expect(calculateNumberScore(17)).toBe(6)
  expect(calculateNumberScore(71)).toBe(6)
  expect(calculateNumberScore(721)).toBe(6)
  expect(calculateNumberScore(217)).toBe(6)
})

test('happy', () => {
  const input = [152, 23, 7, 887, 243]
  const expected = [7, 887, 23, 243, 152]

  expect(digitDifferenceSort(input)).toEqual(expected)
})
