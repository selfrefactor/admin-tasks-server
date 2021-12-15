import {log} from 'helpers-fn'
import {pascalCase} from 'string-fn'
import {nextIndex, shuffle} from 'rambdax'
import {readJsonSync, outputJsonSync} from 'fs-extra'
import {existsSync} from 'fs'

const darkModeEnv = process.env.NIKETA_DARK === 'ON'

const lightThemesList = [
  'communication.breakdown',
  'dancing.days',
  'funky.drummer',
  'glass.onion',
  'hello.spaceboy',
  'kozmic.blues',
  'led.zeppelin',
  'strange.brew',
  'sweat.leaf',
]
const darkThemesList = [
  'american.dad',
  'aqua.teen.hunger.force',
  'archer',
  'cleveland.show',
  'home.movies',
  'dilbert',
  'south.park',
  'trip.tank',
  'ugly.americans',
  'Tokyo Night Pro'
]
const customThemes = [
  'Tokyo Night Pro'
]
const allLightThemes = shuffle(lightThemesList)
const allDarkThemes = shuffle(darkThemesList)

const {HOME} = process.env
const stable = `${HOME}/.config/Code/User/settings.json`
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`

function changeTheme(newTheme: string) {
  [stable].forEach(path => {
    if (!existsSync(path)) return
    const content = readJsonSync(path)
    content['workbench.colorTheme'] = newTheme

    outputJsonSync(path, content, {spaces: 2})
  })
}

let themeIndex = -1
export async function niketaTheme() {
  const currentThemes =   allLightThemes
  // const currentThemes = darkModeEnv ? allDarkThemes : allLightThemes
  const newThemeIndex = nextIndex(themeIndex, currentThemes)
  const currentTheme = customThemes.includes(currentThemes[newThemeIndex]) ? currentThemes[newThemeIndex] : pascalCase(currentThemes[newThemeIndex])

  changeTheme(currentTheme)
  themeIndex = newThemeIndex
  log(currentTheme, 'box')
}
