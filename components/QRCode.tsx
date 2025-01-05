import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  url: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <QRCodeSVG value={url} size={100} />
      {/* <p className="text-sm text-gray-500">Download Certificate{url}</p> */}
    </div>
  );
};

export default QRCode;
