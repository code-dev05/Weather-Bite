import XLSX from "xlsx";
import axios from "axios";

const workbook = XLSX.readFile("Weather Bite Data.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let rows = []
const range = XLSX.utils.decode_range(sheet["!ref"]);
for (let rowNum = range.s.r + 1; rowNum <= 24; rowNum++) {
    let row = []
    let cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 0});
    let item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 1});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 2});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 3});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 4});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    item = item.split("\n");
    item = item.filter(i => i !== '')
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 5});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);

    cellAddress = XLSX.utils.encode_cell({r: rowNum, c: 6});
    item = sheet[cellAddress] ? sheet[cellAddress].v : "";
    row.push(item);
    rows.push(row)
}

console.log(rows);

const pushData = async () => {
    for (let row of rows) {
        const product = await axios.post("http://localhost:3000/api/v1/food/new", {
            weather: row[0],
            foodName: row[1],
            description: row[2],
            nutrition: row[3],
            recipe: row[4],
            image: row[5],
            video: row[6],
        })
    }
}

pushData()
