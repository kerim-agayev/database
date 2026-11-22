import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortGame } from "./sort-game";
import { SequenceGame } from "./sequence-game";
import { KitchenJourney } from "./kitchen-journey";
import { WaiterSim } from "./waiter-sim";
import type { SequenceActivity, SortActivity } from "@/content/interactive/types";
import { journeySteps } from "@/content/visuals/kitchen-journey";

const sort: SortActivity = {
  kind: "sort",
  id: "t",
  title: "T",
  purpose: "P",
  instructions: "Kartları yerleştir.",
  buckets: [
    { id: "a", label: "Kutu A" },
    { id: "b", label: "Kutu B" },
  ],
  items: [
    { id: "x", label: "Kart X", bucket: "a" },
    { id: "y", label: "Kart Y", bucket: "b" },
  ],
  success: "Hepsi doğru!",
};

const seq: SequenceActivity = {
  kind: "sequence",
  id: "s",
  title: "S",
  purpose: "P",
  instructions: "Sırala.",
  items: [
    { id: "1", label: "Birinci", detail: "d1" },
    { id: "2", label: "İkinci", detail: "d2" },
    { id: "3", label: "Üçüncü", detail: "d3" },
  ],
  startOrder: ["2", "1", "3"],
  success: "Sıra doğru!",
};

describe("SortGame", () => {
  it("places a card by tapping it and then the box button (touch/keyboard path)", async () => {
    const user = userEvent.setup();
    render(<SortGame activity={sort} />);
    await user.click(screen.getByRole("button", { name: "Kart X" }));
    expect(screen.getByRole("button", { name: "Kart X" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: 'Seçili kartı "Kutu A" kutusuna koy' }));
    expect(within(screen.getByTestId("bucket-a")).getByText("Kart X")).toBeInTheDocument();
  });

  it("places a card with HTML drag and drop", () => {
    render(<SortGame activity={sort} />);
    const data = new Map<string, string>();
    const dataTransfer = {
      setData: (k: string, v: string) => data.set(k, v),
      getData: (k: string) => data.get(k) ?? "",
      effectAllowed: "move",
    };
    fireEvent.dragStart(screen.getByRole("button", { name: "Kart Y" }), { dataTransfer });
    fireEvent.drop(screen.getByTestId("bucket-b"), { dataTransfer });
    expect(within(screen.getByTestId("bucket-b")).getByText("Kart Y")).toBeInTheDocument();
  });

  it("only allows checking when the pool is empty, marks mistakes, and accepts a fix", async () => {
    const user = userEvent.setup();
    render(<SortGame activity={sort} />);
    const check = screen.getByRole("button", { name: "Kontrol et" });
    expect(check).toBeDisabled();

    // Wrong: X into B, Y into A.
    await user.click(screen.getByRole("button", { name: "Kart X" }));
    await user.click(screen.getByRole("button", { name: 'Seçili kartı "Kutu B" kutusuna koy' }));
    await user.click(screen.getByRole("button", { name: "Kart Y" }));
    await user.click(screen.getByRole("button", { name: 'Seçili kartı "Kutu A" kutusuna koy' }));
    await user.click(check);
    expect(screen.getByRole("status")).toHaveTextContent("0 / 2 doğru");
    expect(within(screen.getByTestId("bucket-b")).getByText(/✗/)).toBeInTheDocument();

    // Fix: take both back and place correctly.
    await user.click(screen.getByRole("button", { name: "Kart X: havuza geri al" }));
    await user.click(screen.getByRole("button", { name: "Kart Y: havuza geri al" }));
    await user.click(screen.getByRole("button", { name: "Kart X" }));
    await user.click(screen.getByRole("button", { name: 'Seçili kartı "Kutu A" kutusuna koy' }));
    await user.click(screen.getByRole("button", { name: "Kart Y" }));
    await user.click(screen.getByRole("button", { name: 'Seçili kartı "Kutu B" kutusuna koy' }));
    await user.click(screen.getByRole("button", { name: "Kontrol et" }));
    expect(screen.getByRole("status")).toHaveTextContent("Hepsi doğru!");
  });
});

