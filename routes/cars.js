const express = require('express');
const Car = require('../models/car');
const router = express.Router();

// POST /api/cars/add - Add a new car
router.post('/add', async (req, res) => {
    try {
        const { title, description, images, tags, car_type, company, dealer } = req.body;

        const newCar = new Car({
            title,
            description,
            images,
            tags,
            car_type,
            company,
            dealer,
        });

        await newCar.save();

        res.status(200).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ message: 'Failed to add car', error });
    }
});

// GET /api/cars/get - Retrieve all cars
router.get('/get', async (req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(400).json({ message: 'Failed to retrieve cars', error });
    }
});

router.get('/search', async (req, res) => {
  try {
      const { keyword } = req.query;

      // Validate that keyword is a string
      if (!keyword || typeof keyword !== 'string') {
          return res.status(400).json({ message: 'Invalid keyword for search' });
      }

      // Perform a case-insensitive search on title, description, and tags
      const cars = await Car.find({
          $or: [
              { title: { $regex: keyword, $options: 'i' } },
              { description: { $regex: keyword, $options: 'i' } },
              { tags: { $regex: keyword, $options: 'i' } },
          ],
      });

      res.status(200).json(cars);
  } catch (error) {
      console.error('Error searching cars:', error);
      res.status(500).json({ message: 'Failed to search cars', error });
  }
});

// GET /api/cars/:id - Retrieve a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(400).json({ message: 'Failed to retrieve car', error });
    }
});

// PUT /api/cars/update/:id - Update a car's details
router.put('/update/:id', async (req, res) => {
    try {
        const { title, description, images, tags, car_type, company, dealer } = req.body;
        const car = await Car.findById(req.params.id);

        if (!car) return res.status(404).json({ message: 'Car not found' });

        car.title = title || car.title;
        car.description = description || car.description;
        car.images = images || car.images;
        car.tags = tags || car.tags;
        car.car_type = car_type || car.car_type;
        car.company = company || car.company;
        car.dealer = dealer || car.dealer;

        await car.save();

        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(400).json({ message: 'Failed to update car', error });
    }
});

// DELETE /api/cars/delete/:id - Delete a car
router.delete('/delete/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(400).json({ message: 'Failed to delete car', error });
    }
});

module.exports = router;
