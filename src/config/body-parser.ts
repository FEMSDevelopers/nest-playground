export type BodyParseConfig = {
  limit: number;
  type: string;
};

const bodyParseConfig: BodyParseConfig = {
  limit: 500 * 1024,
  type: '*/json',
};

export default bodyParseConfig;
