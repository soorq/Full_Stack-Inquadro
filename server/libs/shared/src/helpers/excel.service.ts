import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class ExcelService {
    async parseExcel(buffer: Buffer): Promise<any[]> {
        const data = xlsx.read(buffer, { type: 'buffer' });
        return Object.keys(data.Sheets).map(name => ({
            name, // Include the sheet name if needed
            data: xlsx.utils.sheet_to_json(data.Sheets[name], {
                defval: '',
                header: 1
            })
        }));
    }
}
