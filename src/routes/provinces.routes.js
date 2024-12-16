import express from 'express';

const router = express.Router();

// Define resource-specific routes
router.get('/', async (req, res) => {
    res.json({ message: 'Provincias' });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.json({ message: 'Provincia: ' + id });
});

export default router;
 