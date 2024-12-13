const Registration = require('../models/studentInfo'); // Assuming the schema is in models/Registration.js
const validateRegistration=async(req,res,next)=>{
    const {body}=req
    const { name, mobile, email, higherQualification, domain, duration, mode, reference, cv } = req.body;

if (!name || !mobile || !email || !higherQualification || !domain || !duration || !mode || !reference ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // 2. Validate mobile number (10 digits)
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number' });
  }

  // 3. Validate email address using a regex
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }
  // 4. Check if mobile number is unique
  const existingMobile = await Registration.findOne({ mobile });
  if (existingMobile) {
    return res.status(400).json({ error: 'This mobile number is already registered.' });
  }
  // 5. Check if email is unique
  const existingEmail = await Registration.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: 'This email is already registered.' });
  }

  // 6. Validate higher qualification
  const validQualifications = ['High School', 'Undergraduate', 'Postgraduate', 'Doctorate'];
  if (!validQualifications.includes(higherQualification)) {
    return res.status(400).json({ error: 'Invalid higher qualification. Choose one from: High School, Undergraduate, Postgraduate, Doctorate.' });
  }

      // 7. Validate mode of study (should be either 'online' or 'offline')
    const validModes = ['online', 'offline'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode of study. Choose either online or offline.' });
    }

    // 8. Validate the duration (1-12 months)
  if (duration < 1 || duration > 12) {
    return res.status(400).json({ error: 'Duration must be between 1 and 12 months.' });
  }
   // If everything is valid, proceed to the next middleware or route handler
next()

}
module.exports=validateRegistration