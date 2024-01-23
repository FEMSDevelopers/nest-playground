export type ServerConfig = {
  host: string;
  port: number;
  cors: boolean;
};

const ServerConfig: ServerConfig = {
  host: process.env.HOST || '127.0.0.1',
  port: parseInt(process.env.PORT) || 3001,
  cors: Boolean(process.env.CORS) || false,
};

export default ServerConfig;
