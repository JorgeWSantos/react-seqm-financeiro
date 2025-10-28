// export const handlePrintPDF = async () => {
//   setTimeout(async () => {
//     const element = document.getElementById('print-area');
//     if (!element) {
//       return;
//     }
//     const html2canvas = (await import('html2canvas')).default;
//     const jsPDF = (await import('jspdf')).jsPDF;
//     const canvas = await html2canvas(element, {
//       scale: 3,
//       backgroundColor: '#fff',
//       // padding: 0,
//       // margin: 0,
//       // style: { padding: '0', margin: '0' },
//     });
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     // Calcula proporção para caber na página
//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     // Se a imagem for maior que a página, divide em páginas

//     // Corrige página em branco: calcula altura real da imagem e só gera páginas necessárias
//     let remainingHeight = imgHeight;
//     let position = 0;
//     let pageNum = 1;
//     while (remainingHeight > 0.1) {
//       // const pageImgHeight = Math.min(pageHeight, remainingHeight);
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

//       // Rodapé: data e página
//       const now = new Date();
//       const dateStr = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
//       pdf.setFontSize(8);
//       pdf.setFont('helvetica');
//       pdf.setTextColor(80);
//       pdf.text(`${dateStr}`, 8, pageHeight - 8, { align: 'left' });
//       pdf.text(
//         `${pageNum}/${Math.ceil(imgHeight / pageHeight)}`,
//         pageWidth - 8,
//         pageHeight - 8,
//         { align: 'right' }
//       );

//       remainingHeight -= pageHeight;
//       if (remainingHeight > 0.1) {
//         pdf.addPage();
//         position -= pageHeight;
//         pageNum++;
//       }
//     }

//     pdf.save('relatorio.pdf');
//   }, 100);
// };
