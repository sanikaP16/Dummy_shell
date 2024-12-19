let continueToShell = true;
let shellPrompt = 'sanika//hoaxShell ';
let currentDirectory = '~/';
const symbol = ' %';
const listOfFiles = [];

const executeCd = function (arguments) {
  if (arguments.length === 0) {
    return "Error : no dirctory specified.";
  }

  currentDirectory = currentDirectory.concat("/", arguments.join("/"));
  shellPrompt = shellPrompt.concat("/", arguments);
  return;
};

const executePwd = function () {
  return currentDirectory;
};

const executeEcho = function (arguments) {
  return arguments.join(" ");
};

const executeExit = function () {
  continueToShell = false;
  return "Shell terminated....\n";
};

const executeTouch = function (arguments) {
  listOfFiles.push(...arguments);
  return;
};

const executeLs = function () {
  return listOfFiles.join("  ");
};

const executeRm = function (arguments) {
  const fileName = arguments.join(" ");
  const indexOfFile = listOfFiles.indexOf(fileName);
  listOfFiles.shift(indexOfFile, 1);

  return;
};

const executeCommand = function (commandMapping) {
  return function (commandString) {
    const [command, ...arguments] = commandString.split(" ");

    const doesCommandExits = commandMapping.find(
      (element) => element[0] === command);

    if (doesCommandExits) {
      return doesCommandExits[1](arguments);
    }

    return "no such command...";
  };
};

const getCurrentCommand = executeCommand([
  ['cd', executeCd],
  ['pwd', executePwd],
  ['echo', executeEcho],
  ['ls', executeLs],
  ['touch', executeTouch],
  ['rm', executeRm],
  ['exit', executeExit]
]);

const executeShell = function () {
  while (continueToShell) {
    const userCommand = prompt(shellPrompt + symbol);
    if (!userCommand.trim()) continue;

    const resultOfRunningCommand = getCurrentCommand(userCommand);

    if (resultOfRunningCommand !== undefined) {
      console.log(resultOfRunningCommand);
    }
  }
}();