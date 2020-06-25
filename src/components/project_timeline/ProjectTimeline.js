import React, { useEffect, useState } from 'react'
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler'
//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment';
import withDnDContext from '../../withDnDContext'
import { useSelector, useDispatch } from 'react-redux';
import { getProjectSections } from '../../services/sectionServices';
import { loadSections } from '../project_board/loadedSectionsSlice';
import { errorAlert, neutralAlertAsync } from '../alert/alertSlice';
import { getTasksBySectionsAndProjectId } from '../../services/taskServices';
import { loadTasks } from '../project_board/loadedTasksSlice';
import { updateProject } from '../../services/projectServices';



const ProjectTimeline = ({ projectID }) => {
    const loadedSections = useSelector(state => state.loadedSections);
    const loadedTasks = useSelector(state => state.loadedTasks)
    const [resources, setResources] = useState([])
    const [events, setEvents] = useState([])
    const dispatch = useDispatch()


    let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Month, false, false);

    useEffect(() => {
        getProjectSections(projectID).then(
            sections => {
                dispatch(loadSections(sections))
            },
            error => {
                dispatch(errorAlert(error.toString()));
                dispatch(neutralAlertAsync())
            }
        )
        getTasksBySectionsAndProjectId(projectID).then(
            data => {
                dispatch(loadTasks(data))
            }
        )
        return () => {
            dispatch(loadSections([]))
            dispatch(loadTasks([]))
        }
    }, [projectID])

    useEffect(() => {
        let resources = []
        let events = []
        Object.values(loadedSections).forEach(({ id, name }) => {
            resources.push({ id, name })
        })
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

    }, [loadedTasks, loadedSections])

    schedulerData.setResources(resources);

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