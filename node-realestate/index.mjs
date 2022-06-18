import repl from "repl";
import axios from "axios";
import cheerio from "cheerio";

const propertySalesIndexUrl = "https://valuation.property.nsw.gov.au/embed/propertySalesInformation";
const propertySalesIndexResponse = await axios.get(propertySalesIndexUrl);
const $ = cheerio.load(propertySalesIndexResponse.data);

const buttons = $(".btn-sales-data")

const replServer = repl.start("$ ");
replServer.context.axios = axios;
replServer.context.cheerio = cheerio;
replServer.context.propertySalesIndexUrl = propertySalesIndexUrl;
replServer.context.propertySalesIndexResponse = propertySalesIndexResponse;
replServer.context.$ = $;
replServer.context.buttons = buttons;

const result = buttons.map((i, elm) => {
  console.log(elm)
    const text = $(elm).text()
    return {
      link: elm.attribs.href,
      text,
    }
  });

replServer.context.result = Array.from(result)


