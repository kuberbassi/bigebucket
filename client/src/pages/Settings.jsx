import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { setAllSettings, setSettings, setLoading } from '../store/settingsSlice';
import Loading from '../components/Loading';

const Settings = () => {
    const dispatch = useDispatch();
    const { allSettings, loading } = useSelector(state => state.settings);
    const [activeTab, setActiveTab] = useState('display');
    const [formData, setFormData] = useState({});
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch all settings on component mount
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            dispatch(setLoading(true));
            const response = await Axios({
                ...SummaryApi.getAllSettings
            });

            if (response.data.success) {
                dispatch(setAllSettings(response.data.data));

                // Convert to form data
                const settingsMap = {};
                response.data.data.forEach(setting => {
                    settingsMap[setting.key] = setting.value;
                });
                setFormData(settingsMap);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        try {
            // Prepare settings array for bulk update
            const settingsToUpdate = Object.keys(formData).map(key => ({
                key,
                value: formData[key]
            }));

            const response = await Axios({
                ...SummaryApi.bulkUpdateSettings,
                data: { settings: settingsToUpdate }
            });

            if (response.data.success) {
                toast.success('Settings saved successfully!');
                setHasChanges(false);
                fetchSettings(); // Refresh settings
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleReset = async () => {
        if (!window.confirm('Are you sure you want to reset all settings to defaults?')) {
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetAllSettings
            });

            if (response.data.success) {
                toast.success('Settings reset to defaults');
                setHasChanges(false);
                fetchSettings();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleInitialize = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.initializeSettings
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchSettings();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    // Group settings by category
    const settingsByCategory = allSettings.reduce((acc, setting) => {
        if (!acc[setting.category]) {
            acc[setting.category] = [];
        }
        acc[setting.category].push(setting);
        return acc;
    }, {});

    const tabs = [
        { id: 'display', label: 'Display Settings', icon: '🖥️' },
        { id: 'theme', label: 'Theme & Colors', icon: '🎨' },
        { id: 'business', label: 'Business Info', icon: '🏢' },
        { id: 'homepage', label: 'Homepage', icon: '🏠' },
        { id: 'product', label: 'Product Display', icon: '📦' },
        { id: 'header', label: 'Header', icon: '📌' },
        { id: 'footer', label: 'Footer', icon: '📄' }
    ];

    const renderSettingInput = (setting) => {
        const value = formData[setting.key] ?? setting.value;

        switch (setting.type) {
            case 'boolean':
                return (
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(setting.key, e.target.checked)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{value ? 'Enabled' : 'Disabled'}</span>
                    </label>
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(setting.key, parseInt(e.target.value))}
                        min={setting.validation?.min}
                        max={setting.validation?.max}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                );

            case 'color':
                return (
                    <div className="flex items-center space-x-2">
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => handleChange(setting.key, e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(setting.key, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {setting.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                );
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-600 mt-1">Customize your store settings</p>
                        </div>
                        <div className="flex space-x-2">
                            {allSettings.length === 0 && (
                                <button
                                    onClick={handleInitialize}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Initialize Settings
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Reset to Defaults
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!hasChanges}
                                className={`px-4 py-2 rounded-md ${hasChanges
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    {settingsByCategory[activeTab]?.length > 0 ? (
                        <div className="space-y-6">
                            {settingsByCategory[activeTab].map(setting => (
                                <div key={setting.key} className="border-b border-gray-200 pb-6 last:border-0">
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-900">{setting.label}</span>
                                        {setting.description && (
                                            <p className="text-xs text-gray-500 mt-1 mb-2">{setting.description}</p>
                                        )}
                                        <div className="mt-2">
                                            {renderSettingInput(setting)}
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No settings available for this category</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
