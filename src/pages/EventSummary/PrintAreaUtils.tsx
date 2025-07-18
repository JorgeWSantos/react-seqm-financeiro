export const handlePrintPDF = async () => {
  setTimeout(async () => {
    const element = document.getElementById('print-area');
    if (!element) {
      return;
    }
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;
    // Aumenta a escala para melhorar a resolução
    const canvas = await html2canvas(element, { scale: 3 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calcula proporção para caber na página
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight > pageHeight ? pageHeight : imgHeight
    );
    pdf.save('relatorio.pdf');
  }, 100);
};
