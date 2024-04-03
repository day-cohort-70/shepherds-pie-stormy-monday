export const getEmployeeByEmail = async (email) => {
    const sampleEmployee = {
        id: 1,
        address: "Pizza town",
        phone: "5554344343",
        email: "giuseppi@isthebesti.com",
        admin: true

    }
    return sampleEmployee;
    
    // TODO: remove ASYNC
    // fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
    //   res.json()
    // )


  }