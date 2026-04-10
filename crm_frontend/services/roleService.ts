const API = "http://localhost:8080/api/roles";

export const getRoles = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createRole = async (data: any) => {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const updateRole = async (id: number, data: any) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteRole = async (id: number) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};