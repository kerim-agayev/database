import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LessonView, PlannedDay } from "./lesson-view";
import { getLesson } from "@/content/lessons";
import { getDay } from "@/lib/days";

describe("LessonView", () => {
  it("renders every section a daily page must have (day 2)", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    for (const heading of [
      "Öğrenme hedefleri",
      "Nerede kaldık",
      "Ana fikir",
      "Görev",
      "Bilgi kontrolü",
      "Düşünme notu",
      "Kaynakça",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: /Çözümlü örnek/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Etkileşimli: bir sorgunun yolu" })).toBeInTheDocument();
    expect(screen.getByText(/İpuçları/)).toBeInTheDocument();
  });

  it("links web references to https sources", () => {
    render(<LessonView lesson={getLesson(2)!} plan={getDay(2)!} />);
    const link = screen.getByRole("link", { name: /The Path of a Query/ });
    expect(link).toHaveAttribute("href", "https://www.postgresql.org/docs/18/query-path.html");
  });

  it("does not show an interactive widget on a day that has none (day 1)", () => {
    render(<LessonView lesson={getLesson(1)!} plan={getDay(1)!} />);
    expect(screen.queryByText("Etkileşimli: bir sorgunun yolu")).not.toBeInTheDocument();
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
