import { log } from 'helpers'
import { pascalCase } from 'string-fn'
import { nextIndex, switcher, maybe, shuffle } from 'rambdax'
import { existsSync } from 'fs'
import * as dayjs from 'dayjs'
import { readJsonSync, outputJsonSync } from 'fs-extra'

const darkModeEnv = process.env.NIKETA_DARK === 'ON'

const advanced = shuffle([
  'advanced.bat',
  'advanced.cat',
  'advanced.dog',
  'advanced.engine',
  'advanced.hook',
  'advanced.immigrant',
  'advanced.mystery',
])
const brave = shuffle([
  'brave.habits',
  'brave.homer',
  'brave.love',
  'brave.neighbour',
])
const circus = shuffle([
  'circus.ajax',
  'circus.brother',
  'circus.people',
  'circus.whisky',
])
const niketa = shuffle([ 'niketa.owl', 'niketa.bear', 'niketa.moon' ])

const american = [
  'american.alien',
  'american.dad',
  'american.spy',
]
const hunger = [ 'hunger.force', 'hunger.shake', 'hunger.epiphany' ]
const south = [ 'south.park', 'south.tegridy', 'south.authority' ]

const themesLight = [ ...advanced, ...brave, ...circus, ...niketa ]
const themesDark = shuffle([ ...american, ...south, ...hunger ])

function rangeFn(start, end, darkModeOverwrite = undefined){
  const darkModeToUse =
    darkModeOverwrite !== undefined ? darkModeOverwrite : darkModeEnv
  const themes = darkModeToUse ? themesDark : themesLight

  return themes.slice(start, end)
}

const mostOfLight = rangeFn(0, 15)
const allDarkThemes = rangeFn(0,themesDark.length)
const MODES_LIGHT = {
  evening       : rangeFn(13, themesLight.length),
  lateEvening   : rangeFn(13, themesLight.length),
  lateAfternoon : mostOfLight,
  afternoon     : mostOfLight,
  morning       : mostOfLight,
  lateMorning   : mostOfLight,
}

const MODES_DARK = {
  evening       : allDarkThemes,
  lateEvening   : allDarkThemes,
  lateAfternoon : allDarkThemes,
  afternoon     : allDarkThemes,
  morning       : allDarkThemes,
  lateMorning   : allDarkThemes,
}

const { HOME } = process.env
const stable = `${ HOME }/.config/Code/User/settings.json`
const insiders = `${ HOME }/.config/Code - Insiders/User/settings.json`

function changeTheme(newTheme){
  [ stable, insiders ]
    .filter(maybePath => existsSync(maybePath))
    .forEach(path => {
      const content = readJsonSync(path)
      content[ 'workbench.colorTheme' ] = newTheme

      outputJsonSync(path, content, { spaces : 2 })
    })
}

function getCurrentSet(MODES, mode){
  return MODES[ mode ]
}

let themeIndex = -1
export async function niketaTheme(){
  const hour = dayjs().hour()
  const mode = switcher(hour)
    .is(h => h > 22, 'lateEvening')
    .is(h => h > 19, 'evening')
    .is(h => h > 16, 'lateAfternoon')
    .is(h => h > 12, 'afternoon')
    .is(h => h > 10, 'lateMorning')
    .is(h => h > 5, 'morning')
    .default('evening')

  const MODES = maybe(
    darkModeEnv,
    MODES_DARK,
    MODES_LIGHT
  )
  const currentSet = getCurrentSet(MODES, mode)
  const newThemeIndex = nextIndex(themeIndex, currentSet)
  const currentTheme = pascalCase(currentSet[ newThemeIndex ])

  changeTheme(currentTheme)
  themeIndex = newThemeIndex
  log(currentTheme, 'box')
}
