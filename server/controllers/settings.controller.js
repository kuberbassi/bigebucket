import SettingsModel from '../models/settings.model.js';
import { defaultSettings } from '../utils/defaultSettings.js';

// Get all settings
export const getAllSettingsController = async (request, response) => {
    try {
        const settings = await SettingsModel.find().sort({ category: 1, key: 1 });

        return response.json({
            message: 'Settings retrieved successfully',
            data: settings,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get settings by category
export const getSettingsByCategoryController = async (request, response) => {
    try {
        const { category } = request.params;

        const settings = await SettingsModel.find({ category }).sort({ key: 1 });

        return response.json({
            message: 'Settings retrieved successfully',
            data: settings,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get specific setting by key
export const getSettingByKeyController = async (request, response) => {
    try {
        const { key } = request.params;

        const setting = await SettingsModel.findOne({ key });

        if (!setting) {
            return response.status(404).json({
                message: 'Setting not found',
                error: true,
                success: false
            });
        }

        return response.json({
            message: 'Setting retrieved successfully',
            data: setting,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get settings as key-value pairs (for frontend consumption)
export const getSettingsMapController = async (request, response) => {
    try {
        const settings = await SettingsModel.find();

        // Convert to key-value map
        const settingsMap = {};
        settings.forEach(setting => {
            settingsMap[setting.key] = setting.value;
        });

        return response.json({
            message: 'Settings map retrieved successfully',
            data: settingsMap,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Update single setting
export const updateSettingController = async (request, response) => {
    try {
        const userId = request.userId; // From auth middleware

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        const { key, value } = request.body;

        if (!key) {
            return response.status(400).json({
                message: 'Setting key is required',
                error: true,
                success: false
            });
        }

        const setting = await SettingsModel.findOneAndUpdate(
            { key },
            {
                value,
                updatedBy: userId
            },
            { new: true, upsert: false }
        );

        if (!setting) {
            return response.status(404).json({
                message: 'Setting not found',
                error: true,
                success: false
            });
        }

        return response.json({
            message: 'Setting updated successfully',
            data: setting,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Bulk update settings
export const bulkUpdateSettingsController = async (request, response) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        const { settings } = request.body; // Array of { key, value }

        if (!Array.isArray(settings) || settings.length === 0) {
            return response.status(400).json({
                message: 'Settings array is required',
                error: true,
                success: false
            });
        }

        const updatePromises = settings.map(({ key, value }) =>
            SettingsModel.findOneAndUpdate(
                { key },
                { value, updatedBy: userId },
                { new: true }
            )
        );

        const updatedSettings = await Promise.all(updatePromises);

        return response.json({
            message: `${updatedSettings.length} settings updated successfully`,
            data: updatedSettings,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Reset setting to default
export const resetSettingController = async (request, response) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        const { key } = request.params;

        // Find default value
        const defaultSetting = defaultSettings.find(s => s.key === key);

        if (!defaultSetting) {
            return response.status(404).json({
                message: 'Default setting not found',
                error: true,
                success: false
            });
        }

        const setting = await SettingsModel.findOneAndUpdate(
            { key },
            {
                value: defaultSetting.default,
                updatedBy: userId
            },
            { new: true }
        );

        return response.json({
            message: 'Setting reset to default',
            data: setting,
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Reset all settings to defaults
export const resetAllSettingsController = async (request, response) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        const updatePromises = defaultSettings.map(setting =>
            SettingsModel.findOneAndUpdate(
                { key: setting.key },
                {
                    value: setting.default,
                    updatedBy: userId
                },
                { new: true }
            )
        );

        await Promise.all(updatePromises);

        return response.json({
            message: 'All settings reset to defaults',
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Initialize settings (seed default settings if not exists)
export const initializeSettingsController = async (request, response) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        let createdCount = 0;
        let skippedCount = 0;

        for (const setting of defaultSettings) {
            const exists = await SettingsModel.findOne({ key: setting.key });

            if (!exists) {
                await SettingsModel.create({
                    ...setting,
                    updatedBy: userId
                });
                createdCount++;
            } else {
                skippedCount++;
            }
        }

        return response.json({
            message: `Settings initialized: ${createdCount} created, ${skippedCount} already exist`,
            data: {
                created: createdCount,
                skipped: skippedCount,
                total: defaultSettings.length
            },
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
