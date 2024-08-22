import React from 'react';

interface LeaveRequest {
  name: string;
  employeeId: string;
  leaveType: string;
  date: string;
  reason: string;
}

const LeaveRequestTable: React.FC = () => {
  const leaveRequests: LeaveRequest[] = [
//     {
//       name: 'Marshall Nichols',
//       employeeId: 'LA-8150',
//       leaveType: 'Casual Leave',
//       date: '24 July, 2019 to 26 July, 2019',
//       reason: 'Going to Family Function',
//     },
//     {
//       name: 'Jessica Turner',
//       employeeId: 'LA-8250',
//       leaveType: 'Sick Leave',
//       date: '15 August, 2019 to 17 August, 2019',
//       reason: 'Medical Emergency',
//     },
//     {
//       name: 'Ryan Phillips',
//       employeeId: 'LA-8350',
//       leaveType: 'Casual Leave',
//       date: '5 September, 2019 to 7 September, 2019',
//       reason: 'Personal Work',
//     },
//     {
//       name: 'Laura White',
//       employeeId: 'LA-8450',
//       leaveType: 'Maternity Leave',
//       date: '1 October, 2019 to 1 April, 20',
//       reason: 'Maternity',
//     },
//     {
//       name: 'Mark Johnson',
//       employeeId: 'LA-8550',
//       leaveType: 'Paternity Leave',
//       date: '12 November, 2019 to 15 November, 2019',
//       reason: 'Newborn Care',
//     },
//     {
//       name: 'Sophia Brown',
//       employeeId: 'LA-8650',
//       leaveType: 'Annual Leave',
//       date: '20 December, 2019 to 31 December, 2019',
//       reason: 'Family Vacation',
//     },
//     {
//       name: 'Ethan Wilson',
//       employeeId: 'LA-8750',
//       leaveType: 'Sick Leave',
//       date: '3 January, 2020 to 5 January, 2020',
//       reason: 'Flu Recovery',
//     },
  ];

  return (
    <div className="w-full p-4">
      <h5 className="text-2xl text-gray-500 mb-5 ml-3">Leave Request</h5>
      <table className="min-w-full bg-white shadow-lg rounded-xl">
        <thead>
          <tr className="text-gray-600 uppercase text-sm">
            <th className="py-3 px-0 text-center font-medium">#</th>
            <th className="py-3 px-0 text-center font-medium">NAME</th>
            <th className="py-3 px-0 text-center font-medium">EMPLOYEE ID</th>
            <th className="py-3 px-0 text-center font-medium">LEAVE TYPE</th>
            <th className="py-3 px-0 text-center font-medium">DATE</th>
            <th className="py-3 px-0 text-center font-medium">REASON</th>
            <th className="py-3 px-0 text-center font-medium">ACTION</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm border font-medium">
          {leaveRequests.map((request, index) => (
            <tr key={index} className="border-gray-200 border">
              <td className="py-3 px-6 text-left">
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    {request.name.charAt(0)}
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{request.name}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{request.employeeId}</td>
              <td className="py-3 px-6 text-left">{request.leaveType}</td>
              <td className="py-3 px-6 text-left">{request.date}</td>
              <td className="py-3 px-6 text-left">{request.reason}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className=" text-sm font-bold">
          <tr>
            <td colSpan={7} className="py-4 px-6 text-right">
              Total Requests: {leaveRequests.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LeaveRequestTable;
