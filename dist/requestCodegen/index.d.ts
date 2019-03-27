import { IPaths } from '../saggerInterfaces';
export interface IRequestClass {
    [key: string]: IRequestMethods[];
}
interface IRequestMethods {
    name: string;
    operationId: string;
    requestSchema: any;
}
export declare function requestCodegen(paths: IPaths): IRequestClass;
export {};
