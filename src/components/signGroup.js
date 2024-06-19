import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

export function SignTextBox(props) {
    return (
        <div >
            <input type="text" style={{ marginBottom: "10px", marginRight: "5px" }} />
            <input type="checkbox" name="grpAdminSelected" value="grpAdmin" />
            <span style={{ marginBottom: "10px", marginRight: "50px" }}>
                Group Admin?
            </span>
            <button style={{ marginBottom: "10px", marginRight: "5px" }} onClick={() => props.deleter(props.uuid)} >x</button>

        </div>
    );
}

export default function SignGroup() {

    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
    }, [deletedEntry]);

    const handleClick = () => {
        const newId = uuid()
        const f = <SignTextBox uuid={newId} key={newId} deleter={setDeletedEntry} />;
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