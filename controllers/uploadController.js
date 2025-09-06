const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    
    res.json({
      message: 'File uploaded successfully',
      filePath: `/uploads/avatars/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    
    res.json({
      message: 'File uploaded successfully',
      filePath: `/uploads/media/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadAvatar,
  uploadMedia
};