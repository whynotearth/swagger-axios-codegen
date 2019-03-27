"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const getRequestParameters_1 = require("./getRequestParameters");
const getResponseType_1 = require("./getResponseType");
function requestCodegen(paths) {
    const requestClasses = {};
    for (const [path, request] of Object.entries(paths)) {
        let methodName = utils_1.getMethodName(path);
        for (const [method, reqProps] of Object.entries(request)) {
            // methodName = options.methodNameMode === 'operationId' ? reqProps.operationId : methodName
            const contentType = reqProps.consumes && reqProps.consumes.includes('multipart/form-data') ? 'multipart/form-data' : 'application/json';
            let formData = '';
            let pathReplace = '';
            // 获取类名
            if (!reqProps.tags)
                continue;
            const className = reqProps.tags[0];
            // 是否存在
            if (!requestClasses[className]) {
                requestClasses[className] = [];
            }
            let parameters = '';
            let handleNullParameters = '';
            let parsedParameters;
            if (reqProps.parameters) {
                // 获取到接口的参数
                parsedParameters = getRequestParameters_1.getRequestParameters(reqProps.parameters);
                parameters = parsedParameters.requestParameters.length > 0
                    ? `params: {
              ${parsedParameters.requestParameters}
          } = <any>{},`
                    : '';
                formData = parsedParameters.requestFormData ? 'data = new FormData();\n' + parsedParameters.requestFormData : '';
                pathReplace = parsedParameters.requestPathReplace;
            }
            const { responseType, isRef: refResponseType } = getResponseType_1.getResponseType(reqProps);
            // 如果返回值也是引用类型，则加入到类的引用里面
            if (refResponseType) {
                parsedParameters.imports.push(responseType);
            }
            requestClasses[className].push({
                name: methodName,
                operationId: reqProps.operationId,
                requestSchema: {
                    summary: reqProps.summary,
                    path,
                    pathReplace,
                    parameters,
                    parsedParameters,
                    method,
                    contentType,
                    responseType,
                    formData
                }
            });
        }
    }
    return requestClasses;
}
exports.requestCodegen = requestCodegen;
