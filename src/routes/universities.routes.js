import express from 'express';

const router = express.Router();

// Define resource-specific routes
router.get('/', async (req, res) => {
    res.json({ message: 'Universities' });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.json({ message: 'University: ' + id });
});

export default router;
