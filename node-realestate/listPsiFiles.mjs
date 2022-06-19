import axios from "axios";
import cheerio from "cheerio";

export async function listPsiFiles() {
  const propertySalesIndexUrl =
    "https://valuation.property.nsw.gov.au/embed/propertySalesInformation";
  const propertySalesIndexResponse = await axios.get(propertySalesIndexUrl);
  const $ = cheerio.load(propertySalesIndexResponse.data);

  const buttons = $(".btn-sales-data")
  return Array.from(
    buttons.map((i, elm) => {
      const text = $(elm).text()
      return {
        link: elm.attribs.href,
        text,
      }
    })
  );
}

