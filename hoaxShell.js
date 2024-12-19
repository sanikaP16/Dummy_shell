let continueToShell = true;
const shellPrompt = 'hoaxShell ';
let currentDirectory = '~/';
const symbol = '% ';
const file = [];

const executeCd = function (args) {
  if (args.length === 0) {
    return "Error : no dirctory specified.";
  }

  currentDirectory = currentDirectory.concat("/", args.join("/"));

  return;
}

const executePwd = function () {
  return currentDirectory;
}

const executeEcho = function (args) {
  return args.join(" ");
}

const executeExit = function () {
  continueToShell = false;
  return "Thank you....\n";
}

const executeTouch = function (args) {
  file.push(args);
  return
}

const executeLs = function () {
  return file.join("  ")
}

const runCommand = function (commandString) {
  const [command, ...args] = commandString.split(" ");
  const listOfCallbacks = [executeCd, executePwd, executeEcho,
    executeExit, executeLs, executeTouch];
  const listOfCommands = ['cd', 'pwd', 'echo', 'exit', 'ls', 'touch']
  // use array.find

  for (let index = 0; index < listOfCommands.length; index++) {
    if (listOfCommands[index] === command) {
      return listOfCallbacks[index](args);
    }
  }

  return "no such command...";
}

const executeShell = function () {
  while (continueToShell) {
    const userCommand = prompt(shellPrompt + symbol);
    if (!userCommand.trim()) continue;

    const resultOfRunningCommand = runCommand(userCommand);
    if (resultOfRunningCommand !== undefined) {
      console.log(resultOfRunningCommand);
    }
  }
}

executeShell();
