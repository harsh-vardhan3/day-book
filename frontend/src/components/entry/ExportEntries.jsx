import { useGetEntriesQuery } from "../../redux/api/entriesApiSlice";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const ExportEntries = () => {
  const { data: getEntries } = useGetEntriesQuery();

  const entries = getEntries?.data || [];

  const exportAsJSON = () => {
    if (entries.length === 0) {
      toast.error("No entries to export");
      return;
    }

    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `daybook-entries-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Entries exported as JSON!");
  };

  const exportAsText = () => {
    if (entries.length === 0) {
      toast.error("No entries to export");
      return;
    }

    let textContent = "DAYBOOK ENTRIES EXPORT\n";
    textContent += `Exported on: ${new Date().toLocaleString()}\n`;
    textContent += `Total entries: ${entries.length}\n`;
    textContent += "=" .repeat(50) + "\n\n";

    entries.forEach((entry, index) => {
      textContent += `Entry #${index + 1}\n`;
      textContent += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
      textContent += `Title: ${entry.title}\n`;
      textContent += `Mood: ${entry.mood}\n`;
      textContent += `Content:\n${entry.content}\n`;
      textContent += `Last Updated: ${new Date(entry.updatedAt).toLocaleString()}\n`;
      textContent += "-".repeat(50) + "\n\n";
    });

    const dataBlob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `daybook-entries-${new Date().toISOString().split("T")[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Entries exported as text file!");
  };

  const exportAsMarkdown = () => {
    if (entries.length === 0) {
      toast.error("No entries to export");
      return;
    }

    let mdContent = "# DayBook Entries Export\n\n";
    mdContent += `**Exported on:** ${new Date().toLocaleString()}  \n`;
    mdContent += `**Total entries:** ${entries.length}\n\n`;
    mdContent += "---\n\n";

    entries.forEach((entry) => {
      mdContent += `## ${entry.mood} ${entry.title}\n\n`;
      mdContent += `**Date:** ${new Date(entry.date).toLocaleDateString()}  \n`;
      mdContent += `**Mood:** ${entry.mood}  \n`;
      mdContent += `**Last Updated:** ${new Date(entry.updatedAt).toLocaleString()}\n\n`;
      mdContent += `${entry.content}\n\n`;
      mdContent += "---\n\n";
    });

    const dataBlob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `daybook-entries-${new Date().toISOString().split("T")[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Entries exported as Markdown!");
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-outline btn-primary gap-2">
        <FaDownload />
        Export
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2"
      >
        <li>
          <a onClick={exportAsJSON}>
            <span>📄</span> Export as JSON
          </a>
        </li>
        <li>
          <a onClick={exportAsText}>
            <span>📝</span> Export as Text
          </a>
        </li>
        <li>
          <a onClick={exportAsMarkdown}>
            <span>📋</span> Export as Markdown
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExportEntries;
