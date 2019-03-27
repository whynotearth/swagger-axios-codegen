import { IRequestMethod } from "../saggerInterfaces";
/**
 * 获取请求的返回类型
 */
export declare function getResponseType(reqProps: IRequestMethod): {
    responseType: string;
    isRef: boolean;
};
