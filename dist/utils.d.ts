import { IDefinitionClass, IDefinitionEnum } from "./baseInterfaces";
export declare const GENERIC_SPLIT_KEY = "[";
export declare const isGenerics: (s: string) => boolean;
/**
 * 分解泛型接口
 * @param definitionClassName
 */
export declare function getGenericsClassNames(definitionClassName: string): {
    interfaceClassName: string;
    TClassName: string;
};
/**
 * 获取引用类型
 * @param s
 */
export declare function refClassName(s: string): string;
export declare function toBaseType(s: string): string;
export declare function getMethodName(path: string): string;
export declare function trimString(str: string, char: string, type: string): string;
export declare function findDeepRefs(imports: string[], allDefinition: IDefinitionClass[], allEnums: IDefinitionEnum[]): string[];
