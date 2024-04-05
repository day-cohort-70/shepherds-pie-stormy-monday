export const getEmployees = () => {
    return fetch("http://localhost:8088/employees").then((res) => res.json());
}

export const addEmployee = async (newEmployee) => {
    const response = await fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    return await response.json();
  };
  
  export const updateEmployee = async (id, updatedEmployee) => {
    const response = await fetch(`http://localhost:8088/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });
    return await response.json();
  };