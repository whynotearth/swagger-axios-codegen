import { IParameter } from "../saggerInterfaces";
/**
 * 生成参数
 * @param params
 */
export declare function getRequestParameters(params: IParameter[]): {
    requestParameters: string;
    requestFormData: string;
    requestPathReplace: string;
    pathParameters: string[];
    queryParameters: string[];
    bodyParameters: string[];
    imports: string[];
};
