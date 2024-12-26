let continueToShell = true;
let shellPrompt = 'sanika//hoaxShell ';
let currentDirectory = '~/';
const symbol = ' %';
const listOfFiles = [];

const executeCd = arguments => {
  if (arguments.length === 0) {
    return "Error : no dirctory specified.";
  }

  currentDirectory = currentDirectory.concat("/", arguments.join("/"));
  shellPrompt = shellPrompt.concat("/", arguments);
  return;
};

const executePwd = () => currentDirectory;

const executeEcho = (arguments) => arguments.join(" ");

const executeExit = () => {
  continueToShell = false;
  return "Shell terminated....\n";
};

const executeTouch = (arguments) => {
  listOfFiles.push(...arguments);
  return;
};

const executeLs = () => listOfFiles.join("  ");

const executeRm = (arguments) => {
  const fileName = arguments.join(" ");
  const indexOfFile = listOfFiles.indexOf(fileName);
  listOfFiles.shift(indexOfFile, 1);

  return;
};

const executeCommand = (commandMapping) => {
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

const executeDeno = () => {
  console.log("deno/nmydeno");
}

const getCurrentCommand = executeCommand([
  ['cd', executeCd],
  ['pwd', executePwd],
  ['echo', executeEcho],
  ['ls', executeLs],
  ['touch', executeTouch],
  ['rm', executeRm],
  ['exit', executeExit],
  ['deno', executeDeno]
]);

const executeShell = () => {
  while (continueToShell) {
    const userCommand = prompt(shellPrompt + symbol);
    if (!userCommand.trim()) {
      continue;
    }

    const resultOfRunningCommand = getCurrentCommand(userCommand);

    if (resultOfRunningCommand !== undefined) {
      console.log(resultOfRunningCommand);
    }
  }
};

executeShell();