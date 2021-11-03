import { Manufacturer } from "./manufacturer";
import { Consumer } from "./consumer";
import { Delivery } from "./delivery";
import { Period } from "./period";
// @ts-ignore
import { createArrayCsvWriter as createCsvWriter } from "csv-writer";

const manufacturer: Manufacturer = new Manufacturer();
const consumer: Consumer = new Consumer();
const delivery: Delivery = new Delivery();

let generatedGoodsPeriod: Period = new Period(3);
let neededGoodsPeriod: Period = new Period(3);
let sumDeliveryEfficiency: number = 0;

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

let records: Array<Array<number>> = [];

for (let i: number = 0; i < 10; i++) {
    let generatedGoodsCount: number = manufacturer.getGeneratedGoodsCount();
    let neededGoodsCount: number = consumer.getNeededGoodsCount();

    delivery.transport(manufacturer, consumer);

    sumDeliveryEfficiency += delivery.getEfficiency();
    const avgSumDeliveryEfficiency: number = Math.floor(
        sumDeliveryEfficiency / (i + 1)
    );

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
