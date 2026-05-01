import { useState } from "react";
import { ChevronDown, ArrowLeft, Eye, Check } from "lucide-react";

type Screen = 1 | 2 | 3;

interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: string[];
  tip?: string;
}

const AccordionItem = ({ title, isOpen, onToggle, items, tip }: AccordionItemProps) => (
  <div className="rounded-lg overflow-hidden shadow-sm">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between bg-eye text-eye-foreground px-4 py-3 text-left text-[14px] font-medium hover:brightness-95 transition"
    >
      <span>{title}</span>
      <ChevronDown
        size={18}
        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="bg-eye-bg border-l-4 border-eye p-3 rounded-b-lg">
          <ul className="space-y-1.5 text-[13px] text-foreground">
            {items.map((it, i) => (
              <li key={i}>✓ {it}</li>
            ))}
          </ul>
          {tip && (
            <p className="mt-2 text-[12px] italic text-foreground-soft">Tip: {tip}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const EyeCareGuide = () => {
  const [screen, setScreen] = useState<Screen>(1);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  const exitActivity = () => {
    // Exit the activity entirely
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/";
  };

  const goHome = () => {
    setScreen(1);
    setOpenSections({});
  };

  return (
    <div className="min-h-screen w-full bg-background flex justify-center px-4 py-6">
      <div className="w-full max-w-[380px] animate-fade-in">
        {/* SCREEN 1 */}
        {screen === 1 && (
          <div className="space-y-5">
            <button
              onClick={exitActivity}
              className="flex items-center gap-1 text-[13px] text-foreground-soft hover:text-foreground transition"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="w-12 h-12 rounded-xl bg-eye-bg flex items-center justify-center text-2xl">
                👁️
              </div>
              <h1 className="text-[22px] font-semibold text-foreground">
                Eye Care Routine Guide
              </h1>
              <p className="text-[14px] text-foreground-soft">
                Protect your eyes every day!
              </p>
            </div>

            <div className="bg-eye-bg border-l-4 border-eye rounded-lg p-4 text-[13px] text-foreground">
              Learn the essential eye care habits to keep your vision healthy and
              prevent common eye problems.
            </div>

            <div className="bg-eye-accent rounded-lg p-3 text-[13px] text-foreground text-center">
              ⏱️ Takes 5–7 minutes
            </div>

            <button
              onClick={() => setScreen(2)}
              className="w-full bg-eye text-eye-foreground rounded-lg py-[14px] text-[14px] font-medium hover:brightness-95 transition"
            >
              Start Guide
            </button>
          </div>
        )}

        {/* SCREEN 2 */}
        {screen === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[12px] text-foreground-soft">
                <span>Step 1 of 2</span>
                <span>50%</span>
              </div>
              <div className="h-1.5 w-full bg-eye-bg rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-eye rounded-full transition-all duration-500" />
              </div>
            </div>

            <h2 className="text-[18px] font-semibold text-foreground pt-1">
              Your Daily Eye Care Routine
            </h2>

            <div className="space-y-3">
              <AccordionItem
                id="morning"
                title="🌅 Morning Routine (2 minutes)"
                isOpen={!!openSections.morning}
                onToggle={() => toggle("morning")}
                items={[
                  "Wash hands thoroughly",
                  "Splash eyes with cool water (3–4 times)",
                  "Gently wipe eyelids with clean cloth",
                  "Blink 10 times slowly to spread tears",
                ]}
                tip="This wakes up your eyes and promotes circulation"
              />
              <AccordionItem
                id="day"
                title="☀️ Throughout the Day"
                isOpen={!!openSections.day}
                onToggle={() => toggle("day")}
                items={[
                  "Follow 20-20-20 rule: every 20 min, look 20 ft away for 20 sec",
                  "Blink regularly (especially while using screens)",
                  "Keep eyes moisturized with eye drops if needed",
                ]}
              />
              <AccordionItem
                id="night"
                title="🌙 Night Routine (2 minutes)"
                isOpen={!!openSections.night}
                onToggle={() => toggle("night")}
                items={[
                  "Remove contact lenses (if you wear them)",
                  "Wash face and eyes gently with mild soap",
                  "Apply prescribed eye medication",
                  "Relax eyes before bed (no screens 30 min before sleep)",
                ]}
                tip="This helps your eyes recover from daily strain"
              />
            </div>

            <button
              onClick={() => setScreen(3)}
              className="w-full bg-eye text-eye-foreground rounded-lg py-[14px] text-[14px] font-medium hover:brightness-95 transition mt-2"
            >
              Next
            </button>
          </div>
        )}

        {/* SCREEN 3 */}
        {screen === 3 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-[12px] text-foreground-soft">
                <span>Step 2 of 2</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 w-full bg-eye-bg rounded-full overflow-hidden">
                <div className="h-full w-full bg-eye rounded-full transition-all duration-500" />
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-eye-bg flex items-center justify-center">
                <Check className="text-eye" size={28} strokeWidth={3} />
              </div>
              <h1 className="text-[22px] font-semibold text-foreground">
                Your Eye Care Plan Ready!
              </h1>
              <p className="text-[14px] text-foreground-soft">
                Here's your personalized routine
              </p>
            </div>

            <SummaryBox
              variant="bg"
              header="🌅 MORNING"
              items={["Wash with cool water", "Gentle eyelid wipe", "10 slow blinks"]}
            />
            <SummaryBox
              variant="accent"
              header="☀️ THROUGHOUT DAY"
              items={[
                "20-20-20 rule every 20 min",
                "Regular blinking",
                "Eye drops as needed",
              ]}
            />
            <SummaryBox
              variant="bg"
              header="🌙 NIGHT ROUTINE"
              items={[
                "Gentle face wash",
                "Remove contact lenses",
                "No screens 30 min before sleep",
              ]}
            />

            <div className="bg-eye-bg rounded-lg p-4 text-[13px] italic text-foreground text-center">
              Remember: Consistent eye care prevents problems. Your eyes will thank
              you! 👀
            </div>

            <button
              onClick={goHome}
              className="w-full bg-eye text-eye-foreground rounded-lg py-[14px] text-[14px] font-medium hover:brightness-95 transition"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryBox = ({
  variant,
  header,
  items,
}: {
  variant: "bg" | "accent";
  header: string;
  items: string[];
}) => (
  <div
    className={`${
      variant === "bg" ? "bg-eye-bg" : "bg-eye-accent"
    } border-l-4 border-eye rounded-lg p-3`}
  >
    <h3 className="text-[13px] font-semibold tracking-wide text-foreground mb-1.5">
      {header}
    </h3>
    <ul className="space-y-1 text-[13px] text-foreground">
      {items.map((it, i) => (
        <li key={i}>✓ {it}</li>
      ))}
    </ul>
  </div>
);

export default EyeCareGuide;
