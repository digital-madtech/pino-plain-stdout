import build from 'pino-abstract-transport';

export default async function (opts) {
  return build(
    async function (source) {
      for await (let obj of source) {
        if (obj.err) {
          // error logs
          process.stderr.write(`|${obj.level}|${(obj.rid || 'na')}|${obj.msg}. Err = ${(obj?.err?.message || 'No message')}. Stack: ${(obj?.err?.stack || '').replace('\n', ',')}\n`);
        } else {
          process.stdout.write(`|${obj.level}|${(obj.rid || 'na')}|${obj.msg}\n`);
        }
      }
    },
    {
      async close(err) {
        console.error(err);
      },
    },
  );
}
