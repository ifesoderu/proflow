import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Route, Switch, useRouteMatch } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';

export const ProjectDetails = () => {
    const { path } = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${path}/:projectID`}>
                <ProjectDetail />
            </Route>
        </Switch>
    )
}