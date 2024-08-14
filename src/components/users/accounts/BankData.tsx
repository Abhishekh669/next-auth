import React from 'react';

interface BankBalanceType {
  _id: string;
  bankBalance: string;
  userId: string;
  bankDetailsId: string;
  bankAccount : string
}

// Function to determine the greeting based on the current time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

function BankData({ bankBalance, session }: { bankBalance: BankBalanceType[], session : any }) {
  console.log("this is the bankBalance data okoie man ", session);
  
  return (
  <div className='p-2'>
    <div>
      {bankBalance && bankBalance.map((data: BankBalanceType) => (
        <div key={data._id} className='text-white  border-[1px] p-2 border-greeen-600'>
          <div>
            <span>{getGreeting()}!</span>
          </div>
          <div>
              <span>{session.name}</span>
              <div className='flex flex-col '>
                <span>Saving Account</span>
                <span>{data.bankAccount}</span>
              </div>
          </div>
          <div>
            <span>$ {data.bankBalance}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default BankData;
