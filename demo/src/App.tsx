import { useState } from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import Popup from "./Popup";
import { Button } from "@/components/ui/button";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>Open Popup</Button>
        </div>
        <Dashboard />

        <Popup
          open={open}
          onClose={() => setOpen(false)}
          title="Sync changes to Figma"
          primaryLabel="Sync"
          secondaryLabel="Cancel"
          onPrimary={() => {
            // placeholder for sync action
            // console.log('syncing...')
          }}
        >
          <p className="text-sm text-gray-600">
            This will push local component updates to the Figma file. Proceed?
          </p>
        </Popup>
      </div>
    </>
  );
}

export default App;
