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


