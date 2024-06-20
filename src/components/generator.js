import Mappings from "./mappings"
import PrimaryGroupRules from "./primaryGroupRules";
import { useState, useEffect } from 'react';
import YAML from 'yaml'


export default function Generator() {

    const [data, setData] = useState({})
    const [dataPrimaryRules, setDataPrimaryRules] = useState({})
    const [payload, setPayload] = useState({})
    const [payloadPrimaryRules, setPayloadPrimaryRules] = useState({})
    useEffect(() => {
        if (!payload)
            return;
        setData(payload);
        setPayload(null)
    }, [payload]);

    useEffect(() => {
        if (!payloadPrimaryRules)
            return;
        setDataPrimaryRules(payloadPrimaryRules);
        setPayloadPrimaryRules(null)
    }, [payloadPrimaryRules]);

    const convertData = (inpData, inpPrimary) => {
        let inp = inpData;
        let finalData = {
            account_admin_groups: [],
            user_management: [],
            primary_group_rules: []
        };
        for (const entry in inp) {
            if (!entry || !inp[entry])
                continue;
            let mapping = {};
            mapping.directory_group = inp[entry].directory?.dirGroup;
            mapping.sign_group = [];
            mapping.admin_groups = [];
            for (const signEntry in inp[entry].sign) {
                if (!signEntry || !inp[entry].sign[signEntry])
                    continue;
                mapping.sign_group.push(inp[entry].sign[signEntry]?.signGroup);

                if (inp[entry].sign[signEntry]?.grpAdmin) {
                    mapping.admin_groups.push(inp[entry].sign[signEntry]?.signGroup);
                }
            }

            if (inp[entry].directory?.accAdmin) {
                finalData.account_admin_groups.push(mapping.directory_group);
            }
            mapping.group_admin = mapping.admin_groups.length !== 0
            finalData.user_management.push(mapping);
        }
        inp = inpPrimary
        for (const entry in inp) {
            if (!entry || !inp[entry])
                continue;
            let mapping = {};
            mapping.sign_groups = [];
            // mapping.primary_group = null;
            const prim = inp[entry].rules.isPrimary;
            for (const signEntry in inp[entry].rules) {
                if (!signEntry || !inp[entry].rules[signEntry])
                    continue;
                if (inp[entry].rules[signEntry]?.signGroup) {
                    mapping.sign_groups.push(inp[entry].rules[signEntry]?.signGroup);
                }
                if (prim && signEntry === prim) {
                    mapping.primary_group = (inp[entry].rules[signEntry]?.signGroup);
                }
            }
            finalData.primary_group_rules.push(mapping);
        }
        return finalData;
    }

    const convertToYaml = (inp, inp1) => {
        const doc = new YAML.Document();
        doc.contents = convertData(inp, inp1);
        return doc.toString();
    }
    return (
        <div>
            <div>
                <h2>Generate sign group mappings</h2><br />
                <Mappings bubbleUp={setPayload} />
            </div>
            <div>
                <h2>Generate Primary group rule mappings</h2><br />
                <PrimaryGroupRules bubbleUp={setPayloadPrimaryRules} />
            </div>
            <div style={{ marginTop: "50px" }}>
                <pre>{YAML.stringify(convertToYaml(data, dataPrimaryRules))}</pre>
            </div>
        </div>
    );

}