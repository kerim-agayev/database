import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryPathExplorer } from "./query-path-explorer";
import { queryPathSteps } from "@/content/visuals/query-path";

describe("QueryPathExplorer", () => {
  it("states what it models and what it simplifies", () => {
    render(<QueryPathExplorer />);
    expect(screen.getByText(/Neyi modeller:/)).toBeInTheDocument();
    expect(screen.getByText(/Neyi basitleştirir:/)).toBeInTheDocument();
  });

  it("starts at stage 1 and shows its detail", () => {
    render(<QueryPathExplorer />);
    const detail = screen.getByTestId("qpe-detail");
    expect(within(detail).getByText(/Aşama 1 \/ 8/)).toBeInTheDocument();
    expect(within(detail).getByRole("heading", { name: "İstemci SQL gönderir" })).toBeInTheDocument();
  });

  it("jumps to a stage when its button is clicked", async () => {
    const user = userEvent.setup();
    render(<QueryPathExplorer />);
    await user.click(screen.getByRole("button", { name: /Planner/ }));
    const detail = screen.getByTestId("qpe-detail");
    expect(within(detail).getByRole("heading", { name: "Planner / optimizer" })).toBeInTheDocument();
    expect(within(detail).getByText(/en ucuzunu/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Planner/ })).toHaveAttribute("aria-current", "step");
  });

  it("steps with Next and Previous and disables them at the ends", async () => {
    const user = userEvent.setup();
    render(<QueryPathExplorer />);
    const prev = screen.getByRole("button", { name: "Önceki aşama" });
    const next = screen.getByRole("button", { name: "Sonraki aşama" });
    expect(prev).toBeDisabled();

    for (let i = 1; i < queryPathSteps.length; i++) await user.click(next);
    expect(next).toBeDisabled();
    expect(within(screen.getByTestId("qpe-detail")).getByText(/Aşama 8 \/ 8/)).toBeInTheDocument();

    await user.click(prev);
    expect(within(screen.getByTestId("qpe-detail")).getByText(/Aşama 7 \/ 8/)).toBeInTheDocument();
  });

  it("works with the keyboard only (Tab to a stage, press Enter)", async () => {
    const user = userEvent.setup();
    render(<QueryPathExplorer />);
    await user.tab(); // stage 1
    await user.tab(); // stage 2
    await user.keyboard("{Enter}");
    expect(within(screen.getByTestId("qpe-detail")).getByText(/Aşama 2 \/ 8/)).toBeInTheDocument();
  });

  it("repeats every stage as plain text, so nothing depends on the widget", () => {
    render(<QueryPathExplorer />);
    expect(screen.getByText("Aynı içerik düz metin olarak")).toBeInTheDocument();
    for (const step of queryPathSteps) {
      expect(screen.getAllByText(step.name, { exact: false }).length).toBeGreaterThan(0);
    }
  });
});
