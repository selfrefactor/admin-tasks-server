import {log} from 'helpers-fn'
import {pascalCase} from 'string-fn'
import {nextIndex, shuffle} from 'rambdax'
import {readJsonSync, outputJsonSync} from 'fs-extra'

const darkModeEnv = process.env.NIKETA_DARK === 'ON'

const advanced = [
  'advanced.bat',
  'advanced.cat',
  'advanced.dog',
  'advanced.engine',
  'advanced.hook',
  'advanced.immigrant',
  'advanced.mystery',
]
const brave = [
  'brave.habits',
  'brave.homer',
  'brave.love',
  'brave.neighbour',
]
const circus = [
  'circus.ajax',
  'circus.brother',
  'circus.people',
  'circus.whisky',
]
const niketa = ['niketa.owl', 'niketa.bear', 'niketa.moon']

const american = ['american.alien', 'american.dad', 'american.spy']
const hunger = ['hunger.force', 'hunger.shake', 'hunger.epiphany']
const south = ['south.park', 'south.tegridy', 'south.authority']

const allLightThemes = shuffle([...advanced, ...brave, ...circus, ...niketa])
const allDarkThemes = shuffle([...american, ...south, ...hunger])

const {HOME} = process.env
const stable = `${HOME}/.config/Code/User/settings.json`
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`

function changeTheme(newTheme: string) {
  [stable, insiders].forEach(path => {
    const content = readJsonSync(path)
    content['workbench.colorTheme'] = newTheme

    outputJsonSync(path, content, {spaces: 2})
  })
}

let themeIndex = -1
export async function niketaTheme() {
  const currentThemes = darkModeEnv ? allDarkThemes : allLightThemes
  const newThemeIndex = nextIndex(themeIndex, currentThemes)
  const currentTheme = pascalCase(currentThemes[newThemeIndex])

  changeTheme(currentTheme)
  themeIndex = newThemeIndex
  log(currentTheme, 'box')
}
