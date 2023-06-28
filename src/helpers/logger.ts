const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    rose: '\x1b[35m',
    cyan: '\x1b[36m',
  };
  

function loggerStatus(any: unknown){
    console.log(`\n${colors.rose}>> Status: ${colors.reset}${any}`);
}

function loggerError(any: unknown){
    console.error(`\n${colors.red}!! Error: ${colors.reset}${any}`);
}

export {loggerStatus, loggerError}