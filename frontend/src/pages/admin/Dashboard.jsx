import React, { useEffect } from "react";
import MiniDrawer from "../../components/admin/Sidebar";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice"
import Loading from "../Loading";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, isLoading} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
        if(isLoading){
            <Loading fullHeight/>
        }
        if(isError){
            navigate("/");
        }
    }, [dispatch, isError, navigate]);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer/>
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                <h1>
                    Dashboard
                </h1>
                    <Typography variant="body1" color="initial">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eaque nisi repudiandae veniam quidem mollitia. Recusandae, sit atque error at aspernatur iste perspiciatis quisquam perferendis rerum excepturi suscipit reiciendis magni quibusdam in, esse qui! Porro ratione, ad temporibus asperiores animi exercitationem eum quam mollitia in. Repellat dolore eos quisquam maiores dolorum quae delectus eligendi sunt quibusdam officia hic sed ut eaque animi quod repudiandae exercitationem ea temporibus qui cupiditate mollitia omnis, numquam assumenda recusandae. Provident similique itaque, incidunt tempore natus quisquam suscipit illum consequatur eaque, temporibus recusandae aperiam voluptas officiis non eum soluta corporis rerum possimus consequuntur, minus aliquid minima.
                    </Typography>
                </Box>
            </Box>
        </>
    )
};

export default Dashboard;
