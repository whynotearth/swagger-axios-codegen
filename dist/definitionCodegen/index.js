"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const createDefinitionClass_1 = require("./createDefinitionClass");
const createDefinitionEnum_1 = require("./createDefinitionEnum");
function definitionsCodeGen(definitions) {
    let definitionModels = {};
    let definitionEnums = {};
    for (const [k, v] of Object.entries(definitions)) {
        let className = utils_1.refClassName(k);
        let result = null;
        // is an enum definition,just in swagger openAPI v2 
        if (v.enum) {
            const enumDef = createDefinitionEnum_1.createDefinitionEnum(className, v.enum, v.type);
            definitionEnums[`#/definitions/${k}`] = {
                name: enumDef.name,
                value: enumDef
            };
        }
        else if (v.type === 'array') {
            // #TODO
        }
        else {
            // default definition generate
            const { enums, model } = createDefinitionClass_1.createDefinitionClass(className, v.properties);
            // console.log('createDefinitionClass', enums)
            enums.forEach(item => {
                // definitionModels[item.name] = {
                //   value: item.text
                // }
                definitionEnums[`#/definitions/${item.name}`] = {
                    name: item.name,
                    content: item.text
                };
            });
            definitionModels[`#/definitions/${k}`] = {
                value: model,
                name: className
            };
        }
    }
    return { models: definitionModels, enums: definitionEnums };
}
exports.definitionsCodeGen = definitionsCodeGen;
