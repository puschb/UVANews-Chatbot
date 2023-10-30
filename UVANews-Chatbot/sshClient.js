"use strict";
import SSH2Promise from 'ssh2-promise';
const host = 'portal01.cs.virginia.edu';
const gpuHost = 'gpusrv01';


export async function getQuery(username, password, query, path) {
  const command = `python3 ${path} "${query}"`;
  return await runCommandOnGpuServer(username, password, command);
}


export async function update(username, password, path) {
  const command = `python3 ${path}`;
  return await runCommandOnGpuServer(username, password, command);
}

async function runCommandOnGpuServer(username, password, command) {
  const middleServer = {
    host: host,
    username: username,
    password: password,
  };

  const targetServer = {
    host: gpuHost,
    username: username,
    password: password,
  };
  const conn = new SSH2Promise([middleServer,targetServer]);
  try {
    const result = await conn.exec(command);
    //const parseResult = result ? JSON.parse(result) : null
    conn.close()
    return result;
    
  } catch (error) {
    conn.close()
    throw error;
  } 
}

