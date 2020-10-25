import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Scream from './Scream';
import StaticProfile from './StaticProfile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/dataActions';
import ProfileSkeleton from './ProfileSkeleton';

function User(props) {
    const [userData, setUserData] = useState({
        profile: null,
        screamIdParam: null
    })
    const { profile, screamIdParam } = userData
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    useEffect(() => {


        if (screamId) setUserData({ ...userData, screamIdParam: screamId });

        props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                setUserData({
                    ...userData,
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }, [])
    const { screams, loading } = props.data;


    return (
        <div>
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {
                        loading ? (
                            <p>loading...</p>
                        ) : screams === null ? (
                            <p>No screams from this user</p>
                        ) : !screamIdParam ? (
                            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
                        ) : (
                                        screams.map((scream) => {
                                            if (scream.screamId !== screamIdParam)
                                                return <Scream key={scream.screamId} scream={scream} />
                                            else return <Scream key={scream.screamId} scream={scream} openDialog={screamId} />
                                        })
                                    )
                    }
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                            <StaticProfile profile={profile} />
                        )}
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getUserData }
)(User)