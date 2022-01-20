"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueIndex = exports.lowercaseString = exports.trimmedString = exports.trimmedLowercaseString = exports.timestamps = exports.readMapper = void 0;
const mongoose_1 = require("mongoose");
/**
 * Removes _id field in subdocuments and allows virtual fields to be returned
 */
exports.readMapper = {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret, options) => {
            delete ret._id;
            if (ret.password)
                delete ret.password;
            return ret;
        }
    }
};
/**
 * Defines timestamps fields in a schema
 */
exports.timestamps = {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
};
/**
 * Defines a schema type with a lowercased trimmed string
 */
exports.trimmedLowercaseString = {
    type: mongoose_1.SchemaTypes.String,
    trim: true,
    lowercase: true
};
/**
 * Defines a schema type with a trimmed string
 */
exports.trimmedString = {
    type: mongoose_1.SchemaTypes.String,
    trim: true
};
/**
 * Defines a schema type with a lowercased string
 */
exports.lowercaseString = {
    type: mongoose_1.SchemaTypes.String,
    lowercase: true
};
/**
 * Creates a unique index for a document taking into account support
 * for soft deletes
 * @param schema Schema of Document
 * @param props properties to be part of unique index
 */
function uniqueIndex(schema, ...props) {
    const indexes = props.reduce((idx, k) => {
        idx[k] = 1;
        return idx;
    }, { deleted_at: 1 });
    schema.index(indexes, { unique: true });
    return schema;
}
exports.uniqueIndex = uniqueIndex;
//# sourceMappingURL=schema.js.map