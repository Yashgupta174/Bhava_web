export default function handler(req, res) {
  res.status(200).json({ 
    success: true, 
    message: "Bhava API (Serverless) is active!",
    timestamp: new Date().toISOString()
  });
}
