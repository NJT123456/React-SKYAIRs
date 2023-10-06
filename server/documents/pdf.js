const dayjs = require("dayjs");

module.exports = ({
  ref_no,
  booking_date,
  flight_departdate,
  seat_class,
  passenger,
  status,
  flight,
  flight_fare,
  total_fare,
}) => {
  const formatDate = (Date, format) => {
    return format === "YYYY-MM-DD"
      ? dayjs(Date).format("YYYY-MM-DD")
      : format === "ddd, DD MMM"
      ? dayjs(Date).format("ddd, DD MMM")
      : format === "DD MMM YYYY"
      ? dayjs(Date).format("DD MMM YYYY")
      : "";
  };

  const formatTime = (timeString) => {
    // Parse the time string into a Date object
    const time = new Date(`1970-01-01T${timeString}`);

    // Check if the parsed time is a valid date
    if (!isNaN(time.getTime())) {
      // Format the time as needed
      return dayjs(time).format("HH:mm");
    } else {
      // Handle the case where the time is invalid
      return "Invalid Time";
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PDF order</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200;300;400&display=swap");
        @import url("//db.onlinewebfonts.com/c/bb25f84423b9515a1d475d02d2de6462?family=Bell+MT");

        *{
          padding: 0;
          margin: 0;
          font-family: 'Prompt', sans-serif;
          font-size: 0.875rem;
        }

        .body{
          padding: 7% 7%;
      }

        .header{
          background-color: rgb(255,255,255);
          top: 0;
          height: 67px;

        }

        .logo{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          -ms-flex-preferred-size:0;
            flex-basis:0;
            -ms-flex-positive:1;
            flex-grow:1;

        }

        .text-logo{
          display: flex;
          align-items: center;
          font-size:3rem;
          font-family: Bell MT Semi Bold;
          font-style: italic;
          font-weight: 700;
          color: rgb(0, 32, 96)
        }

        li{
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .col{
          -ms-flex-preferred-size:0;
          flex-basis:0;
          -ms-flex-positive:1;
          flex-grow:1;

        }

        table{
          margin-top: 0;
          width: 100%;
        }

        .table{
          margin-top: 25px;
        }

        tr{
          width: 100%;
        }

        th{
            width: 25%;
            text-align: left;
            padding: 5px 20px;
        }
        td{
            width: 25%;
            text-align: left;
            padding: 5px 15px;
        }
        caption{
            text-align: left;
            background-color: #a9a9a9;
            color: white;
            padding: 8px 15px;
            font-weight: bold;
        }
        .tr-caption{
            text-align: left;
            background-color: #1fb6e4;
            color: white;
            padding: 0;
            font-weight: bold;
            width: 100%;
            font-size: 1.4em;
        }
        .tr-even{
            background-color: #f0f0f0;
        }
        .tr-odd{
            background-color: white;
        }
      </style>
    </head>

    <body>
      <div className="body">
        <nav class="header">
            <div class="logo">
              <div class= 'text-logo'>SKYAIRs</div>
              <div style="font-size:2rem; text-align: right; margin-top: -50px">E-TICKET</div>
            </div>
        </nav>
        <hr style="height: 1px; border: 0; background-color: rgb(126, 186, 255);" noshade>
        <main style="padding: 10px;">
          <div style="margin: 15px auto;">
            <h3>Important information</h3>
            <ul style="padding-left: 50px;">
                <li style="text-align: justify;">
                    This is your E-Ticket Iternary. You must bring it to the airport for check-in, and it is recommended you to retain a copy for your records.
                </li>
                <li style="text-align: justify;">
                    Each passenger travelling needs a printed copy of this document for immigrations, customs, airport security checks and duty free purchases.
                </li>
                <li style="text-align: justify;">
                    Economy Class passengers should report to airline check-in desks 3 hours prior to departure of all flights. First and Business Class passengers should report to airline check-in desks not later than 1 hour prior to departure. Boarding for your flight begins at least 35 minutes before your scheduled departure time. Gates close 15 minutes prior to departure
                </li>
            </ul>
          </div>
          <div>
            <table class="table">
              <tr class="tr-caption">
                <td style="width: 100%;">TICKET INFORMATION</td>
              </tr>
            </table>
            <table cellspacing='0'>
              <tr class='tr-odd'>
                <th>TICKET REFERENCE</th>
                <td>${ref_no}</td>
                <th>BOOKING DATE & TIME</th>
                <td style="text-transform: uppercase;">${formatDate(booking_date, "DD MMM YYYY")}</td>
              </tr>
              <tr class='tr-even'>
                <th>FLIGHT DATE</th>
                <td style="text-transform: uppercase;">${formatDate(flight_departdate, "DD MMM YYYY")}</td>
                <th>CLASS</th>
                <td>${seat_class}</td>
              </tr>
              <tr class='tr-odd'>
                <th>TICKET REFERENCE</th>
                <td>${ref_no}</td>
                <th>BOOKING DATE & TIME</th>
                <td style="text-transform: uppercase;">${formatDate(booking_date, "DD MMM YYYY")}</td>
              </tr>
            </table>
            <table class="table">
                  <tr class="tr-caption">
                      <td style="width: 100%;">PASSENGER INFORMATION</td>
                  </tr>
            </table>
            <table cellspacing='0'>
              <tr class="tr-odd">
                <th>PASSENGER NAME</th>
                <th>EMAIL</th>
              </tr>
              <tr class="tr-even">
                <td style="width: 35%; padding-left: 20px; text-transform: uppercase;">${
                  passenger.first_name
                } ${passenger.last_name}</td>
                <td style="width: 20%; padding-left: 20px; text-transform: uppercase;">${
                  passenger.user.email
                }</td>
              </tr>
            </table>
            <table class="table">
              <tr class="tr-caption">
                  <td style="width: 100%; padding-left: 20px;">FLIGHT INFORMATION</td>
              </tr>
            </table>
            <table cellspacing='0'>
              <tr class="tr-odd">
                  <th>FLIGHT</th>
                  <th>DEPART/ARRIVE</th>
                  <th>AIRPORT</th>
              </tr>
              <tr class="tr-even">
                  <td style="width: 29%; padding-left: 20px; text-transform: uppercase;">${
                    flight.airline
                  }</td>
                  <td style="width: 22%; padding-left: 20px; text-transform: uppercase;">${formatDate(
                    flight.depart_date,
                    "DD MMM YYYY"
                  )}<br>${formatTime(flight.depart_time)}</td>
                  <td style="width: 49%; padding-left: 20px; text-transform: uppercase;">${
                    flight.origin.airport
                  } (${flight.origin.code})</td>
              </tr>
              <tr class="tr-odd">
                  <td style="width: 29%; padding-left: 20px; text-transform: uppercase;">${
                    flight.airline
                  }</td>
                  <td style="width: 22%; padding-left: 20px; text-transform: uppercase;">${formatDate(
                    flight.depart_date,
                    "DD MMM YYYY"
                  )}<br>${formatTime(flight.arrival_time)}</td>
                  <td style="width: 49%; padding-left: 20px; text-transform: uppercase;">${
                    flight.destination.airport
                  } (${flight.destination.code})</td>
              </tr>
            </table>
            <table class="table">
              <tr class="tr-caption">
                  <td style="width: 100%;">FARE DETAILS</td>
              </tr>
            </table>
            <table cellspacing='0'">
              <tr class="tr-odd">
                  <th style="width: 35%;">FARE</th>
                  <td style="width: 65%;">THB ${flight_fare}</td>
              </tr>
              <tr class="tr-even">
                  <th style="width: 35%;">TOTAL</th>
                  <td style="width: 65%;">THB ${total_fare}</td>
              </tr>
            </table>
          </div>
        </main>
      </div>

    </body>

    </html>
  `;
};
