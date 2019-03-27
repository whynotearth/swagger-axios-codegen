"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const camelcase = require("camelcase");
/**
 * 生成参数
 * @param params
 */
function getRequestParameters(params) {
    let requestParameters = '';
    let requestFormData = '';
    let requestPathReplace = '';
    let pathParameters = [];
    let queryParameters = [];
    let bodyParameters = [];
    let imports = [];
    params.forEach(p => {
        let propType = '';
        // 引用类型定义
        if (p.schema) {
            if (p.schema.items) {
                propType = utils_1.refClassName(p.schema.items.$ref);
            }
            else if (p.schema.$ref) {
                propType = utils_1.refClassName(p.schema.$ref);
                // console.log('propType', refClassName(p.schema.$ref))
            }
            else if (p.schema.type) {
                propType = p.schema.type;
            }
            else {
                throw new Error('Could not find property type on schema');
            }
            imports.push(propType);
        }
        else if (p.items) {
            propType = p.items.$ref ? utils_1.refClassName(p.items.$ref) + '[]' : utils_1.toBaseType(p.items.type) + '[]';
            imports.push(propType);
        }
        // 基本类型
        else {
            propType = utils_1.toBaseType(p.type);
        }
        const paramName = camelcase(p.name);
        requestParameters += `
    /** ${p.description || ''} */
    ${paramName}${p.required ? '' : '?'}:${propType},`;
        // 如果参数是从formData 提交
        if (p.in === 'formData') {
            requestFormData += `if(params['${paramName}']){
        data.append('${paramName}',params['${paramName}'])
      }\n
      `;
        }
        else if (p.in === 'path') {
            requestPathReplace += `url = url.replace('{${paramName}}',params['${paramName}']+'')\n`;
            pathParameters.push(paramName);
        }
        else if (p.in === 'query') {
            queryParameters.push(`'${paramName}':params['${paramName}']`);
        }
        else if (p.in === 'body') {
            var body = p.schema ? `...params['${paramName}']` : `'${paramName}':params['${paramName}']`;
            bodyParameters.push(body);
        }
    });
    return { requestParameters, requestFormData, requestPathReplace, pathParameters, queryParameters, bodyParameters, imports };
}
exports.getRequestParameters = getRequestParameters;
