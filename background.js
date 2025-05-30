// background.js

// Function to check and block the webpage if the URL is in linksArray
const checkAndBlockPage = async (details) => {
    const { linksArray } = await chrome.storage.sync.get('linksArray');
    const currentURL = details.url;
  
    // Check if the current URL matches any in the linksArray
    if (linksArray && linksArray.some(link => currentURL.includes(link))) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        func: blockPage
      });
    }
  };
  
  // Add event listener for completed web navigation
  chrome.webNavigation.onCompleted.addListener(checkAndBlockPage, { url: [{ urlMatches: 'https?://*/*' }] });
  
  // Function to block the page by modifying the body content
  function blockPage() {
    document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center;'>BLOCKIT</h1>";
  }
  