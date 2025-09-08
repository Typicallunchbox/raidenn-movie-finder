import { useEffect } from "react";

export default function Meta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.setAttribute("name", "description");
        document.head.appendChild(descTag);
      }
      descTag.setAttribute("content", description);
    }
  }, [title, description]);

  return null; // no visible UI
}
