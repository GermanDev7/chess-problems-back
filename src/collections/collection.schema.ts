import { Schema, Document } from 'mongoose';

export const CollectionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    cretadBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

export interface Collection extends Document {
    name:string;
    description:string;
    problems:string[];
    createdBy:string;
    createdAt:Date;
}