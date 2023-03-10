import {pascalCase, titleCase} from 'string-fn'
import {nextIndex, shuffle} from 'rambdax'
import {readJsonSync, outputJsonSync} from 'fs-extra'
import {existsSync} from 'fs'
import dayjs = require('dayjs')

const darkModeEnv = process.env.NIKETA_DARK === 'ON'
const mixModeEnv = process.env.NIKETA_MIX_MODE === 'ON'
const sunlightModeOffEnv = process.env.NIKETA_SUNLIGHT_MODE_OFF === 'ON'

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
  // 'kawaine theme',
  // 'luvia theme',
]
const allLightThemes = shuffle(lightThemesList)
const allDarkThemes = shuffle(darkThemesList)

const {HOME} = process.env
const stable = `${HOME}/.config/Code/User/settings.json`
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`

function changeTheme(newStableTheme: string, newInsidersTheme: string) {
  [stable, insiders].forEach((path, i) => {
    if (!existsSync(path)) return
    const content = readJsonSync(path)
    const newTheme = i === 0 ? newStableTheme : newInsidersTheme
    console.log(`newTheme`, newTheme, i)
    content['workbench.colorTheme'] = newTheme

    outputJsonSync(path, content, {spaces: 2})
  })
}

function isBrightOutside(){
  var currentHour = dayjs().hour() 
console.log(currentHour, `currentHour`)
  return currentHour > 8 && currentHour < 18
}

function getCurrentThemes(){
  if(sunlightModeOffEnv){
    if(darkModeEnv) return [allDarkThemes,allDarkThemes]
    if(mixModeEnv) return [allLightThemes, allDarkThemes]
  
    return [allLightThemes, allLightThemes]
  }
  return isBrightOutside() ? [allLightThemes, allLightThemes] : [allDarkThemes, allDarkThemes]
}

function pascalCaseFn(x){
  return x.includes('.') ? pascalCase(x) : titleCase(x)
}

let themeIndex = -1
export async function niketaTheme() {
  const [stableThemes, insidersThemes] =  getCurrentThemes()
  const newThemeIndex = nextIndex(themeIndex, stableThemes)
  const currentStableTheme = pascalCaseFn(stableThemes[newThemeIndex])
  const currentInsidersTheme = pascalCaseFn(insidersThemes[newThemeIndex])

  changeTheme(currentStableTheme, currentInsidersTheme)
  themeIndex = newThemeIndex
}
