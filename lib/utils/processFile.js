export async function processFile(file) {
  try {
    // Convert file to text content
    const text = await file.text();
    
    // Call the document processing API route
    const response = await fetch('/api/process-document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text,
        type: file.type,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process document');
    }

    return response.json();
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('Failed to process document. Please try again.');
  }
}