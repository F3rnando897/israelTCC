<h3 class="event-title">${event.title}</h3>

<span class="event-time">${event.title}</span>


      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">Escolher horário ...</h3>
            </div>
            <div class="event-time">
              <span class="event-time">9:00</span>
            </div>
        </div>`;
      });


  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;

  }