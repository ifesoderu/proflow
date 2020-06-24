import React, { useEffect, useState } from 'react'
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler'
//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment';
import withDnDContext from '../../withDnDContext'
import { useSelector } from 'react-redux';



const ProjectTimeline = () => {
    const loadedSections = useSelector(state => state.loadedSections);
    const loadedTasks = useSelector(state => state.loadedTasks)
    const [resources, setResources] = useState([])
    const [events, setEvents] = useState([])

    let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Month, false, false);

    useEffect(() => {
        let resources = []
        let events = []
        Object.values(loadedSections).forEach(({ id, name }) => {
            resources.push({ id, name })
        })
        console.log()

        Object.values(loadedTasks).slice().sort((a, b) => {
            if (b.due_date < a.due_date) {
                return -1
            }
            if (b.due_date > a.due_date) {
                return 1
            }
            return 0
        }).forEach(({ id, section_id, title, due_date }) => {

            events.push({
                id,
                start: (due_date ? (due_date.length === 10 ? `${due_date} 00:00:00` : '2020-06-18 00:00:00') : '2020-06-18 00:00:00'),
                end: (due_date ? (due_date.length === 10 ? `${due_date} 23:59:00` : '2020-06-18 23:59:00') : '2020-06-18 23:59:00'),
                resourceId: section_id,
                title,
                bgColor: '#000',
            })
        })
        setEvents(events);
        setResources(resources)
    }, [])
    schedulerData.setResources(resources);
    // console.log(loadedTasks)
    // let events = [
    //     {
    //         id: 1,
    //         start: '2020-06-18 00:30:00',
    //         end: '2020-06-18 23:30:00',
    //         resourceId: 'r1',
    //         title: 'I am finished',
    //         bgColor: '#D9D9D9'
    //     },

    //     {
    //         id: 3,
    //         start: '2020-06-18 00:30:00',
    //         end: '2020-06-18 23:30:00',
    //         resourceId: 'r1',
    //         title: 'I am not movable',
    //         movable: false,
    //         bgColor: '#000'
    //     },
    //     {
    //         id: 4,
    //         start: '2020-06-18 00:30:00',
    //         end: '2020-06-18 23:30:00',
    //         resourceId: 'r1',
    //         title: 'I am not start-resizable',
    //         startResizable: false,
    //         bgColor: '#000'
    //     },
    //     {
    //         id: 2,
    //         start: '2020-06-25 00:30:00',
    //         end: '2020-06-25 23:30:00',
    //         resourceId: 'r1',
    //         title: 'I am not resizable',
    //         resizable: false,
    //         bgColor: '#000'
    //     },
    // ];
    schedulerData.setEvents(events);
    const prevClick = schedulerData => {
        schedulerData.prev();
        schedulerData.setEvents(events);
    }
    const nextClick = () => {

    }
    const onSelectDate = () => {

    }
    const onViewChange = () => {

    }
    const eventClicked = () => {

    }
    return (
        <div className="px-10 pt-40 bg-white text-sm" style={{ minHeight: '100vh' }}>
            <Scheduler schedulerData={schedulerData}
                prevClick={prevClick}
                nextClick={nextClick}
                onSelectDate={onSelectDate}
                onViewChange={onViewChange}
                eventItemClick={eventClicked}
            />
        </div >
    )
}

export default withDnDContext(ProjectTimeline)