import {Grid, styled, Typography} from '@mui/material';
import React from 'react';
import Logo from '../../../assets/logo.svg';

const Img = styled('img')({
    width: "auto",
    height: "50px"
});

const headerStyles = {
    marginBottom: "20px"
}
const logoStyles = {
    marginBottom: "10px"
}

const Header = () => {
    return (
        <Grid container justifyContent="center" sx={headerStyles}>
            <Grid item container xs={6} direction="column" alignItems="center">
                <Grid item sx={logoStyles}>
                    <Img src={Logo} alt="logo"/>
                </Grid>
                <Grid item>
                    <Typography>
                        Think, Draw, and Win.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;
