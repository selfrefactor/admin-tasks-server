/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const env_fn_1 = __webpack_require__(2);
env_fn_1.envFn('special');
const app_module_1 = __webpack_require__(3);
const cron_1 = __webpack_require__(15);
const ngrok_1 = __webpack_require__(24);
const constants_1 = __webpack_require__(6);
const PORT = process.env.PORT === undefined ? constants_1.DEFAULT_PORT : Number(process.env.PORT);
const DEV_MODE = process.env.DEV_MODE === 'ON';
async function bootstrap() {
    if (!DEV_MODE) {
        cron_1.cron();
        ngrok_1.ngrok();
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT, '0.0.0.0');
}
bootstrap();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("env-fn");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cat_controller_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const constants_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const mongoose_1 = __webpack_require__(9);
const word_profile_module_1 = __webpack_require__(10);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forRoot(constants_1.getMongoUrl()), word_profile_module_1.WordProfileModule],
        controllers: [cat_controller_1.CatController, app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
let CatController = class CatController {
    findAll() {
        return 'This action returns all cats';
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CatController.prototype, "findAll", null);
CatController = __decorate([
    common_1.Controller('cats')
], CatController);
exports.CatController = CatController;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PORT = 4042;
exports.MONGO_URL = process.env.MONGO_CONNECT_URL;
exports.getMongoUrl = () => {
    if (!exports.MONGO_URL)
        process.exit();
    return exports.MONGO_URL;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
let AppService = class AppService {
    getHello() {
        return 'Hello Foo';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const word_profile_controller_1 = __webpack_require__(11);
const word_profile_service_1 = __webpack_require__(12);
const mongoose_1 = __webpack_require__(9);
const schemas_1 = __webpack_require__(14);
let WordProfileModule = class WordProfileModule {
};
WordProfileModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'WordProfile', schema: schemas_1.WordProfileSchema }])],
        controllers: [word_profile_controller_1.WordProfileController],
        providers: [word_profile_service_1.WordProfileService],
    })
], WordProfileModule);
exports.WordProfileModule = WordProfileModule;
;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const word_profile_service_1 = __webpack_require__(12);
let WordProfileController = class WordProfileController {
    constructor(dbModel) {
        this.dbModel = dbModel;
    }
    async createInstance(toSave) {
        const saved = await this.dbModel.create(toSave);
        return saved;
    }
    async removeInstance(removeFilter) {
        const removed = await this.dbModel.remove(removeFilter);
        return `Removed document with id ${removed._id}`;
    }
    async fi() {
        return 'This action re1turns all 21';
    }
    async bar() {
        console.log(';fd');
        return 'sk';
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WordProfileController.prototype, "createInstance", null);
__decorate([
    common_1.Post('remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WordProfileController.prototype, "removeInstance", null);
__decorate([
    common_1.Get('read/:word'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WordProfileController.prototype, "fi", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WordProfileController.prototype, "bar", null);
WordProfileController = __decorate([
    common_1.Controller('word-profile'),
    __metadata("design:paramtypes", [word_profile_service_1.WordProfileService])
], WordProfileController);
exports.WordProfileController = WordProfileController;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(13);
const mongoose_2 = __webpack_require__(9);
let WordProfileService = class WordProfileService {
    constructor(wordProfileModel) {
        this.wordProfileModel = wordProfileModel;
    }
    async create(toCreate) {
        const createdWordProfile = new this.wordProfileModel(toCreate);
        const saved = createdWordProfile.save();
        console.log({ saved });
        return saved;
    }
    async remove(removeFilter) {
        const removed = await this.wordProfileModel.findOneAndRemove(removeFilter).exec();
        console.log({ removed });
        return removed;
    }
    async find(word) {
        const found = this.wordProfileModel.find({ word }).exec();
        console.log({ found });
        return found;
    }
    async findAll() {
        console.log(this.wordProfileModel);
        return this.wordProfileModel.find().exec();
    }
    sk() {
        console.log(12);
    }
};
WordProfileService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('WordProfile')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], WordProfileService);
exports.WordProfileService = WordProfileService;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(13);
const { Schema } = mongoose;
const relatedSchema = {
    type: Array,
    default: [],
};
const metaSchemaRaw = new Schema({
    definition: {
        type: Array,
        default: [],
    },
    translation: {
        type: Array,
        default: [],
    },
    nearAlphabetical: {
        type: Array,
        default: [],
    },
    contextMeaning: {
        type: Array,
        default: [],
    },
});
const metaSchema = {
    type: metaSchemaRaw,
    default: {},
};
exports.WordProfileSchema = new Schema({
    word: String,
    meta: metaSchema,
    timestamp: String,
    related: relatedSchema,
    exampleSentences: relatedSchema,
});
const LearnSmarterSchema = new Schema({
    id: String,
    deWord: String,
    enWord: String,
    bgWord: {
        type: String,
        default: '',
    },
    dePart: String,
    enPart: String,
    bgPart: {
        type: String,
        default: '',
    },
    altTag: String,
    imageSrc: {
        type: String,
        default: '',
    },
    imageSrcOrigin: {
        type: String,
        default: '',
    },
    deRelated: {
        type: Array,
        default: [],
    },
    enRelated: {
        type: Array,
        default: [],
    },
    bgRelated: {
        type: Array,
        default: [],
    },
    pcFlag: Boolean,
    updated: Number,
    timestamp: Number,
});
const FooSchema = new Schema({ word: String });
const WordProfileModel = mongoose.model('WordProfile', exports.WordProfileSchema);
const FooModel = mongoose.model('Foo', FooSchema);
const LearnSmarterModel = mongoose.model('LearnSmarter', LearnSmarterSchema);
const allModels = {
    learnSmarter: LearnSmarterModel,
    foo: FooModel,
    wordProfile: WordProfileModel,
};
function getCurrentModel(model = 'foo') {
    const currentModel = allModels[model];
    if (!currentModel)
        throw new Error(`model '${model}' is wrong`);
    return currentModel;
}
function save(input, model) {
    const CurrentModel = getCurrentModel(model);
    return new Promise((resolve, reject) => {
        const Instance = new CurrentModel(input);
        Instance.save((err, saveResult) => {
            if (err)
                return reject(err);
            resolve(saveResult);
        });
    });
}
exports.save = save;
function readWordProfile(word) {
    return new Promise(resolve => {
        WordProfileModel.findOne({ word }, (err, queryResult) => {
            if (err)
                return resolve(false);
            resolve(queryResult);
        });
    });
}
exports.readWordProfile = readWordProfile;
function readLearnSmarter(id) {
    return new Promise(resolve => {
        LearnSmarterModel.findOne({ id }, (err, queryResult) => {
            if (err)
                return resolve(false);
            resolve(queryResult);
        });
    });
}
exports.readLearnSmarter = readLearnSmarter;
function readAll(model) {
    const CurrentModel = getCurrentModel(model);
    return new Promise((resolve, reject) => {
        CurrentModel.find({}, (err, queryResult) => {
            if (err)
                return reject(err);
            resolve(queryResult);
        });
    });
}
exports.readAll = readAll;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = __webpack_require__(16);
const runEveryTick_1 = __webpack_require__(17);
const helpers_1 = __webpack_require__(18);
const LOCK_KEY = 'LOCK_KEY';
async function cron(everyMinutes = 1) {
    try {
        const tickInput = process.env.CRON === undefined ? everyMinutes : Number(process.env.CRON);
        const tick = Math.floor(tickInput * 60000);
        rambdax_1.ok(tick)(Number);
        rambdax_1.setter(LOCK_KEY, false);
        for (const i of rambdax_1.range(0, 1000)) {
            runEveryTick_1.runEveryTick(LOCK_KEY);
            helpers_1.log(`${i} | ${tickInput * i} minutes since start`, 'back');
            await rambdax_1.delay(tick);
            if (rambdax_1.getter(LOCK_KEY)) {
                helpers_1.log('runEveryTick is too slow for such interval', 'error');
                helpers_1.log(`SKIP loop - ${i}`, 'warning');
            }
        }
    }
    catch (e) {
        console.log(e, 'from cron');
    }
}
exports.cron = cron;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("rambdax");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = __webpack_require__(16);
const helpers_1 = __webpack_require__(18);
const niketaTheme_1 = __webpack_require__(19);
async function runEveryTick(lockKey) {
    if (rambdax_1.getter(lockKey)) {
        return helpers_1.log('Locked tick', 'error');
    }
    rambdax_1.setter(lockKey, true);
    await niketaTheme_1.niketaTheme();
    rambdax_1.setter(lockKey, false);
}
exports.runEveryTick = runEveryTick;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("helpers");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __webpack_require__(18);
const string_fn_1 = __webpack_require__(20);
const rambdax_1 = __webpack_require__(16);
const fs_1 = __webpack_require__(21);
const dayjs = __webpack_require__(22);
const fs_extra_1 = __webpack_require__(23);
const darkModeEnv = process.env.NIKETA_DARK === 'ON';
const advanced = rambdax_1.shuffle([
    'advanced.bat',
    'advanced.cat',
    'advanced.dog',
    'advanced.engine',
    'advanced.hook',
    'advanced.immigrant',
    'advanced.mystery',
]);
const brave = rambdax_1.shuffle([
    'brave.habits',
    'brave.homer',
    'brave.love',
    'brave.neighbour',
]);
const circus = rambdax_1.shuffle([
    'circus.ajax',
    'circus.brother',
    'circus.people',
    'circus.whisky',
]);
const niketa = rambdax_1.shuffle(['niketa.owl', 'niketa.bear', 'niketa.moon']);
const american = [
    'american.alien',
    'american.dad',
    'american.spy',
];
const hunger = ['hunger.force', 'hunger.shake', 'hunger.epiphany'];
const south = ['south.park', 'south.tegridy', 'south.authority'];
const themesLight = [...advanced, ...brave, ...circus, ...niketa];
const themesDark = rambdax_1.shuffle([...american, ...south, ...hunger]);
function rangeFn(start, end, darkModeOverwrite = undefined) {
    const darkModeToUse = darkModeOverwrite !== undefined ? darkModeOverwrite : darkModeEnv;
    const themes = darkModeToUse ? themesDark : themesLight;
    return themes.slice(start, end);
}
const MODES_LIGHT = {
    evening: rangeFn(13, themesLight.length),
    lateEvening: rangeFn(13, themesLight.length),
    lateAfternoon: rangeFn(11, 15),
    afternoon: rangeFn(8, 15),
    morning: rangeFn(0, 6),
    lateMorning: rangeFn(0, 10),
};
const MODES_DARK = {
    evening: rangeFn(0, themesDark.length),
    lateEvening: rangeFn(0, themesDark.length),
    lateAfternoon: rangeFn(0, themesDark.length),
    afternoon: rangeFn(0, themesDark.length),
    morning: rangeFn(0, themesDark.length),
    lateMorning: rangeFn(0, themesDark.length),
};
const { HOME } = process.env;
const stable = `${HOME}/.config/Code/User/settings.json`;
const insiders = `${HOME}/.config/Code - Insiders/User/settings.json`;
function changeTheme(newTheme) {
    [stable, insiders]
        .filter(maybePath => fs_1.existsSync(maybePath))
        .forEach(path => {
        const content = fs_extra_1.readJsonSync(path);
        content['workbench.colorTheme'] = newTheme;
        fs_extra_1.outputJsonSync(path, content, { spaces: 2 });
    });
}
function getCurrentSet(MODES, mode) {
    return MODES[mode];
}
let themeIndex = -1;
async function niketaTheme() {
    const hour = dayjs().hour();
    const mode = rambdax_1.switcher(hour)
        .is(h => h > 22, 'lateEvening')
        .is(h => h > 19, 'evening')
        .is(h => h > 16, 'lateAfternoon')
        .is(h => h > 12, 'afternoon')
        .is(h => h > 10, 'lateMorning')
        .is(h => h > 5, 'morning')
        .default('evening');
    const MODES = rambdax_1.maybe(darkModeEnv, MODES_DARK, MODES_LIGHT);
    const currentSet = getCurrentSet(MODES, mode);
    const newThemeIndex = rambdax_1.nextIndex(themeIndex, currentSet);
    const currentTheme = string_fn_1.pascalCase(currentSet[newThemeIndex]);
    changeTheme(currentTheme);
    themeIndex = newThemeIndex;
    helpers_1.log(currentTheme, 'box');
}
exports.niketaTheme = niketaTheme;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("string-fn");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("dayjs");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ngrokLib = __webpack_require__(25);
const constants_1 = __webpack_require__(6);
exports.ngrok = async (port = constants_1.DEFAULT_PORT) => {
    const token = process.env.NGROK_TOKEN;
    if (!token)
        return console.log('!token', token);
    const url = await ngrokLib.connect({
        addr: port,
        subdomain: 'toteff',
        authtoken: token,
        region: 'eu',
        onStatusChange: status => {
            console.log({ status, label: 'ngrok' });
        },
    });
    console.log(url);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("ngrok");

/***/ })
/******/ ]);