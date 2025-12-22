"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/auth";
import { mutationAddMessage } from "@/queries/MessageQueries";
import { MessagesFromDb } from "@/types/coursePageTypes";

type PostMessageProps = {
  courseId: string;
  userId: string | null;
  onMessagePosted: (newMessage: MessagesFromDb["messagesByCourseSlug"][number]) => void;
};

export default function PostMessage({ courseId, userId, onMessagePosted }: PostMessageProps) {
  const [message, setMessage] = useState(""); // contenu du message
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAuthStore((state) => state.accessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || message.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: mutationAddMessage,
          variables: {
            input: {
              content: message,
              userId,
              courseId,
            },
          },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        setError(json.errors[0].message);
      } else {
        onMessagePosted(json.data.createMessage); // ajout du message au forum
        setMessage(""); // reset textarea
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <textarea
        className="border p-2 rounded-md w-full"
        placeholder="Écris ton message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="bg-primary-red text-white px-4 py-2 rounded-md disabled:opacity-50"
          disabled={loading || !message.trim()}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </form>
  );
}
