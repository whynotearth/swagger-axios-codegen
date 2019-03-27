"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERIC_SPLIT_KEY = '[';
// 是否是接口类型
exports.isGenerics = (s) => /^.+\[.+\]$/.test(s);
/**
 * 分解泛型接口
 * @param definitionClassName
 */
function getGenericsClassNames(definitionClassName) {
    const splitIndex = definitionClassName.indexOf(exports.GENERIC_SPLIT_KEY);
    // 泛型基类 PagedResultDto
    const interfaceClassName = definitionClassName.slice(0, splitIndex);
    // 泛型类型 T 的类型名称
    const TClassName = definitionClassName.slice(splitIndex + 1, -1);
    return { interfaceClassName, TClassName };
}
exports.getGenericsClassNames = getGenericsClassNames;
/**
 * 获取引用类型
 * @param s
 */
function refClassName(s) {
    let propType = s.slice(s.lastIndexOf('/') + 1);
    if (exports.isGenerics(propType)) {
        const { interfaceClassName, TClassName } = getGenericsClassNames(propType);
        // return `${interfaceClassName}<${toBaseType(TClassName)}>`
        return trimString(propType.replace(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g, '_'), '_', 'right');
    }
    else {
        return propType;
    }
}
exports.refClassName = refClassName;
function toBaseType(s) {
    if (s === undefined || s === null || s.length === 0) {
        return 'any | null';
    }
    let result = '';
    switch (s) {
        case 'array':
            result = '[]';
            break;
        case 'Int64':
        case 'integer':
            result = 'number';
            break;
        case 'Guid':
        case 'String':
        case 'string':
            result = 'string';
            break;
        case 'file':
            result = 'any';
            break;
        default:
            result = s;
            break;
    }
    return result;
}
exports.toBaseType = toBaseType;
function getMethodName(path) {
    const paths = path.split('/');
    for (let i = paths.length - 1; i >= 0; i--) {
        if (/\{.+\}/.test(paths[i]) === false) {
            return paths[i];
        }
    }
    return '';
}
exports.getMethodName = getMethodName;
function trimString(str, char, type) {
    if (char) {
        if (type == 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '');
        }
        else if (type == 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return str.replace(/^\s+|\s+$/g, '');
}
exports.trimString = trimString;
function findDeepRefs(imports, allDefinition, allEnums) {
    let result = [];
    imports.forEach(model => {
        let ref = null;
        ref = allDefinition.find(item => item.name == model);
        if (ref) {
            result.push(ref.name);
            if (ref.value.imports.length > 0) {
                result = result.concat(findDeepRefs(ref.value.imports, allDefinition, allEnums));
            }
        }
        else {
            ref = allEnums.find(item => item.name == model);
            if (ref) {
                result.push(ref.name);
            }
        }
    });
    return result;
}
exports.findDeepRefs = findDeepRefs;
