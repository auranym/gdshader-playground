// Detect if not mobile, and if so, add theme class to body
if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
  document.querySelector('body').classList.add('desktop');
}

window.ENGINE.startGame();
/** Used to send code to Godot app. */
window.shaderCode = '';
window.updateShell = () => document.querySelector('p').innerHTML = window.shaderCode;