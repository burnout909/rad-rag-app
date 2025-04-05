export default function Team() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-10 text-neutral-800">
      <h2 className="text-3xl font-bold text-black">🙌 Team Members</h2>

      <table className="table-auto w-full border-collapse border border-gray-300 mt-6 text-left text-sm">
        <thead className="bg-gray-100 text-neutral-700">
          <tr>
            <th className="px-4 py-3 border border-gray-300">Name</th>
            <th className="px-4 py-3 border border-gray-300">Role</th>
            <th className="px-4 py-3 border border-gray-300">Affiliation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300">
            <td className="px-4 py-3">김민성 (Kim Minseong)</td>
            <td className="px-4 py-3">Lead Developer</td>
            <td className="px-4 py-3">신소재공학과</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="px-4 py-3">이준영 (Lee Junyeong)</td>
            <td className="px-4 py-3">Backend Developer</td>
            <td className="px-4 py-3">신소재공학과</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="px-4 py-3">곽민욱 (Kwak Minuk)</td>
            <td className="px-4 py-3">Frontend Developer</td>
            <td className="px-4 py-3">신소재공학과</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
