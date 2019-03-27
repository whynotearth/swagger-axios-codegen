"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const propTrueType_1 = require("./propTrueType");
const pascalcase_1 = __importDefault(require("pascalcase"));
/**
 * 生成类定义
 * @param className class名称
 * @param properties 属性
 * @param isGenericsType 是否是泛型接口
 */
function createDefinitionClass(className, properties) {
    /** 枚举值 */
    let enums = [];
    let types = [];
    let model = { name: className, props: [], imports: [] };
    const propertiesEntities = Object.entries(properties);
    for (const [k, v] of propertiesEntities) {
        // console.log('props name', k)
        let { propType, isEnum, isArray, isType, ref } = propTrueType_1.propTrueType(v);
        if (isEnum) {
            let enumName = `Enum${className}${pascalcase_1.default(k)}`;
            enums.push({
                name: enumName, text: `export enum ${enumName}{
        ${propType}
      }`
            });
            propType = isArray ? enumName + '[]' : enumName;
            ref = enumName;
        }
        if (isType) {
            let typeName = `I${className}${pascalcase_1.default(k)}`;
            enums.push({
                name: typeName, text: `type ${typeName} = ${propType};`
            });
            propType = isArray ? typeName + '[]' : typeName;
            ref = typeName;
        }
        // 转化引用值到引用列表
        if (!!ref) {
            model.imports.push(ref);
        }
        // propsStr += classPropsTemplate(k, propType, v.description)
        model.props.push({ name: k, type: propType, desc: v.description });
    }
    // : classTemplate(className, propsStr, constructorStr)
    return { enums, model };
}
exports.createDefinitionClass = createDefinitionClass;
