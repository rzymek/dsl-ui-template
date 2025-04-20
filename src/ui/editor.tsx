import {configureMonacoWorkers} from '../setupCommon.js';
import {executeClassic} from '../setupClassic.js';
import { useEffect, useRef } from 'preact/hooks'

configureMonacoWorkers();

export function DslEditor(props: { onStart?: () => void }) {
    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        if (!ref.current) return;
        executeClassic(ref.current)
            .then(props.onStart);
    }, []);
    return <div ref={ref} style={{width:'100%',height:'100%',flex:1}}/>;
}
