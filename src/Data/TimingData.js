import { WiSunrise, WiMoonAltWaningCrescent3 } from "react-icons/wi";

const timingsData = [
    {
        id: 1,
        session: "morning",
        icon: WiSunrise,
        events: [
            { key: "open", time: "5:00 AM" },
            { key: "morningPrayer", time: "7:00 AM" },
            { key: "closeMorning", time: "11:00 AM" },
        ],
    },
    {
        id: 2,
        session: "evening",
        icon: WiMoonAltWaningCrescent3,
        events: [
            { key: "reopen", time: "5:00 PM" },
            { key: "deeparadhana", time: "6:30 PM" },
            { key: "closeEvening", time: "7:30 PM" },
        ],
    },
];

export default timingsData;