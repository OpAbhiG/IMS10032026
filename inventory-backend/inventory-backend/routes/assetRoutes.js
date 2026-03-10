const express = require('express');
const router = express.Router();
const controller = require('../controllers/assetController'); // correct variable

// Dashboard route MUST BE AT TOP (before :id route)
router.get('/dashboard/stats', controller.getDashboardStats);

// CRUD routes
router.post('/', controller.createAsset);
router.get('/', controller.getAllAssets);
router.get('/:id', controller.getAssetById);
router.put('/:id', controller.updateAsset);
router.delete('/:id', controller.deleteAsset);

// Asset relocation 
router.post('/:id/relocate', controller.relocateAsset);
router.get('/:id/relocations', controller.getRelocationHistory);
router.get('/dashboard/stats', controller.getDashboardStats);

// Asset transfer
router.put('/:id/transfer', controller.transferAsset);

module.exports = router;
