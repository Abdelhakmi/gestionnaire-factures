import * as pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'

export async function parseInvoice(file) {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const page = await pdf.getPage(1)
  const content = await page.getTextContent()
  const text = content.items.map(i => i.str).join(' ')

  const number = text.match(/Numéro\s+de\s+facture\s*:\s*(\S+)/i)?.[1] || '—'
  const dateText = text.match(/Date\s*:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i)?.[1] || '—'
  const amount = text.match(/Montant\s+Total\s*:\s*DH\s*([\d,.]+)/i)?.[1] || '0'

  const date = dateText !== '—' ? new Date(dateText) : null

  return {
    filename: file.name,
    number,
    date,
    amount: parseFloat(amount.replace(',', '.')) || 0,
  }
}
