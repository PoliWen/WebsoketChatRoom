const commitTypes = [
  'feat',
  'fix',
  'perf',
  'style',
  'docs',
  'test',
  'refactor',
  'build',
  'ci',
  'chore',
  'revert',
  'wip',
  'workflow',
  'types'
]
const commitScopeTypes = ['web']

const typeRules = {
  rules: {
    'type-enum': [2, 'always', commitTypes],
    'scope-enum': [2, 'always', commitScopeTypes]
  }
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [0],
    'scope-empty': [2, 'never'],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'subject-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],
    'header-max-length': [0, 'always', 72],
    'type-enum': typeRules.rules['type-enum'],
    'scope-enum': typeRules.rules['scope-enum']
  }
}
