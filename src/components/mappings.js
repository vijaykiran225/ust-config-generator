import DirectoryGroup from "./directoryGroup";
import SignGroup from "./signGroup";
import { v4 as uuid } from 'uuid'
import { useState, useEffect, useRef } from 'react';


export function Mapping(props) {
    const secureId = props.uuid;
    const data = useRef({ uuid: secureId })
    const mysetter = (c) => {
        data.current.directory = c;
        props.bubbleUp(data.current)
    }
    const mySignSetter = (c) => {
        data.current.sign = c;
        props.bubbleUpSign(data.current)
    }
    return (
        <div style={{ display: "flex", flexDirection: "row", border: "solid black", padding: "10px", marginBottom: "10px" }} >
            <div style={{ marginRight: "10px" }}>
                <button key={secureId} onClick={() => props.deleter(secureId)}>-</button>
            </div>
            <DirectoryGroup uuid={secureId} bubbleUp={mysetter} />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;=&gt;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <SignGroup bubbleUp={mySignSetter} />

        </div>
    );
}

export default function Mappings(props) {
    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    const data = useRef({})
    const mysetter = (c) => {
        data.current[c.uuid] = c;
        props.bubbleUp(data.current)
    }
    const mySignSetter = (c) => {
        data.current[c.uuid] = c;
        props.bubbleUp(data.current)
    }
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
        data.current[deletedEntry] = undefined;
        props.bubbleUp(data.current)
    }, [deletedEntry]);
    const handleClick = () => {
        const newId = uuid()
        const f = <Mapping key={newId} uuid={newId} deleter={setDeletedEntry} bubbleUp={mysetter} bubbleUpSign={mySignSetter} />;
        const newContent = [...txtBoxes, f];
        setTxtBoxes(newContent);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>

                {txtBoxes}
            </div>
            <div style={{ marginLeft: "10px" }}>
                <button onClick={handleClick} >+</button>
            </div>
        </div>
    );
}
