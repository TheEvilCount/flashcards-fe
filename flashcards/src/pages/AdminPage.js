import React, { useCallback } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { Button, Card } from '@mui/material';
import ErrorLoadingDataWrapper from 'components/ErrorLoadingDataWrapper';

import useCategories from 'api/react-query-hooks/useCategories';
import useCreateCategoryDialog from 'components/category/useCreateCategoryModal';
import { useAdmins } from 'api/react-query-hooks/useAdmins';
import usePromometUserToAdminDialog from 'components/otherModals/usePromoteUserToAdminModal';


const AdminPage = () => 
{
    const { data: dataC, error: errorC, isLoading: isLoadingC, refetch: refetchC } = useCategories();
    const { data: dataA, error: errorA, isLoading: isLoadingA, refetch: refetchA } = useAdmins();

    const [modalCreate, openModalCreate] = useCreateCategoryDialog(refetchC);
    const openCreateModal = useCallback(
        (data) =>
        {
            console.log("create modal - collectionId:" + data)
            openModalCreate(data);
        },
        [openModalCreate],
    );

    const [modalPromote, openModalPromote] = usePromometUserToAdminDialog(refetchA);
    const openPromoteModal = useCallback(
        (data) =>
        {
            openModalPromote(data);
        },
        [openModalPromote],
    );

    return (
        <div className="wrapperHome" style={{ width: "100%" }}>
            <div className="contentHome" style={{ marginInline: "auto" }}>
                {modalCreate}
                {modalPromote}
                <h1>Admin Page</h1>
                <div className='flex'>
                    <ErrorLoadingDataWrapper isLoading={isLoadingC} error={errorC} retryRequest={refetchC}>
                        <Card style={{ padding: "0.5em 2em 1em 2em", width: "fit-content" }}>
                            <h3>Categories:</h3>
                            <Card style={{ width: "fit-content", marginBottom: "10px", justifyContent: "center" }}>
                                <Button style={{}} fullWidth size={"large"} variant='contained' color="primary"
                                    aria-label="add category" onClick={() => openCreateModal()}><AddIcon />Category</Button>
                                <div style={{ maxHeight: "50vh", overflowY: 'auto' }}>
                                    {dataC && dataC.map((el, idx) =>
                                    {
                                        return <div key={"cat-" + idx} style={{ paddingInline: "3em", paddingBlock: "0.5em", borderBottom: "1px solid gray", textAlign: "center" }}>
                                            {el.title}
                                        </div>
                                    })}
                                </div>
                            </Card>

                        </Card>
                    </ErrorLoadingDataWrapper>
                    <ErrorLoadingDataWrapper isLoading={isLoadingA} error={errorA} retryRequest={refetchA}>
                        <Card style={{ padding: "0.5em 2em 1em 2em", width: "fit-content" }}>
                            <h3>Administrators:</h3>
                            <Card style={{ width: "fit-content", marginBottom: "10px", justifyContent: "center" }}>
                                <Button style={{}} fullWidth size={"large"} variant='contained' color="primary"
                                    aria-label="add category" onClick={() => openPromoteModal()}><AddIcon />Admin</Button>
                                <div style={{ maxHeight: "50vh", overflowY: 'auto' }}>
                                    {dataA && dataA.map((el, idx) =>
                                    {
                                        return <div key={"cat-" + idx} style={{ paddingInline: "3em", paddingBlock: "0.5em", borderBottom: "1px solid gray", textAlign: "center" }}>
                                            {el.username} - {el.email}
                                        </div>
                                    })}
                                </div>
                            </Card>

                        </Card>
                    </ErrorLoadingDataWrapper>
                </div>
            </div>
        </div>
    )
}
export default AdminPage; 