describe("SequenceGame", () => {
  it("reorders with the arrow buttons and confirms the right order", async () => {
    const user = userEvent.setup();
    render(<SequenceGame activity={seq} />);
    await user.click(screen.getByRole("button", { name: "Kontrol et" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 / 3 kart doğru yerde");

    await user.click(screen.getByRole("button", { name: "Birinci: yukarı taşı" }));
    await user.click(screen.getByRole("button", { name: "Kontrol et" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sıra doğru!");
    expect(screen.getByText("d1")).toBeInTheDocument(); // details revealed once solved
  });

  it("disables moving the first card up and the last card down", () => {
    render(<SequenceGame activity={seq} />);
    expect(screen.getByRole("button", { name: "İkinci: yukarı taşı" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Üçüncü: aşağı taşı" })).toBeDisabled();
  });
});

describe("KitchenJourney", () => {
  it("walks the order ticket through every station", async () => {
    const user = userEvent.setup();
    render(<KitchenJourney />);
    const detail = () => screen.getByTestId("journey-detail");
    expect(within(detail()).getByText(/Adım 1 \/ 6/)).toBeInTheDocument();
    for (let i = 1; i < journeySteps.length; i++) {
      await user.click(screen.getByRole("button", { name: "Sonraki adım" }));
    }
    expect(within(detail()).getByText(/Adım 6 \/ 6/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sonraki adım" })).toBeDisabled();
  });

  it("shows the restaurant side and the real side together", () => {
    render(<KitchenJourney />);
    expect(within(screen.getByTestId("journey-detail")).getByRole("heading", { name: "Restoranda" })).toBeInTheDocument();
    expect(within(screen.getByTestId("journey-detail")).getByRole("heading", { name: "Gerçekte (PostgreSQL)" })).toBeInTheDocument();
  });

  it("jumps straight to a station", async () => {
    const user = userEvent.setup();
    render(<KitchenJourney />);
    await user.click(screen.getByRole("button", { name: /Depo sorumlusu/ }));
    expect(within(screen.getByTestId("journey-detail")).getByText(/Storage engine/)).toBeInTheDocument();
  });
});

describe("WaiterSim", () => {
  it("client backend equals the number of open sessions", async () => {
    const user = userEvent.setup();
    render(<WaiterSim />);
    const table = () => screen.getByTestId("sim-table");
    const clientCount = () =>
      within(within(table()).getByText("client backend").closest("tr") as HTMLElement).getAllByRole("cell")[1];
    expect(clientCount()).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: /Yeni oturum aç/ }));
    await user.click(screen.getByRole("button", { name: /Yeni oturum aç/ }));
    expect(clientCount()).toHaveTextContent("3");
    expect(screen.getAllByText(/^Garson \d$/)).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: /Bir oturumu kapat/ }));
    expect(clientCount()).toHaveTextContent("2");
  });

  it("keeps the background staff when nobody is connected", async () => {
    const user = userEvent.setup();
    render(<WaiterSim />);
    await user.click(screen.getByRole("button", { name: /Bir oturumu kapat/ }));
    expect(within(screen.getByTestId("sim-table")).queryByText("client backend")).not.toBeInTheDocument();
    expect(within(screen.getByTestId("sim-table")).getByText("walwriter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Bir oturumu kapat/ })).toBeDisabled();
  });
});

describe("KitchenJourney autoplay", () => {
  it("plays to the last station by itself and then offers to play again", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      render(<KitchenJourney />);
      fireEvent.click(screen.getByRole("button", { name: "Otomatik oynat" }));
      expect(screen.getByRole("button", { name: "Durdur" })).toBeInTheDocument();
      for (let i = 0; i < journeySteps.length; i++) {
        await act(async () => {
          vi.advanceTimersByTime(1900);
        });
      }
      expect(within(screen.getByTestId("journey-detail")).getByText(/Adım 6 \/ 6/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Otomatik oynat" })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
