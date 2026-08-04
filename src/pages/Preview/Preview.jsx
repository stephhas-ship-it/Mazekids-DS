import * as React from "react";
import { ThemeProvider, ToastProvider, ThemeToggle } from "../../index";
import FoundationsSection from "./FoundationsSection";
import FormsSection from "./FormsSection";
import StructureSection from "./StructureSection";
import OverlaysSection from "./OverlaysSection";
import ContentSection from "./ContentSection";

// Every component and state on one page — render this at a route, flip the
// theme toggle and scroll to audit a token change.
const PreviewBody = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">
          Component preview — all states
        </h1>
        <ThemeToggle />
      </div>

      <FoundationsSection />
      <FormsSection />
      <StructureSection onDeleteRequest={() => setConfirmOpen(true)} />
      <OverlaysSection
        confirmOpen={confirmOpen}
        onConfirmOpenChange={setConfirmOpen}
      />
      <ContentSection />
    </div>
  );
};

const Preview = () => (
  <ThemeProvider>
    <ToastProvider>
      <PreviewBody />
    </ToastProvider>
  </ThemeProvider>
);

export default Preview;
