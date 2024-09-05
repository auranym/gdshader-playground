// Detect if not mobile, and if so, add theme class to body
if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
  document.querySelector('body').classList.add('desktop');
}

// Allow Godot app to signal when to detect console.error/log calls
// so the shell page can tell when the shader had a compilation error.
// This is not ideal, but there is not a way to check for compilation
// errors within Godot... yeah, it's a weird oversight.
console.defaultLog = console.log.bind(console);
console.defaultError = console.error.bind(console);
window.listenForConsole = () => {
  const errorParagraph = document.querySelector('#error');
  errorParagraph.innerText = '';
  errorParagraph.dataset.isError = 'false';
  const compileButton = document.querySelector('#compile');
  compileButton.disabled = true;
  compileButton.innerHTML = 'Compiling...';
  window.logs = [];
  window.errors = [];
  console.log = (...args) => {
    if (!/--Main Shader--/.test(args[0])) {
      logs.push(args[0]);
    }
  }
  console.error = (...args) => {
    // Only push the first error, since it is the most descriptive.
    if (errors.length === 0) {
      errors.push(args[0]);
    }
  }
}
window.stopListeningForConsole = () => {
  const compileButton = document.querySelector('#compile');
  compileButton.disabled = false;
  compileButton.innerHTML = 'Compile';
  if (window.logs.length > 0 || window.errors.length > 0) {
    const errorParagraph = document.querySelector('#error');
    errorParagraph.innerText = [
      ...errors,
      // Add a newline in between if there are both logs AND errors
      ...(errors.length > 0 && logs.length > 0 ? [''] : []),
      ...logs
    ].join('\n');
    errorParagraph.dataset.isError = 'true';
  }
  console.log = console.defaultLog;
  console.error = console.defaultError;
}

// Create shaderCode variable to send data between shell and app
window.shaderCode = '';

// Start the godot app!
window.ENGINE.startGame().then(() => {
  // Add getContents function to ace editor to access internal element
  // used for parsing the editor for friendly text format of the code.
  //
  // This is necessary since the web component doesn't have a way of
  // accessing the normal text content by default.
  // Yeah yeah I know, another weird oversight...
  const aceEditor = document.querySelector('ace-editor');
  aceEditor.getContents = () => {
    return ace.edit(aceEditor.querySelector("#code_editor_text_value")).getValue();
  }
  const update = () => {
    window.shaderCode = aceEditor.getContents();
    window.updateApp();
  }
  // Set up compile button
  document.querySelector('#compile').onclick = update;
  // Compile initial shader
  update();
});