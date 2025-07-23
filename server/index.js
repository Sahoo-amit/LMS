import app from "./app";
import {createServer} from 'http'

export default function handler(req, res) {
  const server = createServer(app);
  return server.emit("request", req, res);
}