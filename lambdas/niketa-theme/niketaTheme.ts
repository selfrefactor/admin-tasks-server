import {pascalCase, titleCase} from 'string-fn'
import {nextIndex, shuffle} from 'rambdax'
import {readJsonSync, outputJsonSync} from 'fs-extra'
import {existsSync} from 'fs'
import dayjs = require('dayjs')

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
]
const allLightThemes = shuffle(lightThemesList)
const allDarkThemes = shuffle(darkThemesList)

const {HOME} = process.env
const stable = `${HOME}/.config/Code/User/settings.json`
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`

function getIsDarkMode() {
  if(darkModeEnv) return true
  
  return !isBrightOutside()
}


function changeTheme(newStableTheme: string, newInsidersTheme: string) {
  ;[stable, insiders].forEach((path, i) => {
    if (!existsSync(path)) return
    const content = readJsonSync(path)
    const newTheme = i === 0 ? newStableTheme : newInsidersTheme
    content['workbench.colorTheme'] = newTheme
    let iconTheme = getIsDarkMode() ? 'catppuccin-mocha' : 'catppuccin-latte'
    content['workbench.iconTheme'] = iconTheme

    outputJsonSync(path, content, {spaces: 2})
  })
}

function isBrightOutside() {
  const currentHour = dayjs().hour()
  return currentHour >= 6 && currentHour <= 17
}

function getCurrentThemes() {
  return getIsDarkMode()
  ? [allDarkThemes, allDarkThemes]
  : [allLightThemes, allLightThemes]
}

function pascalCaseFn(x) {
  return x.includes('.') ? pascalCase(x) : titleCase(x)
}

let themeIndex = -1
export async function niketaTheme() {
  const [stableThemes, insidersThemes] = getCurrentThemes()
  const newThemeIndex = nextIndex(themeIndex, stableThemes)
  const currentStableTheme = pascalCaseFn(stableThemes[newThemeIndex])
  const currentInsidersTheme = pascalCaseFn(insidersThemes[newThemeIndex])

  changeTheme(currentStableTheme, currentInsidersTheme)
  themeIndex = newThemeIndex
}
