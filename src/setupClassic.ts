import {MonacoEditorLanguageClientWrapper, UserConfig} from 'monaco-editor-wrapper';
import {configureWorker, defineUserServices} from './setupCommon.js';
import monarchSyntax from "./syntaxes/dsl.monarch.js";

type Options = {
    code: string
};

export function setupConfigClassic(opts: Options): UserConfig {
    return {
        wrapperConfig: {
            serviceConfig: defineUserServices(),
            editorAppConfig: {
                $type: 'classic',
                languageId: 'dsl',
                code: opts.code,
                useDiffEditor: false,
                languageExtensionConfig: {id: 'langium'},
                languageDef: monarchSyntax,
                editorOptions: {
                    'semanticHighlighting.enabled': true,
                    theme: 'vs-dark',
                    lineNumbers: 'off',
                    glyphMargin: false,
                    lineDecorationsWidth: 0,
                    minimap: {
                        enabled: false,
                    }
                }
            }
        },
        languageClientConfig: configureWorker()
    };
}

export interface DslEditorInstance {
    dispose(): Promise<void>;
}

export async function executeClassic(htmlElement: HTMLElement, options:Options): Promise<DslEditorInstance> {
    const userConfig = setupConfigClassic(options);
    const wrapper = new MonacoEditorLanguageClientWrapper();
    await wrapper.initAndStart(userConfig, htmlElement);
    return wrapper;
}
