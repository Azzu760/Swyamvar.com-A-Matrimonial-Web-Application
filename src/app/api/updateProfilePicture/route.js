import prisma from "../../../lib/prisma";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Ensure the upload folder exists
const uploadsDir = "./public/uploads/";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Ensure 'uploads' folder is inside 'public'
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4() + path.extname(file.originalname); // Create a unique filename
    cb(null, uniqueFilename); // Save the unique filename
  },
});

const upload = multer({ storage });

// PUT method to handle profile picture update
export const PUT = async (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "Error uploading file" });
        return reject(err); // Reject the promise if error occurs
      }

      // Ensure the file is available
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return reject(new Error("No file uploaded"));
      }

      const { userId } = req.body; // Get userId from the request body
      const profilePicturePath = `/uploads/${req.file.filename}`; // Construct the file path

      try {
        // Update the user's profile picture URL in the database
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            profilePicture: profilePicturePath, // Save the file path or URL
          },
        });

        res.status(200).json({
          profilePicture: updatedUser.profilePicture, // Return updated profile picture URL
        });

        resolve(); // Resolve the promise once the response is sent
      } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Internal server error" });
        reject(error); // Reject the promise if error occurs during DB operation
      }
    });
  });
};
