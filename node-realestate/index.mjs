import repl from "repl";
import axios from "axios";
import cheerio from "cheerio";
import unzip from "unzip-stream";
import { listPsiFiles } from "./listPsiFiles.mjs";
import { copyFile, loadFile, streamToString, processPsiArchive } from "./copy-file.mjs";
import { rowToRecord } from "./psi-convert.mjs"; 

const links = JSON.parse(
  '[{"link":"https://www.valuergeneral.nsw.gov.au/__psi/weekly/20220103.zip","text":"03 Jan 2022"},{"link":"https://www.valuergeneral.nsw.gov.au/__psi/weekly/20220110.zip","text":"10 Jan 2022"},{"link":"https://www.valuergeneral.nsw.gov.au/__psi/weekly/20220117.zip","text":"17 Jan 2022"},{"link":"https://www.valuergeneral.nsw.gov.au/__psi/weekly/20220124.zip","text":"24 Jan 2022"}]'
);

async function importData({ name, link }) {
  const parts = link.split("/");
  const dataType = parts[parts.length-2];
  const [filename, extension] = parts[parts.length-1].split(".");

  const location = await copyFile(`${dataType}/${filename}.${extension}`, link) 

  console.log({
    dataType, filename, extension, location,
  })

  return {
    dataType,
    filename,
    extension,
    location
  };
}

const importedData = [
  {
    dataType: 'weekly',
    filename: '20220103',
    extension: 'zip',
    location: 'https://psi-imports.ap-south-1.linodeobjects.com/weekly/20220103.zip'
  },
  {
    dataType: 'weekly',
    filename: '20220110',
    extension: 'zip',
    location: 'https://psi-imports.ap-south-1.linodeobjects.com/weekly/20220110.zip'
  },
  {
    dataType: 'weekly',
    filename: '20220117',
    extension: 'zip',
    location: 'https://psi-imports.ap-south-1.linodeobjects.com/weekly/20220117.zip'
  },
  {
    dataType: 'weekly',
    filename: '20220124',
    extension: 'zip',
    location: 'https://psi-imports.ap-south-1.linodeobjects.com/weekly/20220124.zip'
  }
];

/*
loadFile("weekly/20220103.zip").pipe(unzip.Parse()).on("entry", (entry) => console.log(entry.path))
*/

const link = importedData[0];
const currentKey = `${link.dataType}/${link.filename}.${link.extension}`;

const files = await processPsiArchive(currentKey);

// files[0].data.split("\n").filter(row => row.length).map((row) => rowToRecord(row.split(";")))
// files.map(fileToRecords).reduce((acc, val) => ([...acc, ...val]), [])

function fileToRecords({ data }) {
  return data
    .split("\n")
    .filter(row => row.length)
    .map(row => rowToRecord(row.split(";")))
}

const replServer = repl.start("$ ");
const context = {
  axios,
  cheerio,
  links,
  copyFile,
  importData,
  unzip,
  loadFile,
  files,
  // result,
  rowToRecord,
  importedData,
  fileToRecords,
}

Object.keys(context).forEach((k) => { replServer.context[k] = context[k]; });

