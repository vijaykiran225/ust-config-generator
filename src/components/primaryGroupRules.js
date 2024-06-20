import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'

export function SignTextRadioBox(props) {
    let data = useRef({ uuid: props.uuid })

    const updatePrimaryAdmin = (e) => {
        props.bubbleUpPrimary(e.target.value)
    }
    const updateSignGroup = (e) => {
        data.current.signGroup = e.target.value
        props.bubbleUp(data.current)
    }
    return (
        <div key={props.uuid}>
            <input key={props.uuid} type="text" style={{ marginBottom: "10px", marginRight: "5px" }} onChange={updateSignGroup} />
            <input type="radio" name={"primaryGroup-" + props.uber} value={props.uuid} onChange={updatePrimaryAdmin} />
            <span style={{ marginBottom: "10px", marginRight: "50px" }}>
                Primary Group?
            </span>
            <button style={{ marginBottom: "10px", marginRight: "5px" }} onClick={() => props.deleter(props.uuid)}> X</button>

        </div>
    );
}

export function PrimaryGroupRule(props) {
    const data = useRef({ uuid: props.uuid, rules: {} })
    const mysetter = (c) => {
        data.current.rules[c.uuid] = c;
        props.bubbleUp((data.current))
    }
    const myPrimarySetter = (c) => {
        data.current.rules.isPrimary = c;
        props.bubbleUp((data.current))
    }
    const [txtBoxes, setTxtBoxes] = useState([])
    const [deletedEntry, setDeletedEntry] = useState()
    useEffect(() => {
        setTxtBoxes(txtBoxes.filter(item => item.props.uuid !== deletedEntry));
        data.current.rules[deletedEntry] = undefined;
        props.bubbleUp(data.current)
    }, [deletedEntry]);

    const handleClick = () => {
        const newId = uuid();

        const f = <SignTextRadioBox uber={data.current.uuid} uuid={newId} key={newId} deleter={setDeletedEntry} bubbleUp={mysetter} bubbleUpPrimary={myPrimarySetter} />;
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

export default function PrimaryGroupRules(props) {
    const data = useRef({})
    const mysetter = (c) => {
        data.current[c.uuid] = c;
        props.bubbleUp((data.current))
    }
    const [pgrpRules, setPgrpRules] = useState([])
    const [deletedRuleEntry, setDeletedRuleEntry] = useState()
    useEffect(() => {
        setPgrpRules(pgrpRules.filter(item => item.props.uuid !== deletedRuleEntry));
        data.current[deletedRuleEntry] = undefined;
        props.bubbleUp(data.current)
    }, [deletedRuleEntry]);
    const handleRulesClick = () => {
        const newId = uuid();
        const f = <PrimaryGroupRule key={newId} uuid={newId} deleter={setDeletedRuleEntry} bubbleUp={mysetter} />;
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