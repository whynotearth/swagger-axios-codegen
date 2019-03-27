import { IDefinitions } from '../saggerInterfaces';
import { IDefinitionClasses, IDefinitionEnums } from '../baseInterfaces';
export declare function definitionsCodeGen(definitions: IDefinitions): {
    models: IDefinitionClasses;
    enums: IDefinitionEnums;
};
