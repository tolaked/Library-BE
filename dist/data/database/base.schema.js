"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueProps = exports.SchemaFactory = exports.ArrayItemSchema = exports.uuid = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const v4_1 = __importDefault(require("uuid/v4"));
/**
 * Replaces the default mongoose id with a uuid string
 */
exports.uuid = {
    type: mongoose_1.SchemaTypes.String,
    default: v4_1.default
};
exports.ArrayItemSchema = (schema) => {
    return new mongoose_1.Schema(schema, { _id: false });
};
exports.SchemaFactory = (schema, options, autoIndex = true) => {
    if (!schema || Object.keys(schema).length === 0) {
        throw new Error("Please specify schema definition");
    }
    const mongooseSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, schema), { _id: Object.assign({}, exports.uuid), deleted_at: { type: mongoose_1.SchemaTypes.Date } }), Object.assign(Object.assign(Object.assign(Object.assign({}, options), schema_1.readMapper), schema_1.timestamps), { 
        // @ts-ignore
        selectPopulatedPaths: false }));
    if (autoIndex) {
        for (const prop of getUniqueProps(schema)) {
            mongooseSchema.index({ deleted_at: 1, [prop]: 1 }, { unique: true });
        }
    }
    return mongooseSchema;
};
function getUniqueProps(schema) {
    const uniqueProps = [];
    for (const k of Object.keys(schema)) {
        const propType = schema[k];
        if (propType["unique"]) {
            // prevent creating unique index
            // @ts-ignore surely, wisdom knowledge and understanding
            const { unique } = propType, rest = __rest(propType, ["unique"]);
            schema[k] = rest;
            // add to unique props
            uniqueProps.push(k);
        }
    }
    return uniqueProps;
}
exports.getUniqueProps = getUniqueProps;
//# sourceMappingURL=base.schema.js.map