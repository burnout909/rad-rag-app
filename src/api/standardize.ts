export async function standardizeNote(payload: {
  patientId: string;
  procedureId: string;
  note: string;
}) {
  const response = await fetch("/api/standardize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("API 요청 실패");
  }

  return response.json();
}
