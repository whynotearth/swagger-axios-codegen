"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase = require("camelcase");
/** 类模板 */
function classTemplate(name, props, imports) {
    return `
  ${imports.map(imp => {
        return `import { ${imp} } from '../definitions/${imp}'\n`;
    }).join('')}

  export class ${name} {

    ${props.map(p => classPropsTemplate(p.name, p.type, p.desc)).join('')}

    constructor(data?:any){
      if(data){
        ${props.map(p => classConstructorTemplate(p.name)).join('')}
      }
    }
  }
  `;
}
exports.classTemplate = classTemplate;
/** 类属性模板 */
function classPropsTemplate(name, type, description) {
    return `
  /** ${description || ''} */
  ${name}:${type};
  `;
}
exports.classPropsTemplate = classPropsTemplate;
/** 类属性模板 */
function classConstructorTemplate(name) {
    return `this['${name}'] = data['${name}'];\n`;
}
exports.classConstructorTemplate = classConstructorTemplate;
/** 枚举 */
function enumTemplate(name, enumString, prefix) {
    return `
  export enum ${name}{
    ${enumString}
  }
  `;
}
exports.enumTemplate = enumTemplate;
/** requestTemplate */
function requestTemplate(name, requestSchema, options) {
    let { summary = '', parameters = '', responseType = '', method = '', contentType = 'multipart/form-data', path = '', pathReplace = '', parsedParameters = {}, formData = '' } = requestSchema;
    const { pathParameters = [], queryParameters = [], bodyParameters = [] } = parsedParameters;
    return `
/**
 * ${summary || ''}
 */
${options.useStaticMethod ? 'static' : ''} ${camelcase(name)}(${parameters}options:IRequestOptions={}):Promise<${responseType}> {
  return new Promise((resolve, reject) => {
    const configs:IRequestConfig = {...options, method: "${method}" };
    configs.headers = {
      ...options.headers,
      'Content-Type':'${contentType}'
    }
    let url = '${path}'
    ${pathReplace}
    configs.url = url;
    ${pathParameters.length > 0 ? `
      ${JSON.stringify(pathParameters)}.forEach(key => {
        params[key] = null
      })
      ` : ''}
    ${parsedParameters && queryParameters.length > 0
        ? 'configs.params = params'
        : ''}
    let data = ${parsedParameters && bodyParameters.length > 0
        ? '{' + bodyParameters.join(',') + '}'
        : 'null'}
    ${contentType === 'multipart/form-data' ? formData : ''}
    configs.data = data;
    axios(configs).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
}`;
}
exports.requestTemplate = requestTemplate;
/** serviceTemplate */
function serviceTemplate(name, body) {
    return `
  export class ${name} {
    ${body}
  }
  `;
}
exports.serviceTemplate = serviceTemplate;
exports.serviceHeader = `/** Generate by swagger-axios-codegen */

import axiosStatic, { AxiosPromise, AxiosInstance } from 'axios';
export interface IRequestOptions {
  headers?: any;
}

interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance,
}

// Add default options
export const serviceOptions: ServiceOptions = {
};

// Instance selector
function axios(configs: IRequestConfig): AxiosPromise {
  return serviceOptions.axios? serviceOptions.axios.request(configs) : axiosStatic(configs);
}
`;
exports.customerServiceHeader = `/** Generate by swagger-axios-codegen */

export interface IRequestOptions {
  headers?: any;
}

interface IRequestPromise<T=any> extends Promise<IRequestResponse<T>> {}

interface IRequestResponse<T=any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface IRequestInstance {
  (config: any): IRequestPromise;
  (url: string, config?: any): IRequestPromise;
  request<T = any>(config: any): IRequestPromise<T>;
}

interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: IRequestInstance,
}

// Add default options
export const serviceOptions: ServiceOptions = {
};

// Instance selector
function axios(configs: IRequestConfig): IRequestPromise {
  return serviceOptions.axios && serviceOptions.axios.request(configs);
}
`;
