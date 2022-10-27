const fs = require('fs');
const { stat, readdir, writeFile } = fs.promises;
const os = require('os')
const path = require('path');


// 小练习（输出一个文件夹下的文件目录）

async function getSize(filePath) {
  const stats = await stat(filePath);
  if (stats.isFile()) {
    return stats.size
  } else if (stats.isDirectory()) {
    const arr = await readdir(filePath)
    let size = 0;
    for (let i = 0; i < arr.length; i++) {
      const basename = arr[i];
      size += await getSize(path.resolve(filePath, basename));
    }
    return size
  } else {
    throw Error("仅支持文件与文件夹的size计算")
  }
}

async function readDirInfo(from, to) {
  const fromPath = path.resolve(__dirname, from);
  const toPath = path.resolve(__dirname, to);
  const depth = 0
  async function writeInfo(filePath, depth) {
    const stats = await stat(filePath)
    let space = '';
    for (let i = 0; i < depth; i++) {
      space += '  ';
    }
    if (stats.isFile()) {
      const content = `${space}【文件名：${path.basename(filePath)}】，【size：${(stats.size / 1024).toFixed(2)}KB】${os.EOL}`
      await writeFile(toPath, content, { flag: 'a' })
    } else if (stats.isDirectory()) {
      const content = `${space}【文件夹名：${path.basename(filePath)}】，【size：${(await getSize(filePath) / 1024).toFixed(2)}KB】${os.EOL}`
      await writeFile(toPath, content, { flag: 'a' });
      const childrenFile = await readdir(filePath);
      childrenFile.forEach((itemPath) => {
        writeInfo(path.resolve(filePath, itemPath), depth + 1)
      })
    }
  }



  await writeInfo(fromPath, depth);
}



// readDirInfo('./src', './outputMain.txt')


//文件流
function pipe(origin, destination) {
  const writableStream = fs.createWriteStream(path.resolve(__dirname, destination));
  fs.createReadStream(path.resolve(__dirname, origin))
    .pipe(writableStream)
}

// pipe('./origin/abc.txt','./destination/abc copy1.txt');

function myPipe(origin, destination) {
  const ori = path.resolve(__dirname, origin);
  const des = path.resolve(__dirname, destination);
  const readableStream = fs.createReadStream(ori);
  const writableStream = fs.createWriteStream(des);
  let flag = true;

  function write(flag,chunk) {
    if(flag) flag = writableStream.write(chunk);
    else{
      readableStream.pause();
      writableStream.on('drain',() => {
        flag = true;
        readableStream.resume();
      })
    }
  }
  readableStream.on('data', chunk => {
    write(flag,chunk)
  })
  readableStream.on('close',()=>{
    writableStream.end();
  })
}

myPipe('./origin/abc.txt','./destination/abc copy2.txt')


// 复制图片
const readable = fs.createReadStream(path.resolve(__dirname,'img/美女.webp'))
readable.on('data',chunk => {
  console.log(Buffer.from(chunk))
  console.log(Buffer.from(chunk.toString('utf-8')))
})
const writable = fs.createWriteStream(path.resolve(__dirname,'destination/美女.webp'))

readable.pipe(writable);