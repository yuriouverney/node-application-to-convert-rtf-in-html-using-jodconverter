const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const xl = require('excel4node');
const axios = require('axios');
const FormData = require('form-data');


class RtfToHtmlService {
    async startProcess() {
        const rows = await readXlsxFile('id-rtf-excel.xlsx');
        const arrayObjs = [];

        for (const row of rows) {
            const id = row[0];
            const rtfText = row[1];
            const outputRtfFileName = 'rtf-code.rtf';
            try {
            await this.generateRtfFile(outputRtfFileName, rtfText, id)
            const html = await this.htmlCode(outputRtfFileName);
            arrayObjs.push({id: id.toString(), parecer: html});
            if (rows.length == arrayObjs.length) {
                this.createExcelFormatedData(arrayObjs);
            }
            } catch (error) {
                console.error(`Error to convert RTF to HTML in line ${id}: ${error.message}`);
            }
        }
        }

        async generateRtfFile(outputRtfFileName, rtfText, id) {
            console.log(`start write file for id=${id}`)
            let writer = fs.createWriteStream(outputRtfFileName);
            await new Promise(resolve => setTimeout(resolve, 2000));
            writer.write(rtfText);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return writer;
        }
    
        async htmlCode(outputRtfFileName) {
            const form = new FormData();
            form.append('data', fs.createReadStream(outputRtfFileName));
            try {
              const response = await axios({
                method: 'post',
                url: 'http://localhost:8080/lool/convert-to/html',
                data: form,
                headers: { ...form.getHeaders() },
              });
              return response.data;
            } catch (error) {
              console.error(`Error to convert RTF to HTML: ${error.message}`);
              throw error;
            }
          }
    
    createExcelFormatedData(data) {
        const headingColumnNames = [
            'id',
            'parecer',
        ];
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Worksheet Name');
        
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++).string(heading);
        });
        
        let rowIndex = 2;
        data.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
            ws.cell(rowIndex, columnIndex++).string(record[columnName]);
            });
            rowIndex++;
        });
        
        wb.write('excel-file.xlsx');
        console.log('Process finished')
        }
}

module.exports = RtfToHtmlService;