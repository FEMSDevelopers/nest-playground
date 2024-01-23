import ddTrace from 'dd-trace';
let tracer;

if (process.env.DD_ENABLED === 'true') {
  // eslint-disable-next-line no-console
  console.log('DataDog initialization');

  tracer = ddTrace.init();

  tracer.use('express', {
    blocklist: process.env.DD_APM_IGNORE_RESOURCES?.split(',') ?? [],
    service: process.env.DD_SERVICE,
  });
}

export default tracer;
