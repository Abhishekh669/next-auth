type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]
export const bankName = [
  {
      "name": "Nepal Bank Ltd.",
      "head_office": "Dharmapath, Kathmandu"
  },
  {
      "name": "Agriculture Development Bank Ltd.",
      "head_office": "Ramshahpath, Kathmandu"
  },
  {
      "name": "Nabil Bank Ltd.",
      "head_office": "Beena Marg, Kathmandu"
  },
  {
      "name": "Nepal Investment Bank Ltd.",
      "head_office": "Durbarmarg, Kathmandu"
  },
  {
      "name": "Standard Chartered Bank Nepal Ltd.",
      "head_office": "Nayabaneshwor, Kathmandu"
  },
  {
      "name": "Himalayan Bank Ltd.",
      "head_office": "Kamaladi, Kathmandu"
  },
  {
      "name": "Nepal SBI Bank Ltd.",
      "head_office": "Kesharmahal, Kathmandu"
  },
  {
      "name": "Nepal Bangladesh Bank Ltd.",
      "head_office": "Kamaladi, Kathmandu"
  },
  {
      "name": "Everest Bank Ltd.",
      "head_office": "Lazimpat, Kathmandu"
  },
  {
      "name": "Kumari Bank Ltd.",
      "head_office": "Durbarmarg, Kathmandu"
  },
  {
      "name": "Laxmi Bank Ltd.",
      "head_office": "Hattisar, Kathmandu"
  },
  {
      "name": "Citizens Bank International Ltd.",
      "head_office": "Narayanhitipath, Kathmandu"
  },
  {
      "name": "Prime Commercial Bank Ltd.",
      "head_office": "Kamalpokhari, Kathmandu"
  },
  {
      "name": "Sunrise Bank Ltd.",
      "head_office": "Gairidhara, Kathmandu"
  },
  {
      "name": "Century Commercial Bank Ltd.",
      "head_office": "Putalisadak, Kathmandu"
  },
  {
      "name": "Sanima Bank Ltd.",
      "head_office": "Nagpokhari, Kathmandu"
  },
  {
      "name": "Machhapuchhre Bank Ltd.",
      "head_office": "Lazimpat, Kathmandu"
  },
  {
      "name": "NIC Asia Bank Ltd.",
      "head_office": "Thapathali, Kathmandu"
  },
  {
      "name": "Global IME Bank Ltd.",
      "head_office": "Panipokhari, Kathmandu"
  },
  {
      "name": "NMB Bank Ltd.",
      "head_office": "Babarmahal, Kathmandu"
  },
  {
      "name": "Prabhu Bank Ltd.",
      "head_office": "Babarmahal, Kathmandu"
  },
  {
      "name": "Siddhartha Bank Ltd.",
      "head_office": "Hattisar, Kathmandu"
  },
  {
      "name": "Bank of Kathmandu Ltd.",
      "head_office": "Kamaladi, Kathmandu"
  },
  {
      "name": "Civil Bank Ltd.",
      "head_office": "Kamaladi, Kathmandu"
  },
  {
      "name": "Nepal Credit and Commerce Bank Ltd.",
      "head_office": "Bagbazar, Kathmandu"
  },
  {
      "name": "Janata Bank Nepal Ltd.",
      "head_office": "Thapathali, Kathmandu"
  },
  {
      "name": "Rastriya Banijya Bank Ltd.",
      "head_office": "Singhadurbarplaza, Kathmandu"
  }
]



export  const formatingDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    console.log("this is the date ", `${day}/${month}/${year}`)
    return `${day}/${month}/${year}`// Format as YYYY-MM-DD
  };


