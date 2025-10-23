import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">AI Notes Hub</h1>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n: typeof notes[0]) => (
            <li key={n.id} className="border p-3 rounded">
              <h2 className="font-semibold">{n.title}</h2>
              <p>{n.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
