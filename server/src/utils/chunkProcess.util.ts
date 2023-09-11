export async function chunkProcess<T>(args: {
  data: T[],
  process: (value: T) => any,
  chunkSize: number,
  isLogTime?: boolean,
}) {
  let chunkGroups: (T[])[] = [];
  let startTime = new Date().getTime();

  for (let i = 0; i < args.data.length; i += args.chunkSize) {
    chunkGroups.push(args.data.slice(i, i + args.chunkSize));
  }

  let output: any[] = [];

  for (let index = 0; index < chunkGroups.length; index++) {
    const group = chunkGroups[index];
    const data = await Promise.all(group.map((value => args.process(value))));
    output = [...output, ...data];
  }

  if (args.isLogTime) console.log('INFO', `Total time: ${Date.now() - startTime}ms`);
  return output;
}