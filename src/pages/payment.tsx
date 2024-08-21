import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    // Payment success logic here

    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="p-6 h-screen  ">

        <div className=' text-center'>
        <h1 className="text-3xl font-bold mb-6">Payment Page</h1>
      {/* Payment integration goes here */}
      <button
        onClick={handlePaymentSuccess}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Complete Payment
      </button>
        </div>
      
    </div>
  );
}
