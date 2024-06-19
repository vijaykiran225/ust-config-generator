export default function DirectoryGroup() {

    return (<div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }} >
        <span>Directory Group :<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} >
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} ><input type="text" /></div>
            <div><input type="checkbox" value="accAdmin" /><span style={{ marginBottom: "10px", marginRight: "50px" }}>Account Admin?</span></div>
        </div>
    </div>);
}