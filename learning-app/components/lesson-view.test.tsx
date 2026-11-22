import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LessonView, PlannedDay } from "./lesson-view";
import { getLesson } from "@/content/lessons";
import { getDay } from "@/lib/days";

describe("LessonView (zero-baseline lesson order)", () => {
  it("renders every section a daily page must have (day 2)", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    for (const heading of [
      "Bugün ne öğreneceksin?",
      "Nerede kaldık",
      "Önce hatırla (notlara bakmadan)",
      "Bugünün benzetmesi",
      "Ana fikir",
      "Görev",
      "Bilgi kontrolü",
      "Kendi cümlelerinle anlat (Feynman)",
      "Düşünme notu",
      "Kaynakça",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: /Bugün yalnızca 4 yeni kelime/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Çözümlü örnek/ })).toBeInTheDocument();
    expect(screen.getByText(/İpuçları/)).toBeInTheDocument();
  });

  it("shows the analogy as a two-column table before the jargon", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    expect(screen.getByRole("columnheader", { name: "Restoranda" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: /Bağlantı/ })).toBeInTheDocument();
    expect(screen.getByText(/Masana ayrılmış garson/)).toBeInTheDocument();
  });

  it("hides recall answers until asked (retrieval practice)", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    expect(screen.getAllByText("Cevabı göster").length).toBe(getLesson(2)!.recall!.length);
  });

  it("links web references to https sources", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    const link = screen.getByRole("link", { name: /Architectural Fundamentals/ });
    expect(link).toHaveAttribute("href", "https://www.postgresql.org/docs/18/tutorial-arch.html");
  });

  it("shows the query-path explorer only when a lesson asks for it", () => {
    const { unmount } = render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    expect(screen.queryByText("Etkileşimli: bir sorgunun yolu")).not.toBeInTheDocument();
    unmount();
    render(<LessonView lesson={{ ...getLesson(2)!, visual: "query-path" }} plan={getDay(2)!} />);
    expect(screen.getByText("Etkileşimli: bir sorgunun yolu")).toBeInTheDocument();
  });

  it("day 1 has no recall section (nothing to recall on the first day)", () => {
    render(<LessonView lesson={getLesson(1)!} plan={getDay(1)!} />);
    expect(screen.queryByText("Önce hatırla (notlara bakmadan)")).not.toBeInTheDocument();
  });
});

describe("PlannedDay", () => {
  it("is honest that the lesson is not written yet and still shows the plan", () => {
    render(<PlannedDay plan={getDay(45)!} />);
    expect(screen.getByText(/henüz yazılmadı/)).toBeInTheDocument();
    expect(screen.getByText(getDay(45)!.objective)).toBeInTheDocument();
    expect(screen.getByText("Öz-kontrol")).toBeInTheDocument();
  });
});
