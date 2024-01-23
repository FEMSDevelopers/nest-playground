export class MqttConfig {
  core: {
    url: string;
    subTopics: string[];
  };
  web: {
    url: string;
    pubTopic: string;
  };
}

const mqttConfig: MqttConfig = {
  core: {
    url: process.env.MQTT_CORE_URL || 'mqtt://localhost:1883',
    subTopics: ['site/sub-topic'],
  },
  web: {
    url: process.env.MQTT_WEB_URL || 'mqtt://localhost:1884',
    pubTopic: 'site/sample-route',
  },
};

export default mqttConfig;
