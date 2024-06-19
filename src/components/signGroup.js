import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'

export function SignTextBox(props) {
    let data = useRef({ uuid: props.uuid })

    const updateGrpAdmin = (e) => {
        data.current.grpAdmin = e.target.checked
        props.bubbleUp(data.current)
    }
    const updateSignGroup = (e) => {
        data.current.signGroup = e.target.value
        props.bubbleUp(data.current)
    }
    return (
        <div >
            <input type="text" style={{ marginBottom: "10px", marginRight: "5px" }} onChange={updateSignGroup} />
            <input type="checkbox" name="grpAdminSelected" value="grpAdmin" onChange={updateGrpAdmin} />
            <span style={{ marginBottom: "10px", marginRight: "50px" }}>
                Group Admin?
            </span>
            <button style={{ marginBottom: "10px", marginRight: "5px" }} onClick={() => props.deleter(props.uuid)} >x</button>

        </div>
    );
}

export default function SignGroup(props) {
    const data = useRef({})
    const mysetter = (c) => {
        data.current[c.uuid] = c;
        props.bubbleUp((data.current))
    }
    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
        data.current[deletedEntry] = undefined;
        props.bubbleUp(data.current)
    }, [deletedEntry]);

    const handleClick = () => {
        const newId = uuid()
        const f = <SignTextBox uuid={newId} key={newId} deleter={setDeletedEntry} bubbleUp={mysetter} />;
        const newContent = [...txtBoxes, f];
        setTxtBoxes(newContent);
    };

    return (<div style={{ display: "flex", flexDirection: "row" }}>
        <span>SignGroup(s) : </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
            {txtBoxes}
        </div>
        <div style={{ marginLeft: "10px" }}>
            <button onClick={handleClick} >+</button>
        </div>
    </div>);
}