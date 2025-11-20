import { useState } from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import Popup from "./Popup";
import Popover from "./Popover";
import Calendar from "./Calendar";
import { Button } from "@/components/ui/button";

function App() {
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        <div className="p-4 flex items-center gap-3">
          <Button onClick={() => setOpen(true)}>Open Popup</Button>
          <Button variant="secondary" onClick={() => setOpenCalendar(true)}>
            Open Calendar
          </Button>

          <Popover trigger={<Button variant="outline">Filters</Button>} align="end">
            {({ close }) => (
              <div className="w-56">
                <div className="text-sm font-medium mb-2">Filter events</div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Only mine
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Show weekends
                </label>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" onClick={() => close()}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </Popover>
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

        <Popup
          open={openCalendar}
          onClose={() => setOpenCalendar(false)}
          title="Calendar"
          primaryLabel="Done"
          secondaryLabel="Close"
          onPrimary={() => {
            // optional primary action for calendar
          }}
        >
          <Calendar />
        </Popup>
      </div>
    </>
  );
}

export default App;
