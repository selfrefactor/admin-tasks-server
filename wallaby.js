const {envFn} = require('env-fn')
envFn('special')

module.exports = function(){
  return {
    files : [
      'tsconfig.json',
      'package.json',
      {
        pattern : 'src/**/*.ts',
        load    : false,
      },
      {
        pattern : 'src/**/*spec.ts',
        ignore  : true,
      },
      {
        pattern : 'libs/**/*.ts',
        load    : false,
      },
      {
        pattern : 'libs/**/*spec.ts',
        ignore  : true,
      },
      {
        pattern : 'test/**/*.ts',
        load    : false,
      },
      {
        pattern : 'test/**/*spec.ts',
        ignore  : true,
      },
      {
        pattern : 'lambdas/**/*.ts',
        load    : false,
      },
      {
        pattern : 'lambdas/**/*spec.ts',
        ignore  : true,
      },
    ],
    tests : [
      { pattern : 'libs/**/*spec.ts' },
      { pattern : 'src/**/*spec.ts' },
      { pattern : 'test/**/*spec.ts' },
      { pattern : 'lambdas/**/*spec.ts' },
    ],
    env           : { 
      type : 'node',
    },
    testFramework : 'jest',
    debug         : true,
  }
}
