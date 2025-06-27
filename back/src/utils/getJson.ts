const { ObjectId } = require('mongodb');
const fs = require('fs');
const readline = require('readline');

export async function getJson(inputPath, outputPath) {
  function convertOid(obj: any): any {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === '$oid' && typeof obj[key] === 'string') {
          return new ObjectId(obj[key]);
        } else {
          obj[key] = convertOid(obj[key]);
        }
      }
    }
    return obj;
  }
  async function convertJsonLinesToArray(
    inputPath: string,
    outputPath: string,
  ) {
    const fileStream = fs.createReadStream(inputPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const tempArray: string[] = [];

    for await (const line of rl) {
      if (!line.trim()) continue;

      try {
        const obj = JSON.parse(line);
        const fixed = convertOid(obj);
        tempArray.push(JSON.stringify(fixed));
      } catch (err) {
        console.error('Ошибка парсинга строки:\n', line);
      }
    }

    const finalJson = '[\n' + tempArray.join(',\n') + '\n]';

    fs.writeFileSync(outputPath, finalJson, 'utf-8');
    console.log(`✅ JSON-массив сохранён: ${outputPath}`);
  }

  const json = fs.readFileSync(inputPath, 'utf-8');
  const notLinedJson = await convertJsonLinesToArray(inputPath, outputPath);

  const jsonFormated = fs.readFileSync(outputPath, 'utf-8');
  const jsonData = JSON.parse(jsonFormated);

  return jsonData;
}
