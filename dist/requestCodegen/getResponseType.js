"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * 获取请求的返回类型
 */
function getResponseType(reqProps) {
    // It does not allow the schema defined directly, but only the primitive type is allowed. 
    let result;
    let isRef = false;
    if (!reqProps.responses['200'] || !reqProps.responses['200'].schema) {
        result = 'any';
    }
    else if (reqProps.responses['200'].schema.$ref) {
        result = utils_1.refClassName(reqProps.responses['200'].schema.$ref);
        isRef = true;
    }
    else {
        let checkType = reqProps.responses[200].schema.type;
        if (!checkType) {
            // implicit types
            if (reqProps.responses[200].schema.items) {
                result = 'array';
            }
            else { // if (reqProps.responses[200].schema.properties) // actual check
                result = 'object';
            }
        }
        else {
            result = checkType; // string? -> string
        }
        if (result == 'object') {
            result = 'any';
        }
        else if (result == 'array') {
            result = 'any[]';
        }
        result = utils_1.toBaseType(result);
        // else ... JSON primitive types (string, boolean, number)
    }
    return { responseType: result, isRef };
}
exports.getResponseType = getResponseType;
