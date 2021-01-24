
function isProdEnvironment() {
  return process.env.ENV === 'production';
}

function isLocalEnvironment() {
  return process.env.ENV === 'local';
}

export { isProdEnvironment, isLocalEnvironment };
