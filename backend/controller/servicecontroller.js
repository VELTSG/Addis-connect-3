const Service = require('../models/services');

// Public: list all active services
exports.listServices = async (req, res) => {
	try {
		const services = await Service.find({
			isActive: true,
			$or: [ { status: 'approved' }, { status: { $exists: false } } ]
		}).sort({ createdAt: -1 });
		res.json(services);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Public: get single service by id
exports.getServiceById = async (req, res) => {
	try {
	const service = await Service.findById(req.params.id);
	const approvedOrUnset = !service?.status || service.status === 'approved';
	if (!service || !service.isActive || !approvedOrUnset) return res.status(404).json({ message: 'Service not found' });
		res.json(service);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Public: redirect to external link with utm_source=hub
exports.redirectService = async (req, res) => {
	try {
	const service = await Service.findById(req.params.id);
	const approvedOrUnset = !service?.status || service.status === 'approved';
	if (!service || !service.isActive || !approvedOrUnset) return res.status(404).send('Service not found');
		const url = new URL(service.link);
		url.searchParams.set('utm_source', 'hub');
		return res.redirect(url.toString());
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Admin: create service
exports.createService = async (req, res) => {
	try {
		const data = req.body;
	const created = await Service.create(data);
	res.status(201).json(created);
	} catch (err) {
			console.error('Create service error:', err);
			res.status(400).json({ message: 'Invalid service data' });
	}
};

// Admin: update service
exports.updateService = async (req, res) => {
	try {
		const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
	if (!updated) return res.status(404).json({ message: 'Service not found' });
	res.json(updated);
	} catch (err) {
			console.error('Update service error:', err);
			res.status(400).json({ message: 'Invalid update data' });
	}
};

// Admin: delete service
exports.deleteService = async (req, res) => {
	try {
		const deleted = await Service.findByIdAndDelete(req.params.id);
	if (!deleted) return res.status(404).json({ message: 'Service not found' });
	res.json({ message: 'Service deleted' });
	} catch (err) {
			console.error('Delete service error:', err);
			res.status(400).json({ message: 'Invalid delete request' });
	}
};

// User: submit a service (creates pending)
exports.submitService = async (req, res) => {
	try {
		const payload = { ...req.body, status: 'pending', isActive: false, submittedBy: req.user?.id };
		const created = await Service.create(payload);
		res.status(201).json(created);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Admin: list pending services
exports.listPending = async (req, res) => {
	try {
		const items = await Service.find({ status: 'pending' }).sort({ createdAt: -1 }).populate('submittedBy', 'email');
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Admin: approve service
exports.approveService = async (req, res) => {
	try {
		const updated = await Service.findByIdAndUpdate(req.params.id, { status: 'approved', isActive: true }, { new: true });
		if (!updated) return res.status(404).json({ message: 'Service not found' });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Admin: reject service
exports.rejectService = async (req, res) => {
	try {
		const updated = await Service.findByIdAndUpdate(req.params.id, { status: 'rejected', isActive: false }, { new: true });
		if (!updated) return res.status(404).json({ message: 'Service not found' });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Authenticated user: list own submissions
exports.listMine = async (req, res) => {
	try {
		const mine = await Service.find({ submittedBy: req.user.id }).sort({ createdAt: -1 });
		res.json(mine);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
