import { useRef } from 'react';

export default function DirectoryGroup(props) {
    let data = useRef({ uuid: props.uuid })

    const updateAccAdmin = (e) => {
        data.current.accAdmin = e.target.checked
        props.bubbleUp(data.current)
    }
    const updateDirGroup = (e) => {
        data.current.dirGroup = e.target.value
        props.bubbleUp(data.current)
    }
    return (
        <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }} >
            <span>
                Directory Group :
                <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            </span>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} >
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} >
                    <input type="text" onChange={updateDirGroup} /></div>
                <div>
                    <input type="checkbox" value="accAdmin" onChange={updateAccAdmin} />
                    <span style={{ marginBottom: "10px", marginRight: "50px" }}>
                        Account Admin?
                    </span>
                </div>
            </div>
        </div>
    );
}