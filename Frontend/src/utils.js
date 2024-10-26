export function getShortDayName(date) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

export function getNextSixWeekdays() {
  const result = [];
  let currentDate = new Date();

  while (result.length < 6) {
    const day = currentDate.getDay();

    // Exclude Saturday (6) and Sunday (0)
    if (day !== 0 && day !== 6) {
      result.push(new Date(currentDate));
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

export function formatDate(date) {
  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Determine the appropriate suffix for the day
  const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                 (day % 10 === 2 && day !== 12) ? "nd" :
                 (day % 10 === 3 && day !== 13) ? "rd" : "th";

  const month = monthNames[date.getMonth()];
  return `${day}${suffix} ${month}`;
}

export function getTimeSlotsByPeriod(date) {
  const periods = {
    Morning: [],
    Noon: [],
    Evening: []
  };

  const startHour = 9;
  const endHour = 21;
  const intervalMinutes = 30;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minutes, 0, 0);

      const formattedTime = slotDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

      const output = { slotDate, formattedTime };

      if (hour >= 9 && hour < 12) {
        periods.Morning.push(output);
      } else if (hour >= 12 && hour < 16) {
        periods.Noon.push(output);
      } else if (hour >= 16 && hour < 21) {
        periods.Evening.push(output);
      }
    }
  }

  return periods;
}

export function getTimeSlotsByPeriodV2(date, appointments) {
  const periods = {
    Morning: [],
    Noon: [],
    Evening: [],
  };

  const startHour = 9;
  const endHour = 21;
  const intervalMinutes = 30;

  // Extract and convert selected slots to a set of ISO strings (date and time without timezone)
  const bookedSlots = new Set(
    appointments.map((appointment) =>
      new Date(appointment.selected_slot).getTime()
    )
  );

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minutes, 0, 0);

      const slotTime = slotDate.getTime();

      // Skip if the slot is already booked
      if (bookedSlots.has(slotTime)) continue;

      const formattedTime = slotDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      if (hour >= 9 && hour < 12) {
        periods.Morning.push(formattedTime);
      } else if (hour >= 12 && hour < 16) {
        periods.Noon.push(formattedTime);
      } else if (hour >= 16 && hour < 21) {
        periods.Evening.push(formattedTime);
      }
    }
  }

  return periods;
}

export function formatDateToLongString(date) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function formatDateTime(date, time) {
  // Parse the time string (e.g., "09:00 AM")
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  // Adjust hours based on AM/PM
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  // Set hours and minutes to the date
  date.setHours(hours, minutes, 0, 0);

  // Format date and time as "YYYY-MM-DD HH:MM:SS"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const formattedHours = String(date.getHours()).padStart(2, "0");
  const formattedMinutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = "00"; // Assuming seconds as "00"

  return `${year}-${month}-${day} ${formattedHours}:${formattedMinutes}:${seconds}`;
}

export function getCurrentDateTimeFormatted() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
