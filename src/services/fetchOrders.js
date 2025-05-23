export const fetchOrders = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    return [
      {
        _id: "1",
        orderNumber: "ORD123456",
        eventName: "Wedding Planning",
        eventDate: "2025-04-10",
        totalAmount: "65000",
        status: "Pending",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        address: "123 Street, City",
        telephone: "011-2345678",
        mobile: "0771234567",
        comment: "Please confirm ASAP",
        advancePayment: "20000",
        slip: "https://via.placeholder.com/400x200.png?text=Slip+1",
      },
      {
        _id: "2",
        orderNumber: "ORD123457",
        eventName: "Birthday Decoration",
        eventDate: "2025-05-15",
        totalAmount: "30000",
        status: "Completed",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        address: "456 Avenue, City",
        telephone: "011-9876543",
        mobile: "0777654321",
        comment: "",
        advancePayment: "15000",
        slip: "https://via.placeholder.com/400x200.png?text=Slip+2",
      },
      {
        _id: "3",
        orderNumber: "ORD123458",
        eventName: "Corporate Event",
        eventDate: "2025-06-01",
        totalAmount: "120000",
        status: "Rejected",
        firstName: "Nimal",
        lastName: "Perera",
        email: "nimal@example.com",
        address: "789 Road, Colombo",
        telephone: "011-3456789",
        mobile: "0779876543",
        comment: "Need more decoration",
        advancePayment: "40000",
        slip: "https://via.placeholder.com/400x200.png?text=Slip+3",
      },
      {
        _id: "4",
        orderNumber: "ORD123458",
        eventName: "Wedding Event",
        eventDate: "2025-06-01",
        totalAmount: "120000",
        status: "Rejected",
        firstName: "Nimal",
        lastName: "Perera",
        email: "nimal@example.com",
        address: "789 Road, Colombo",
        telephone: "011-3456789",
        mobile: "0779876543",
        comment: "Need more decoration",
        advancePayment: "40000",
        slip: "https://via.placeholder.com/400x200.png?text=Slip+3",
      },
    ];
  };
  