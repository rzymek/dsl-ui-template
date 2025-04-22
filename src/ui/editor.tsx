import {configureMonacoWorkers} from "../setupCommon.js"
import {DslEditorInstance, executeClassic} from "../setupClassic.js"
import {useEffect, useRef} from "preact/hooks"

configureMonacoWorkers()

export function DslEditor(props: { children: string, onChange(value: string): void, importMetaUrl: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const wrapper = useRef<Promise<DslEditorInstance>>(null)
    useEffect(() => {
        (async () => {
            if (!ref.current) return
            wrapper.current = executeClassic(ref.current, {
                code: props.children,
                onChange: props.onChange,
            })
        })()
        return () => {
            wrapper.current?.then(i => i.dispose())
        }
    }, [props.children])
    return <div ref={ref}
                style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                }}/>
}