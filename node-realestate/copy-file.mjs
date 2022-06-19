import axios from "axios";
import unzip from "unzip-stream";
import AWS from "./aws.mjs";

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export async function copyFile(key, url) {
  try {
    const { data } = await axios.get(url, { responseType: "stream" });

    const upload = await s3.upload({
      Bucket: "psi-imports",
      Key: key,
      Body: data,
    }).promise();

    return upload.Location;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

export function loadFile(key) {
  return s3
    .getObject({
      Bucket: "psi-imports",
      Key: key,
    })
    .createReadStream()
}

export async function streamToString(stream) {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
}

async function filePointer(path, stream) {
  const data = await streamToString(stream);
  return {
    path,
    data,
  }
}

export async function processPsiArchive(key) {
  const entries = [];

  return new Promise((resolve, reject) => {
    loadFile(key)
      .pipe(unzip.Parse())
      .on("entry", (entry) => {
        const { path, type } = entry;
        if (!path.toLowerCase().match(/\.dat$/)) {
          return entry.autodrain();
        }
        entries.push(filePointer(path, entry));
      })
      .on("finish", async () => {
        const files = await Promise.all(entries);
        resolve(files);
      });
  });
}

