import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KnowledgeCheck } from "./knowledge-check";
import type { Question } from "@/content/lessons/types";

const questions: Question[] = [
  {
    id: "q1",
    prompt: "Which clause filters groups?",
    options: ["WHERE", "HAVING"],
    answer: 1,
    explanation: "HAVING runs after GROUP BY.",
  },
];

describe("KnowledgeCheck", () => {
  it("keeps the Check button disabled until an option is chosen", async () => {
    const user = userEvent.setup();
    render(<KnowledgeCheck questions={questions} />);
    const check = screen.getByRole("button", { name: "Cevabı kontrol et" });
    expect(check).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "HAVING" }));
    expect(check).toBeEnabled();
  });

  it("explains a correct answer", async () => {
    const user = userEvent.setup();
    render(<KnowledgeCheck questions={questions} />);
    await user.click(screen.getByRole("radio", { name: "HAVING" }));
    await user.click(screen.getByRole("button", { name: "Cevabı kontrol et" }));
    expect(screen.getByRole("status")).toHaveTextContent("Doğru. HAVING runs after GROUP BY.");
  });

  it("does not reveal the right answer after a wrong one, and lets you retry", async () => {
    const user = userEvent.setup();
    render(<KnowledgeCheck questions={questions} />);
    await user.click(screen.getByRole("radio", { name: "WHERE" }));
    await user.click(screen.getByRole("button", { name: "Cevabı kontrol et" }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Tam değil");
    expect(status).not.toHaveTextContent("HAVING runs after GROUP BY");

    // Changing the choice clears the verdict, then the right one is accepted.
    await user.click(screen.getByRole("radio", { name: "HAVING" }));
    expect(status).toBeEmptyDOMElement();
    await user.click(screen.getByRole("button", { name: "Cevabı kontrol et" }));
    expect(status).toHaveTextContent("Doğru.");
  });

  it("groups each question in a fieldset with a legend (screen-reader friendly)", () => {
    render(<KnowledgeCheck questions={questions} />);
    expect(screen.getByRole("group", { name: /Which clause filters groups/ })).toBeInTheDocument();
  });
});
