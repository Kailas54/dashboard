import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import '@syncfusion/ej2-base/styles/material-dark.css';
import '@syncfusion/ej2-calendars/styles/material-dark.css';
import '@syncfusion/ej2-schedule/styles/material-dark.css';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Calendar = () => {
  const { currentMode } = useStateContext();
  const [scheduleObj, setScheduleObj] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());  // Add this line

  useEffect(() => {
    // Force a refresh of the schedule object after initial mount
    if (scheduleObj) {
      scheduleObj.refresh();
    }
  }, [scheduleObj]);

  return (
    <div className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        currentView="Month"
        timeFormat="HH:mm"
        timezone="UTC"
        showWeekend={true}
        showCurrentTimeIndicator={false}
        highlightCurrentDate={false}
        cssClass={currentMode === 'Dark' ? 'dark-theme-calendar no-hover-effect' : 'modern-calendar no-hover-effect'}
        headerRows={[
          { option: 'Toolbar', template: '<div class="e-toolbar"></div>' },
          { option: 'Header' }
        ]}
        eventSettings={{
          enableTooltip: true,
          fields: {
            subject: { name: 'Subject', validation: { required: true } },
            location: { name: 'Location' },
            description: { name: 'Description' },
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } }
          },
          template: currentMode === 'Dark' ? 'dark-event-template' : 'default-event-template'
        }}
      >
        <ViewsDirective>
          {['Day', 'Week', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: '100%', background: currentMode === 'Dark' ? '#33373E' : 'white' }}>
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={currentDate}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  readonly={true}
                  openOnFocus={false}
                  showIcon={false}
                  format="dd/MM/yyyy"
                  cssClass={`${currentMode === 'Dark' ? 'e-calendar-dark-mode dark-date-picker' : ''}`}
                  style={{ 
                    color: currentMode === 'Dark' ? '#fff' : 'inherit',
                    '--float-label-color': currentMode === 'Dark' ? '#fff' : 'inherit'
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;