export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-8">
      <h1 className="mb-6 text-3xl font-bold">About</h1>
      <div className="rounded-lg border p-6 shadow">
        <p className="mb-4 text-lg">
          This is a boilerplate application built with Django, Django Rest
          Framework, React, and TypeScript.
        </p>
        <p className="mb-4">It demonstrates a full-stack application with:</p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Django REST API backend</li>
          <li>React TypeScript frontend</li>
          <li>TanStack Query for state management</li>
          <li>React Hook Form with Zod for form validation</li>
          <li>Tailwind CSS with ShadCN components for styling</li>
        </ul>
      </div>
    </div>
  );
}
