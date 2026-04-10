const API_URL = "http://localhost:8080/api/organizations";

export const getOrganizations = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createOrganization = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteOrganization = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Delete failed");
  }

  return res.text();
};

export const updateOrganization = async (
  id: number,
  data: { name: string; parentId?: number | null }
) => {
  const res = await fetch(`http://localhost:8080/api/organizations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Update failed");
  }

  return res.json();
};