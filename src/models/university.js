import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Prices, costs, etc
const costsSchema = new mongoose.Schema({
    _id: { type: String, unique: true, default: uuidv4 },
    title: { type: String, required: true, trim: true},
    amount: { type: Number, required: true, min: 0 },
    currency: {  type: String, default: 'DOP', enum: ['DOP', 'USD'] },
}, { _id: false })

// University default schema
const universitySchema = new mongoose.Schema({
    _id: { type: String, unique: true, default: uuidv4 },
    name: { type: String, required: true, unique: true, trim: true, index: true },
    acronym: { type: String, required: true, trim: true},
    is_deleted: { type: Boolean, default: false }, // Soft delete
    costs: { type: [costsSchema], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }, // Soft delete
}, { _id: false })

// Middleware to enforce constraints or perform transformations before saving
universitySchema.pre('save', function (next) {
    // Automatically set `deleted_at` when soft-deleting
    if (this.isModified('is_deleted') && this.is_deleted) this.deleted_at = new Date();
    next();
});

// Create a new model with the schema
const University = mongoose.model('University', universitySchema)

// Soft delete a university
const softDeleteUniversity = async (universityId) => {
    return await University.findByIdAndUpdate(universityId, {
        is_deleted: true,
        deleted_at: new Date()
    })
}


export { University, softDeleteUniversity }
