import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Scream from './Scream'
import Profile from './Profile'
import ScreamSkeleton from './ScreamSkeleton'
import { getScreams } from '../redux/dataActions'
import { connect } from 'react-redux'
function Home(props) {

    const [screams, setScreams] = useState([])
    useEffect(() => {
        props.getScreams()
        setScreams(props.screams)

    }, [props.screams.length])

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    {
                        screams.length > 0 ?
                            screams.map(scream => {
                                return <Scream scream={scream} key={scream.screamId} />
                            })
                            : <ScreamSkeleton />
                    }
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        screams: state.data.screams
    }
}
export default connect(mapStateToProps, { getScreams })(Home)
