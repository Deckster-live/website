/**
 * Deckster — homepage "Start a brief" form intake.
 * Based on github.com/jamiewilson/form-to-google-sheets
 *
 * One deployment serves one spreadsheet. This copy is bound to the
 * "contact" sheet and writes to the SHEET_NAME tab below. The careers
 * form has its own sheet and its own deployment — paste this same file
 * into that spreadsheet's Apps Script, set SHEET_NAME to its tab, and
 * deploy it separately.
 *
 * It never creates tabs or header rows. The tab's existing header row is
 * the schema: for each header, the matching posted field is written under
 * it. Matching ignores letter case, spaces and punctuation, so a header
 * "Name" matches a posted "name", and "Cover Letter" matches
 * "coverLetter". A "Timestamp" header is filled in automatically.
 *
 * Setup:
 *   1. Extensions > Apps Script, paste this in, Save.
 *   2. Function dropdown > initialSetup > Run, and authorize. This stores
 *      the spreadsheet id and grants the Sheets + send-mail permissions.
 *   3. Deploy > New deployment > Web app, Execute as: Me,
 *      Who has access: Anyone. Copy the /exec URL.
 *   4. After ANY edit here, publish a new version (Deploy > Manage
 *      deployments > pencil > Version: New version) or the live URL keeps
 *      running the old code.
 */

const SHEET_NAME = 'Sheet1'
const NOTIFY_EMAIL = 'yakshit@deckster.live'

const scriptProp = PropertiesService.getScriptProperties()

function initialSetup() {
  scriptProp.setProperty('key', SpreadsheetApp.getActiveSpreadsheet().getId())
}

// "Cover Letter", "coverLetter" and "cover_letter" all reduce to the same key.
function normalizeKey(key) {
  return String(key).trim().toLowerCase().replace(/[^a-z0-9]/g, '')
}

function lookupField(params, header) {
  const target = normalizeKey(header)
  const match = Object.keys(params).find(function (key) {
    return normalizeKey(key) === target
  })

  return match === undefined ? '' : params[match]
}

// A leading =, +, - or @ makes Sheets treat submitted text as a formula.
// Prefixing an apostrophe keeps it as plain text (the apostrophe isn't shown).
function sanitize(value) {
  if (typeof value !== 'string') return value
  return /^[=+\-@]/.test(value) ? "'" + value : value
}

function formatValue(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'd MMM yyyy, h:mm a')
  }
  return value === '' ? '—' : value
}

function sendNotification(subject, htmlBody) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: 'Deckster Live',
  })
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const key = scriptProp.getProperty('key')

    if (!key) {
      throw new Error(
        "No spreadsheet id stored — run 'initialSetup' once from the Apps Script editor."
      )
    }

    const doc = SpreadsheetApp.openById(key)
    const sheet = doc.getSheetByName(SHEET_NAME)

    if (!sheet) {
      const available = doc
        .getSheets()
        .map(function (s) {
          return s.getName()
        })
        .join(', ')

      throw new Error('Sheet tab "' + SHEET_NAME + '" not found. Tabs: ' + available)
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    // Visible in View > Executions if a column ever comes out blank.
    Logger.log('headers: %s', JSON.stringify(headers))
    Logger.log('received: %s', JSON.stringify(e.parameter))

    const newRow = headers.map(function (header) {
      if (normalizeKey(header) === 'timestamp') return new Date()
      return sanitize(lookupField(e.parameter, header))
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    const bullets = headers
      .map(function (header, index) {
        return '<li><strong>' + header + ':</strong> ' + formatValue(newRow[index]) + '</li>'
      })
      .join('')

    sendNotification('New website form submission', '<ul>' + bullets + '</ul>')

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    sendNotification(
      'Error in form submission',
      '<p>The submission was not saved.</p><p>' + error.toString() + '</p>'
    )

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}
