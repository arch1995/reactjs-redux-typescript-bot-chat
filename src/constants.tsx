export const DEFAULT_ACTIVE_TAB_KEY = 'main';

export const NEW_TAB = 'new_tab';

export const DEFAULT_CODE_VALUE = `
/**
 * Enter your every-time code here.
 * This function will run every time when user performs some action.
 * You can remove "async" keyword if you don't have any await function inside this function
 */
async function respond(inputText) {
  // BOT LOGIC GOES HERE
  // 'inputText' is the text entered 
  // by the user speaking to your bot
  
  // When you are done, return a string
  // you want to send back to the user
  return inputText;
}
`;