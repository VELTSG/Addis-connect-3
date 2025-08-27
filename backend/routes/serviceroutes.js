const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
	listServices,
	getServiceById,
	redirectService,
	createService,
	updateService,
	deleteService,
	submitService,
	listPending,
	approveService,
	rejectService,
	listMine
} = require('../controller/servicecontroller');

// Public endpoints
router.get('/', listServices);
// Put redirect and static endpoints before '/:id' so they don't get captured
router.get('/redirect/:id', redirectService);
// Moderation/static routes BEFORE '/:id'
router.get('/pending/list', auth(['admin']), listPending);
router.post('/:id/approve', auth(['admin']), approveService);
router.post('/:id/reject', auth(['admin']), rejectService);
// Authenticated user helpers should also be above '/:id'
router.get('/mine', auth(['user', 'admin', 'editor']), listMine);
router.get('/:id', getServiceById);

// Admin endpoints (protected)
router.post('/', auth(['admin', 'editor']), createService);
router.put('/:id', auth(['admin', 'editor']), updateService);
router.delete('/:id', auth(['admin']), deleteService);

// User submission (must be authenticated user)
router.post('/submit', auth(['user', 'admin', 'editor']), submitService);

// Admin moderation (duplicates kept above for order safety)

module.exports = router;
