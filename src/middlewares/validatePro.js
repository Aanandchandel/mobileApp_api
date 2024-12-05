const validateProduct = (req, res, next) => {
    const { name, price, quantity } = req.body;
  
    // Check  required fields
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: 'provide all fields' });
    }
    if (typeof price !== 'number' ) {
      console.log(typeof price)
      return res.status(400).json({ message: 'price type should be number' });
    }
    if (typeof quantity !== 'number' ) {
      return res.status(400).json({ message:"quantity type should be number" });
    }
    next();
  };
  
  module.exports = validateProduct;
  