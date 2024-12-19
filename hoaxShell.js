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
  file.push(...args);
  return
}

const executeLs = function () {
  return file.join("  ");
}

const executeRm = function (args) {
  const fileName = args.join(" ")
  return file.filter((element) => element !== fileName).join(" ");
}

const runCommand = function (commandString) {
  const [command, ...args] = commandString.split(" ");
  const listOfCallbacks = [executeCd, executePwd, executeEcho,
    executeExit, executeLs, executeTouch, executeRm];
  const listOfCommands = ['cd', 'pwd', 'echo', 'exit', 'ls', 'touch', 'rm'];

  // use array.find
  // cd .., rm
  const index = listOfCommands.indexOf(command);
  return listOfCallbacks[index](args);

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
