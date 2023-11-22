// Function to read an image from the clipboard and set it to the file input
async function setImageToInputFromClipboard(fileInputElement) {
    try {
        // fileInputElement.focus();
        const clipboardItems = await navigator.clipboard.read();
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                if (type.startsWith("image/")) {
                    const blob = await clipboardItem.getType(type);
                    let container = new DataTransfer();
                    let file = new File([blob], "clipboard-image.png", { type: type, lastModified: new Date().getTime() });
                    container.items.add(file);
                    fileInputElement.files = container.files;
                    console.log(fileInputElement.files);
                    return { success: true};
                }
            }
        }
    } catch (e) {
        console.error("Error reading image from clipboard:", e);
        console.trace();
        return { success: false, error: e };
    }
    return { success: false, error: "No image in clipboard" };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "uploadImageFromClipboard") {
        let fileInputElement;
        console.log(message.targetElementId);
        const targetElement = document.querySelector(`[frameId='${message.targetElementId}']`);

        if (targetElement && targetElement.tagName === "INPUT" && targetElement.type === "file") {
            fileInputElement = targetElement;
        } else {
            fileInputElement = document.querySelector('input[type="file"]');
        }

        if (fileInputElement) {
            const success = await setImageToInputFromClipboard(fileInputElement);
            sendResponse(success);
        } else {
            sendResponse({ success: false, error: "File input not found" });
        }
    }
    return true;
});



function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}