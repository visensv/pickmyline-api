const { GoogleSpreadsheet } = require("google-spreadsheet");
const SPREADSHEET_ID = process.env.SPREADSHEET_ID
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const saveToGoogleSheet = (req, res) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY.replace(/\n/g, '\n'),
            });
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsByIndex[0];
            await sheet.addRow(row);
            res.status(200).json({
                success: true,
                data: "Data collected",
            });
        } catch (e) {
            console.error('Error: ', e);
            res.status(400).json({
                success: false,
                error: 'An error occured while saving data',
            });
        }
    };

    const newRow = { Icon: "Icon", Action: "Clicked" };
    appendSpreadsheet(newRow);
}



module.exports = { saveToGoogleSheet };
