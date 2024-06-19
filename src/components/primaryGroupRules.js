import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

export function SignTextRadioBox(props) {
    return (
        <div key={props.uuid}>
            <input key={props.uuid} type="text" style={{ marginBottom: "10px", marginRight: "5px" }} />
            <input type="radio" name="primaryGroup" value={props.uuid} />
            <span style={{ marginBottom: "10px", marginRight: "50px" }}>
                Primary Group?
            </span>
            <button style={{ marginBottom: "10px", marginRight: "5px" }} onClick={() => props.deleter(props.uuid)}> X</button>

        </div>
    );
}

export function PrimaryGroupRule(props) {

    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
    }, [deletedEntry]);

    const handleClick = () => {
        const newId = uuid();

        const f = <SignTextRadioBox uuid={newId} key={newId} deleter={setDeletedEntry} />;
        const newContent = [...txtBoxes, f];
        setTxtBoxes(newContent);
    };

    return (<div style={{ display: "flex", flexDirection: "row", border: "solid black", padding: "10px", marginBottom: "10px" }} >
        <div style={{ marginBottom: "10px", marginRight: "10px" }}>
            <button onClick={() => props.deleter(props.uuid)}>-</button>
        </div>


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

export default function PrimaryGroupRules() {

    const [pgrpRules, setPgrpRules] = useState([])
    const [deletedRuleEntry, setDeletedRuleEntry] = useState()
    useEffect(() => {
        setPgrpRules(pgrpRules.filter(item => item.props.uuid !== deletedRuleEntry));
    }, [deletedRuleEntry]);
    const handleRulesClick = () => {
        const newId = uuid();
        const f = <PrimaryGroupRule key={newId} uuid={newId} deleter={setDeletedRuleEntry} />;
        const newContent = [...pgrpRules, f];
        setPgrpRules(newContent);
    };


    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>

                {pgrpRules}
            </div>

            <div style={{ marginLeft: "10px" }}>
                <button onClick={handleRulesClick} >+</button>
            </div>
        </div>
    );
}