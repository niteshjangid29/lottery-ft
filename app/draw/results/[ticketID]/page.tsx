'use client';
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useRouter } from 'next/navigation';
import { getUserTickets } from '@/redux/slices/userSlice';
// import QRReader from '@/components/QRReader';

const TicketDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Access the user authentication state
  const authUser = useSelector((state: RootState) => state.user.authUser);

  useEffect(() => {
    // Check if user is authenticated
    if (!authUser) {
      // Redirect to login page with redirectTo parameter
      router.push(`/login?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    // Fetch user tickets if authenticated
    dispatch(getUserTickets());
  }, [authUser, dispatch, router]);

  const user = useSelector((state: RootState) => state.user);
  const params = useParams();
  const { ticketID } = params;

  const userDetails = user.userDetails;
  const userTicket = user.userTickets;
  const ticket = userTicket.find((ticket) => ticket._id === ticketID);

  const handleVerify = () => {
    router.push('/draw/results');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 mt-16">
      {/* Form Container */}
      <div
        className="relative bg-white shadow-lg rounded-lg w-full max-w-4xl py-10 px-12"
        style={{
          backgroundImage: `url('/punjab.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg pointer-events-none"></div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="text-green-600">
              <FaCheckCircle size={70} />
            </div>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">
              Certificate Successfully Verified
            </h1>
            <p className="text-gray-600 mt-2">
              Certificate for Ticket Authorization
            </p>
          </div>

          {/* Form Content */}
          <form className="space-y-8">
            {/* User Information */}
            <fieldset className="border border-gray-300 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">
                User Information
              </legend>
              <div className="space-y-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Name:</span>
                  <span className="text-gray-700">{userDetails?.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Email:</span>
                  <span className="text-gray-700">{userDetails?.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Phone:</span>
                  <span className="text-gray-700">{userDetails?.phoneNumber}</span>
                </div>
              </div>
            </fieldset>

            {/* Ticket Information */}
            <fieldset className="border border-gray-300 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">
                Ticket Information
              </legend>
              <div className="space-y-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Lottery Name:</span>
                  <span className="text-gray-700">{ticket?.lottery_id?.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Draw Date:</span>
                  <span className="text-gray-700">{ticket?.lottery_id?.draw_date}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Purchase Date:</span>
                  <span className="text-gray-700">{ticket?.purchase_date}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Ticket Number:</span>
                  <span className="text-gray-700">{ticket?.ticket_number}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-md text-sm ${
                      ticket?.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {ticket?.status}
                  </span>
                </div>
              </div>
            </fieldset>

            {/* Verify Another Ticket Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg"
                onClick={handleVerify}
              >
                Verify Another Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <QRReader /> */}
    </div>
  );
};

export default TicketDetails;
