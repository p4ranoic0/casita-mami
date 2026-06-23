import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Flat config para ESLint 9 (el repo es ESM: package.json -> "type": "module").
// Objetivo: devolver el lint a un estado funcional cubriendo el código React de
// `src/**` y `galeria/src/**`, sin reglas de estilo agresivas.
export default [
  // Artefactos de build y la copia del repo dentro de worktrees fuera del lint.
  { ignores: ['dist/**', 'dist-galeria/**', '.claude/**'] },

  // Reglas base recomendadas de ESLint para todo el JS/JSX del repo.
  js.configs.recommended,

  // Defaults de lenguaje: ESM + sintaxis moderna.
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
  },

  // Código de la app React (corre en el navegador).
  {
    files: ['src/**/*.{js,jsx}', 'galeria/src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      // JSX transform nuevo (vite-plugin-react): no exigir React en scope.
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // Proyecto JS sin PropTypes: evitamos ruido, no desactivamos reglas reales.
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Archivos de configuración y build: entorno Node (vite, vitest, postcss, tailwind…).
  {
    files: ['**/*.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Tests (Vitest, entorno Node).
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
