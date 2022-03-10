import { Card, Grid, Typography } from '@mui/material';
import { pathConsts } from 'config/paths';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () =>
{
    return (
        <div className="wrapperHome">
            <div className="contentHome">
                <Typography align={'center'} variant={'h4'} marginBottom={"2em"} marginTop={"1em"}>dashboard</Typography>
                <Grid container gap={"1em"} marginX={"auto"} justifyContent={"center"}>
                    <NavLink className={"dashboard-item"} to={pathConsts.collectionsMy}>
                        <Card>
                            My owned Collections
                        </Card>
                    </NavLink>
                    <NavLink className={"dashboard-item"} to={pathConsts.collectionsFav}>
                        <Card>
                            Favourite Collections
                        </Card>
                    </NavLink>
                    <NavLink className={"dashboard-item"} to={pathConsts.collectionsTop}>
                        <Card>
                            Top Collections
                        </Card>
                    </NavLink>
                </Grid>
            </div>
        </div>
    )
}
export default Dashboard;