// components/QRCodeScanner.tsx
'use client';
import React, { useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRCodeScannerComponent = () => {
  const [url, setUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScan = (result: string | null) => {
    if (result) {
      setUrl(result); // Set the scanned URL
      window.location.href = result; // Redirect to the URL
    }
  };

//   const handleError = (err: any) => {
//     console.error(err);
//   };

  const startScanner = () => {
    const codeReader = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(
        null, // Use the default camera
        videoRef.current,
        (result, error) => {
          if (result) {
            handleScan(result.getText());
          } else if (error) {
            // handleError(error);
          }
        }
      );
    }
  };

  React.useEffect(() => {
    startScanner(); // Start scanning on component mount

    return () => {
      // Clean up the scanner on unmount
      if (videoRef.current) {
        const codeReader = new BrowserMultiFormatReader();
        codeReader.reset();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Scan the QR Code</h1>
      <div className="max-w-md w-full mb-6">
        <video ref={videoRef} className="w-full h-auto" />
      </div>
      {url && (
        <p className="mt-4 text-lg text-center">
          Redirecting to: <a href={url} className="text-blue-500" target="_blank" rel="noopener noreferrer">{url}</a>
        </p>
      )}
    </div>
  );
};

export default QRCodeScannerComponent;
