"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function propTrueType(v) {
    let result = {
        propType: '',
        isEnum: false,
        isArray: false,
        /**ts type definition */
        isType: false,
        ref: ''
    };
    if (v.$ref) {
        // 是引用类型
        result.propType = utils_1.refClassName(v.$ref);
        result.ref = result.propType;
    }
    //是个数组
    else if (v.items) {
        result.isArray = true;
        if (v.items.$ref) {
            // 是个引用类型
            result.ref = utils_1.refClassName(v.items.$ref);
            result.propType = result.ref + '[]';
        }
        else {
            if (v.items.type === "array") {
                const currentResult = propTrueType(v.items);
                result = { ...result, ...currentResult };
            }
            else if (!!v.items.enum) {
                const currentResult = propTrueType(v.items);
                result = { ...result, ...currentResult };
            }
            else {
                result.propType = utils_1.toBaseType(v.items.type) + '[]';
            }
        }
    }
    // 是枚举 并且是字符串类型
    else if (v.enum && v.type === 'string') {
        result.isEnum = true;
        result.propType = v.enum.map(item => `'${item}'='${item}'`).join(',');
    }
    else if (v.enum) {
        result.isType = true;
        result.propType = v.type === 'string' ? v.enum.map(item => `'${item}'`).join('|') : v.enum.join('|');
    }
    // 基本类型
    else {
        result.propType = utils_1.toBaseType(v.type);
    }
    return result;
}
exports.propTrueType = propTrueType;
