import { Manufacturer } from "./manufacturer.js";
import { Consumer } from "./consumer.js";
import { Delivery } from "./delivery.js";
import { Period } from "./period.js";
import { createArrayCsvWriter as createCsvWriter } from "csv-writer";

const manufacturer = new Manufacturer();
const consumer = new Consumer();
const delivery = new Delivery();

let generatedGoodsPeriod = new Period(3);
let neededGoodsPeriod = new Period(3);
let sumDeliveryEfficiency = 0;

const csvWriter = createCsvWriter({
  fieldDelimiter: ";",
  alwaysQuote: true,
  path: "./task02/export.csv",
  header: [
    "Количество товара у производителя",
    "Количество необходимого потребителю товара",
    "Количество доставленного товара за день",
    "Количество произведенного товара за последние 3 дня",
    "Количество доставленного товара за последние 3 дня",
    "КПД посредника",
  ],
});

let records = [];

for (let i = 0; i < 10; i++) {
  let generatedGoodsCount = manufacturer.getGeneratedGoodsCount();
  let neededGoodsCount = consumer.getNeededGoodsCount();

  delivery.transport(manufacturer, consumer);

  sumDeliveryEfficiency += delivery.getEfficiency();
  const avgSumDeliveryEfficiency = Math.floor(sumDeliveryEfficiency / (i + 1));

  records.push([
    generatedGoodsCount,
    neededGoodsCount,
    delivery.getGoodsCount(),
    generatedGoodsPeriod.getSum(generatedGoodsCount),
    neededGoodsPeriod.getSum(neededGoodsCount),
    avgSumDeliveryEfficiency,
  ]);
}

csvWriter.writeRecords(records);
