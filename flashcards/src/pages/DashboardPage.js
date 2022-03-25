import { Card, Typography } from '@mui/material';
import { pathConsts } from 'config/paths';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import selectors from 'state/selectors/authSelectors';

const Dashboard = () =>
{
    const user = useSelector(state => selectors.getLoggedUser(state));

    return (
        <div className="wrapperHome">
            <div className="contentHome">
                <Typography align={'center'} variant={'h4'} marginBottom={"2em"} marginTop={"1em"}>Dashboard</Typography>
                <div className='dashboard-container'>
                    <NavLink id='di-own' className={"dashboard-item"} to={pathConsts.collectionsMy}>
                        <Card className='decor' />
                        <Card>
                            My owned Collections
                        </Card>
                    </NavLink>
                    <NavLink id='di-fav' className={"dashboard-item"} to={pathConsts.collectionsFav}>
                        <Card className='decor' />
                        <Card>
                            Favourite Collections
                        </Card>
                    </NavLink>
                    <NavLink id='di-top' className={"dashboard-item"} to={pathConsts.collectionsTop}>
                        <Card className='decor' />
                        <Card>
                            Top Collections
                        </Card>
                    </NavLink>
                    {user.admin && (
                        <NavLink id='di-admin' className={"dashboard-item"} to={pathConsts.adminDashboard}>
                            <Card className='decor' />
                            <Card>
                                Admin Dashboard
                            </Card>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;