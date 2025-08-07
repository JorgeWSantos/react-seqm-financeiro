export const handlePrintPDF = async () => {
  setTimeout(async () => {
    const element = document.getElementById('print-area');
    if (!element) {
      return;
    }
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: '#fff',
      padding: 0,
      margin: 0,
      style: { padding: '0', margin: '0' },
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calcula proporção para caber na página
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Se a imagem for maior que a página, divide em páginas
    const totalPages = Math.ceil(imgHeight / pageHeight);

    for (let i = 0; i < totalPages; i++) {
      const position = -i * pageHeight;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

      // Rodapé: data e página
      const now = new Date();
      const dateStr = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
      pdf.setFontSize(8);
      pdf.setFont('helvetica');
      pdf.setTextColor(80);
      // Data à esquerda
      pdf.text(`${dateStr}`, 8, pageHeight - 8, { align: 'left' });
      // Paginação à direita
      pdf.text(`${i + 1}/${totalPages}`, pageWidth - 8, pageHeight - 8, {
        align: 'right',
      });

      if (i < totalPages - 1) {
        pdf.addPage();
      }
    }

    pdf.save('relatorio.pdf');
  }, 100);
};
