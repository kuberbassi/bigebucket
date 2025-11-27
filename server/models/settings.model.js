import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['display', 'theme', 'business', 'homepage', 'product', 'header', 'footer', 'email', 'payment', 'shipping', 'advanced'],
        default: 'advanced'
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'boolean', 'color', 'image', 'select', 'textarea', 'json', 'array'],
        default: 'text'
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    options: [{
        label: String,
        value: mongoose.Schema.Types.Mixed
    }],
    default: {
        type: mongoose.Schema.Types.Mixed
    },
    validation: {
        min: Number,
        max: Number,
        required: Boolean,
        pattern: String
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Index for faster queries
settingsSchema.index({ category: 1 });
settingsSchema.index({ key: 1 });

const SettingsModel = mongoose.model('Settings', settingsSchema);

export default SettingsModel;
