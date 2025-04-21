import {configureMonacoWorkers} from '../setupCommon.js';
import {DslEditorInstance, executeClassic} from "../setupClassic.js";
import {useEffect,useRef} from 'preact/hooks';

export function DslEditor(props:{children: string}) {
    const ref = useRef<HTMLDivElement>(null);
    const wrapper = useRef<Promise<DslEditorInstance>>(null);
    useEffect(() => {
        configureMonacoWorkers();
        (async () => {
            if (!ref.current) return;
            wrapper.current = executeClassic(ref.current, {
                code: props.children,
            });
        })();
        return () => {
            wrapper.current?.then(i => i.dispose());
        }
    }, [props.children]);
    return <div ref={ref} style={{width: '100%', height: '100%', flex: 1}}/>;
}