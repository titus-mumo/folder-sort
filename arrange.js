const fs = require('fs');
const path = require('path');

// Define target and root folders
const targetFolder = "/Users/saki/Desktop/Coding Projects";
const rootFolder = "/Users/saki/Desktop";

// Function to create a folder if it doesn't already exist
const createFolder = (folderPath) => {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folder created: ${folderPath}`);
        } else {
            console.log(`${folderPath} already exists`);
        }
    } catch (error) {
        console.error(`Error creating folder: ${folderPath}`, error);
    }
};

createFolder(targetFolder);

// List of subfolders to create under the target folder
const targetFolderNames = ['Python Projects', 'JavaScript Projects', 'TypeScript Projects', 'Other'];

// Create subfolders under the target folder
targetFolderNames.map((item) => {
    let targetFolderFullName = path.join(targetFolder, item);
    createFolder(targetFolderFullName);
});

// Function to move folders to the corresponding target folder based on the file type inside
const moveFolder = (folderPath, folderName, extension) => {
    let destinationFolder = '';

    // Determine which target subfolder the folder should be moved to
    if (extension === '.py'  || extension === '.txt') {
        destinationFolder = 'Python Projects';
    } else if (extension === '.js') {
        destinationFolder = 'JavaScript Projects';
    } else if (extension === '.ts') {
        destinationFolder = 'TypeScript Projects';
    } else {
        destinationFolder = 'Other';
    }

    let targetPath = path.join(targetFolder, destinationFolder, folderName);

    // Move the folder to the correct folder
    try {
        fs.renameSync(folderPath, targetPath);
        console.log(`Moved folder: ${folderName} -> ${targetPath}`);
    } catch (err) {
        console.error(`Error moving folder: ${folderName}`, err);
    }
};

// Looping over the directories in the Desktop folder
fs.readdir(rootFolder, function (err, files) {
    if (err) {
        return console.error(`Error reading directory: ${rootFolder}`, err);
    }

    files.forEach(function (file) {
        let filePath = path.join(rootFolder, file);
        let stats = fs.statSync(filePath);

        // If it's a directory and not the target folder, check inside for files
        if (stats.isDirectory() && !filePath.endsWith('Coding Projects')) {
            fs.readdir(filePath, function (err, subFiles) {
                if (err) {
                    return console.log(`Error reading subdirectory: ${filePath}`, err);
                }
                // Check for specific file extensions in the folder
                for (let subFile of subFiles) {
                    let subFilePath = path.join(filePath, subFile);

                    // Only check if it's a file
                    if (fs.statSync(subFilePath).isFile()) {
                        // Move the folder based on the file extension
                        if (subFile.endsWith('.py') || subFile.endsWith('.txt') || subFile.endsWith('.js') || subFile.endsWith('.ts')) {
                            moveFolder(filePath, file, path.extname(subFile));
                            break;  // Stop iterating once the folder has been moved
                        }
                    }
                }
            });
        }
    });
});
