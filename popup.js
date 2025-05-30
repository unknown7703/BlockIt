//storage keys
const toggleStatus='blockIT_toggle_main';
const linksArray='blockIT_url_array';


//html elements
const optionsB= document.getElementById('options_button');
const mainToggle=document.getElementById('toggle_main');
const blockNew=document.getElementById('addBlock');

//storage helper

const setToggle =(toggle)=>{
  chrome.storage.sync.set({[toggleStatus]:toggle});
}
const getToggle =async()=>{
  const {[toggleStatus]:toggle}=await chrome.storage.sync.get(toggleStatus);
  return toggle;
}
//const setLink =(link)
//storage helper
const setLink = async (link) => {
  const { [linksArray]: currentLinks = [] } = await chrome.storage.sync.get(linksArray);
  if (!currentLinks.includes(link)) {
    currentLinks.push(link);
    chrome.storage.sync.set({ [linksArray]: currentLinks });
  }
};

// Add event listener for the 'BLOCK' button
blockNew.onclick = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const currentTabUrl = tabs[0].url;
    await setLink(currentTabUrl);
    document.getElementById('current_tab_text').textContent = `Blocked: ${currentTabUrl}`;
  });
};
//functions buttton
optionsB.onclick =()=>{
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

mainToggle.onchange =async(e)=>{
  const setTog=e.target.checked;
  await setToggle(setTog);
}

//sync
const syncToggle =async()=>{
  mainToggle.checked=await getToggle();
}
syncToggle();


