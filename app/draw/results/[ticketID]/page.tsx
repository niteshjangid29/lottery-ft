'use client';
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { getUserTickets } from '@/redux/slices/userSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa6';

const TicketDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserTickets())
      .unwrap()
      .then((ticket) => console.log(ticket));
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user);
  const params = useParams();
  const { ticketID } = params;

  const userDetails = user.userDetails;
  const userTicket = user.userTickets;
  const ticket = userTicket.filter((ticket) => ticket._id === ticketID)[0];

  const downloadPDF = async () => {
    const certificate = document.getElementById('certificate');
    if (certificate) {
      const canvas = await html2canvas(certificate, {
        scale: 2,
        useCORS: true, 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const adjustedHeight = imgHeight > pdfHeight - 20 ? (pdfHeight - 20) : imgHeight;
      const adjustedWidth = (canvas.width * adjustedHeight) / canvas.height;
      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (pdfHeight - adjustedHeight) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, adjustedWidth, adjustedHeight);
      pdf.save('Ticket_Certificate.pdf');
    }
  };

  return (
    <div className="mt-16 min-h-screen flex items-center justify-center bg-gray-100 p-5 pt-10 relative">
      <div
        id="certificate"
        className="w-full max-w-2xl bg-white border-4 border-dashed border-gray-400 shadow-xl rounded-xl p-10 relative"
      >
        {/* Top Header */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border-2 border-green-500 sm:block hidden">
          <h1 className="text-xl font-bold text-green-600 uppercase text-center">
            The Ticket is Authorised
          </h1>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center text-green-500">
          <FaCheckCircle size={40} />
        </div>

        {/* Certificate Title */}
        <h1 className="text-2xl font-extrabold text-center mt-4">
          Certificate of Authorization
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2">
          This certificate confirms the details of your ticket and lottery.
        </p>

        {/* Ticket Information */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Ticket Information</h2>
          <div className="bg-gray-50 shadow-md rounded-md p-5 mt-2">
            <p className="text-gray-700 text-sm">
              <span className="font-medium text-gray-800">Lottery Name:</span> {ticket?.lottery_id.name}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Draw Date:</span> {ticket?.lottery_id.draw_date}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Purchase Date:</span> {ticket?.purchase_date}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Ticket Number:</span> {ticket?.ticket_number}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Status:</span>{' '}
              <span
                className={`px-2 py-1 rounded-md ${
                  ticket?.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {ticket?.status}
              </span>
            </p>
          </div>
        </div>

        {/* User Information */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">User Information</h2>
          <div className="bg-gray-50 shadow-md rounded-md p-5 mt-2">
            <p className="text-gray-700 text-sm">
              <span className="font-medium text-gray-800">Name:</span> {userDetails?.name}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Email:</span> {userDetails?.email}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium text-gray-800">Phone:</span> {userDetails?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={downloadPDF}
        className="absolute top-1 right-5 bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        <FaDownload />
      </button>
    </div>
  );
};

export default TicketDetails;
