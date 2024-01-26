import { FaBoxes, FaFilePdf, FaRegImage, FaFileWord, FaFileExcel, FaTag } from 'react-icons/fa';

export const sourceItem = {
  pdf: { color: '#ff0000', component: FaFilePdf, text: 'PDF' },
  xlsx: { color: '#467711', component: FaFileExcel, text: 'XLSX' },
  image: { color: '#7b00ff', component: FaRegImage, text: 'Imagen' },
  docx: { color: '#3878E2', component: FaFileWord, text: 'Documento' },
  orders: { color: '#3778e2', component: FaBoxes, text: 'Venta' },
  label: { color: '#3778e2', component: FaTag, text: 'Etiqueta' }
};

export const status = {
  pending: {
    color: 'gold',
    text: 'Pendiente'
  },
  init: {
    color: 'blue',
    text: 'Inicio'
  },
  downloading: {
    color: 'blue',
    text: 'Descargando'
  },
  success: {
    color: 'green',
    text: 'Éxito'
  },
  failed: {
    color: 'red',
    text: 'Error'
  }
};
