import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
    getAllSettingsController,
    getSettingsByCategoryController,
    getSettingByKeyController,
    getSettingsMapController,
    updateSettingController,
    bulkUpdateSettingsController,
    resetSettingController,
    resetAllSettingsController,
    initializeSettingsController
} from '../controllers/settings.controller.js';

const settingsRouter = Router();

// Public routes (get settings)
settingsRouter.get('/get-all', getAllSettingsController);
settingsRouter.get('/get-map', getSettingsMapController);
settingsRouter.get('/category/:category', getSettingsByCategoryController);
settingsRouter.get('/get/:key', getSettingByKeyController);

// Protected routes (admin only - update settings)
settingsRouter.put('/update', auth, updateSettingController);
settingsRouter.put('/bulk-update', auth, bulkUpdateSettingsController);
settingsRouter.put('/reset/:key', auth, resetSettingController);
settingsRouter.put('/reset-all', auth, resetAllSettingsController);
settingsRouter.post('/initialize', auth, initializeSettingsController);

export default settingsRouter;
