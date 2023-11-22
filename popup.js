// Retrieve the button and status div elements
const uploadButton = document.getElementById('uploadButton');
const statusDiv = document.getElementById('status');

// Function to send a message to the content script and handle the response
async function uploadImage() {
    try {
        // Query the active tab
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        // Check if a tab is found
        if (!tab) {
            throw new Error('No active tab found');
        }

        // Send a message to the content script in the active tab
        let response = await chrome.tabs.sendMessage(tab.id, {action: "uploadImageFromClipboard"});

        // Update the status based on the response
        if (response && response.success) {
            statusDiv.textContent = 'Image uploaded successfully!';
        } else {
            statusDiv.textContent = 'Failed to upload image, err:' + response;
        }
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        statusDiv.textContent = 'An error occurred: ' + error;
    }
}

// Add a click event listener to the upload button
uploadButton.addEventListener('click', () => {
    statusDiv.textContent = 'Requesting upload...';
    uploadImage();
});
