import DirectoryGroup from "./directoryGroup";
import SignGroup from "./signGroup";
import { v4 as uuid } from 'uuid'
import { useState, useEffect } from 'react';


export function Mapping(props) {
    const secureId = props.uuid;

    return (
        <div style={{ display: "flex", flexDirection: "row", border: "solid black", padding: "10px", marginBottom: "10px" }} >
            <div style={{ marginRight: "10px" }}>
                <button key={secureId} onClick={() => props.deleter(secureId)}>-</button>
            </div>
            <DirectoryGroup />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;=&gt;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <SignGroup />

        </div>
    );
}

export default function Mappings() {
    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
    }, [deletedEntry]);
    const handleClick = () => {
        const newId = uuid()
        const f = <Mapping key={newId} uuid={newId} deleter={setDeletedEntry} />;
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
