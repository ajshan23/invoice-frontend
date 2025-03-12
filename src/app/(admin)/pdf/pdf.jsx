import React from 'react';

function Pdf() {
  // Function to handle the button click and generate the PDF
  const handleGeneratePdf = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/user/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: 'Example Company',
          date: '2023-10-01',
          items: [
            {
              name: 'Item 1',
              price: 100,
              quantity: 2,
              subItems: [
                {
                  name: 'Sub Item 1',
                  price: 50,
                  quantity: 1,
                },
              ],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Ensure the response contains the base64-encoded PDF
      if (!data.pdf) {
        throw new Error('No PDF data found in response');
      }
  
      // Decode the base64 string to a binary array
      const binaryString = atob(data.pdf); // Decode base64
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }
  
      // Create a Blob from the binary array
      const pdfBlob = new Blob([binaryArray], { type: 'application/pdf' });
  
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);
  
      // Create a temporary <a> element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotation.pdf'; // Set the filename for the downloaded PDF
      document.body.appendChild(a);
      a.click(); // Trigger the download
      a.remove(); // Clean up the <a> element
  
      // Revoke the Blob URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };;
  return (
    <div>
      <h1>Generate PDF</h1>
      <button onClick={handleGeneratePdf}>Generate and Download PDF</button>
    </div>
  );
}

export default Pdf;