/**
 * Module contains environment related application types.
 * @module shared/types/env
 */

// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly TEST_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}


