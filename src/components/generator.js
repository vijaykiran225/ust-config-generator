import Mappings from "./mappings"
import PrimaryGroupRules from "./primaryGroupRules";


export default function Generator() {

    return (
        <div>
            <div>
                <h2>Generate sign group mappings</h2><br />
                <Mappings />
            </div>
            <div>
                <h2>Generate Primary group rule mappings</h2><br />
                <PrimaryGroupRules />
            </div>
        </div>
    );

}