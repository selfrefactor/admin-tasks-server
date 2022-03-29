import {pascalCase} from 'string-fn'
import {nextIndex, shuffle} from 'rambdax'
import {readJsonSync, outputJsonSync} from 'fs-extra'
import {existsSync} from 'fs'

const darkModeEnv = process.env.NIKETA_DARK === 'ON'
const mixModeEnv = process.env.NIKETA_MIX_MODE === 'ON'
const legacyLightMode = process.env.NIKETA_LEGACY_LIGHT_MODE === 'ON'

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
const lightThemesListLegacy = [
  'advanced.cat',
  'advanced.engine',
  'advanced.immigrant',
  'advanced.hook',
  'brave.habits',
  'brave.homer',
  'cicrus.ajax',
  'cicrus.owl',
  'cicrus.whisky',
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
const allLightThemes = shuffle(legacyLightMode ? lightThemesListLegacy :lightThemesList)
const allDarkThemes = shuffle(darkThemesList)

const {HOME} = process.env
const stable = `${HOME}/.config/Code/User/settings.json`
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`

function changeTheme(newStableTheme: string, newInsidersTheme: string) {
  [stable, insiders].forEach((path, i) => {
    if (!existsSync(path)) return
    const content = readJsonSync(path)
    content['workbench.colorTheme'] = i === 0 ? newStableTheme : newInsidersTheme

    outputJsonSync(path, content, {spaces: 2})
  })
}

function getCurrentThemes(){
  if(darkModeEnv) return [allDarkThemes,allDarkThemes]
  if(mixModeEnv) return [allDarkThemes,allLightThemes]

  return [allLightThemes, allLightThemes]
}

let themeIndex = -1
export async function niketaTheme() {
  const [stableThemes, insidersThemes] =  getCurrentThemes()
  const newThemeIndex = nextIndex(themeIndex, stableThemes)
  const currentStableTheme = pascalCase(stableThemes[newThemeIndex])
  const currentInsidersTheme = pascalCase(insidersThemes[newThemeIndex])

  changeTheme(currentStableTheme, currentInsidersTheme)
  themeIndex = newThemeIndex
}
