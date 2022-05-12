import { Card } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';
import { pathConsts } from 'config/paths';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import selectors from 'state/selectors/authSelectors';

const Dashboard = () =>
{
    const user = useSelector(state => selectors.getLoggedUser(state));

    return (
        <ContentWrapper padded>
            <Card style={{ minHeight: "80vh", paddingInline: "1em" }}>
                <div className="text-center mt-2" style={{ height: "100%" }}>
                    <h1 className="text-center mb-3 mt-1">Dashboard</h1>
                </div>

                <div className='dashboard-container'>
                    <NavLink id='di-own' className={"dashboard-item"} to={pathConsts.collectionsMy}>
                        <Card className='decor' />
                        <Card>
                            My Collections
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
            </Card>
        </ContentWrapper>
    )
}
export default Dashboard;