import type { Activity, InteractiveDay } from "@/content/interactive/types";
import { SortGame } from "@/components/games/sort-game";
import { SequenceGame } from "@/components/games/sequence-game";
import { KitchenJourney } from "@/components/games/kitchen-journey";
import { WaiterSim } from "@/components/games/waiter-sim";

function ActivityBody({ activity }: { activity: Activity }) {
  switch (activity.kind) {
    case "sort":
      return <SortGame activity={activity} />;
    case "sequence":
      return <SequenceGame activity={activity} />;
    case "widget":
      return activity.widget === "kitchen-journey" ? <KitchenJourney /> : <WaiterSim />;
  }
}

export function InteractiveView({ page }: { page: InteractiveDay }) {
  return (
    <div>
      <p className="mt-2">{page.intro}</p>
      {page.activities.map((activity, i) => (
        <section
          key={activity.id}
          aria-labelledby={`act-${activity.id}`}
          className="mt-8 rounded-lg border border-zinc-300 p-4 dark:border-zinc-700"
        >
          <h2 id={`act-${activity.id}`} className="text-xl font-semibold">
            {i + 1}. {activity.title}
          </h2>
          <p className="mt-1 text-sm">
            <strong>Amaç:</strong> {activity.purpose}
          </p>
          <div className="mt-3">
            <ActivityBody activity={activity} />
          </div>
        </section>
      ))}
      <section className="mt-8" aria-labelledby="closing">
        <h2 id="closing" className="text-xl font-semibold">
          Son adım: kendi cümlelerinle anlat
        </h2>
        <p className="mt-2">{page.closing}</p>
      </section>
    </div>
  );
}
