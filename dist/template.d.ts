import { IPropDef } from "./baseInterfaces";
/** 类模板 */
export declare function classTemplate(name: string, props: IPropDef[], imports: string[]): string;
/** 类属性模板 */
export declare function classPropsTemplate(name: string, type: string, description: string): string;
/** 类属性模板 */
export declare function classConstructorTemplate(name: string): string;
/** 枚举 */
export declare function enumTemplate(name: string, enumString: string, prefix?: string): string;
interface IRequestSchema {
    summary: string;
    parameters: string;
    responseType: string;
    method: string;
    contentType: string;
    path: string;
    pathReplace: string;
    parsedParameters: any;
    formData: string;
}
/** requestTemplate */
export declare function requestTemplate(name: string, requestSchema: IRequestSchema, options: any): string;
/** serviceTemplate */
export declare function serviceTemplate(name: string, body: string): string;
export declare const serviceHeader = "/** Generate by swagger-axios-codegen */\n\nimport axiosStatic, { AxiosPromise, AxiosInstance } from 'axios';\nexport interface IRequestOptions {\n  headers?: any;\n}\n\ninterface IRequestConfig {\n  method?: any;\n  headers?: any;\n  url?: any;\n  data?: any;\n  params?: any;\n}\n\n// Add options interface\nexport interface ServiceOptions {\n  axios?: AxiosInstance,\n}\n\n// Add default options\nexport const serviceOptions: ServiceOptions = {\n};\n\n// Instance selector\nfunction axios(configs: IRequestConfig): AxiosPromise {\n  return serviceOptions.axios? serviceOptions.axios.request(configs) : axiosStatic(configs);\n}\n";
export declare const customerServiceHeader = "/** Generate by swagger-axios-codegen */\n\nexport interface IRequestOptions {\n  headers?: any;\n}\n\ninterface IRequestPromise<T=any> extends Promise<IRequestResponse<T>> {}\n\ninterface IRequestResponse<T=any> {\n  data: T;\n  status: number;\n  statusText: string;\n  headers: any;\n  config: any;\n  request?: any;\n}\n\ninterface IRequestInstance {\n  (config: any): IRequestPromise;\n  (url: string, config?: any): IRequestPromise;\n  request<T = any>(config: any): IRequestPromise<T>;\n}\n\ninterface IRequestConfig {\n  method?: any;\n  headers?: any;\n  url?: any;\n  data?: any;\n  params?: any;\n}\n\n// Add options interface\nexport interface ServiceOptions {\n  axios?: IRequestInstance,\n}\n\n// Add default options\nexport const serviceOptions: ServiceOptions = {\n};\n\n// Instance selector\nfunction axios(configs: IRequestConfig): IRequestPromise {\n  return serviceOptions.axios && serviceOptions.axios.request(configs);\n}\n";
export {};
