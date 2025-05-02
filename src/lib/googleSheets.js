import { google } from "googleapis";
import { JWT } from "google-auth-library";

const auth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function saveOrUpdateWord(word) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "words!A2:B",
  });

  const rows = res.data.values || [];
  const index = rows.findIndex(
    (row) => row[0].toLowerCase() === word.toLowerCase()
  );

  if (index !== -1) {
    const currentValue = parseInt(rows[index][1] || "1", 10);
    const newValue = currentValue + 1;

    const updateRange = `words!B${index + 2}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: updateRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[newValue]],
      },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "words!A:B",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[word, 1]],
      },
    });
  }
}

export async function getWords() {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "words!A2:B",
  });

  return res.data.values.map(([word, count]) => ({
    text: word,
    value: parseInt(count),
  }));
}

export async function saveGeneralReport({ title, detail, email, phone }) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "general report!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[title, detail, email, phone]],
    },
  });
}

export async function saveTransportReport({
  title,
  detail,
  vehicleId,
  email,
  phone,
}) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "transport report!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[title, detail, vehicleId, email, phone]],
    },
  });
}

export async function saveLostfoundReport({
  title,
  detail,
  email,
  phone,
  imageUrls,
}) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const imageFormulas = imageUrls.map((url) => `=IMAGE("${url}")`);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "lostfound report!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[title, detail, email, phone, ...imageFormulas]],
    },
  });
}
